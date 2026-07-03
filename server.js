import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import { PROJECTS, COMPANY } from './src/data/constants.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Helper to slugify text
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start
    .replace(/-+$/, '');            // Trim - from end
}

// Redirects middleware: HTTPS, WWW, and Trailing Slashes
app.use((req, res, next) => {
  // 1. Force HTTPS in production
  if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(301, `https://${req.headers.host}${req.url}`)
  }

  // 2. Remove trailing slash (except for homepage)
  if (req.path !== '/' && req.path.endsWith('/')) {
    const query = req.url.slice(req.path.length)
    return res.redirect(301, req.path.slice(0, -1) + query)
  }

  // 3. www redirect (optional: enforce non-www)
  if (req.headers.host && req.headers.host.startsWith('www.')) {
    const newHost = req.headers.host.replace(/^www\./, '')
    return res.redirect(301, `https://${newHost}${req.url}`)
  }

  next()
})

// Serve robots.txt dynamically
app.get('/robots.txt', (req, res) => {
  res.type('text/plain')
  res.send(`User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: https://maabhoomi.app/sitemap.xml
Sitemap: https://maabhoomi.app/image-sitemap.xml`)
})

// Serve sitemap.xml dynamically
app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml')
  
  const cities = [
    'hyderabad', 'bangalore', 'chennai', 'mumbai', 'pune', 
    'vijayawada', 'visakhapatnam', 'warangal', 'tirupati', 'goa', 
    'kurnool', 'nagpur', 'nellore', 'coimbatore', 'chellam', 'trichy'
  ]

  let urls = [
    { loc: 'https://maabhoomi.app', changefreq: 'daily', priority: '1.0' },
    { loc: 'https://maabhoomi.app/privacy-policy', changefreq: 'monthly', priority: '0.3' }
  ]

  // Add city pages
  cities.forEach(city => {
    urls.push({
      loc: `https://maabhoomi.app/city/${city}`,
      changefreq: 'weekly',
      priority: '0.8'
    })
  })

  // Add property pages
  PROJECTS.forEach(project => {
    urls.push({
      loc: `https://maabhoomi.app/property/${slugify(project.name)}`,
      changefreq: 'weekly',
      priority: '0.9'
    })
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  res.send(xml)
})

// Serve image sitemap dynamically
app.get('/image-sitemap.xml', (req, res) => {
  res.type('application/xml')

  let images = PROJECTS.map(project => ({
    loc: `https://maabhoomi.app/property/${slugify(project.name)}`,
    imageLoc: project.image,
    title: project.name,
    caption: `${project.name} in ${project.location} - ${project.type} (${project.size})`
  }))

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${images.map(img => `  <url>
    <loc>${img.loc}</loc>
    <image:image>
      <image:loc>${img.imageLoc}</image:loc>
      <image:title>${img.title}</image:title>
      <image:caption>${img.caption}</image:caption>
    </image:image>
  </url>`).join('\n')}
</urlset>`

  res.send(xml)
})

// Serve static assets from build output
app.use(express.static(path.join(__dirname, 'dist'), { index: false }))

// Dynamic HTML tag replacement helper
const rewriteSeoTags = (html, seo) => {
  let modified = html

  // Title tag replacement
  if (seo.title) {
    modified = modified.replace(/<title>.*?<\/title>/, `<title>${seo.title}</title>`)
    modified = modified.replace(/<meta property="og:title" content=".*?"\s*\/?>/, `<meta property="og:title" content="${seo.title}" />`)
    modified = modified.replace(/<meta name="twitter:title" content=".*?"\s*\/?>/, `<meta name="twitter:title" content="${seo.title}" />`)
  }

  // Description tag replacement
  if (seo.description) {
    modified = modified.replace(/<meta name="description" content=".*?"\s*\/?>/, `<meta name="description" content="${seo.description}" />`)
    modified = modified.replace(/<meta property="og:description" content=".*?"\s*\/?>/, `<meta property="og:description" content="${seo.description}" />`)
    modified = modified.replace(/<meta name="twitter:description" content=".*?"\s*\/?>/, `<meta name="twitter:description" content="${seo.description}" />`)
  }

  // Image tag replacement
  if (seo.image) {
    modified = modified.replace(/<meta property="og:image" content=".*?"\s*\/?>/, `<meta property="og:image" content="${seo.image}" />`)
    modified = modified.replace(/<meta name="twitter:image" content=".*?"\s*\/?>/, `<meta name="twitter:image" content="${seo.image}" />`)
  }

  // Canonical / URL replacement
  if (seo.url) {
    modified = modified.replace(/<meta property="og:url" content=".*?"\s*\/?>/, `<meta property="og:url" content="${seo.url}" />`)
    // If canonical link exists, replace it, otherwise insert it
    if (modified.includes('rel="canonical"')) {
      modified = modified.replace(/<link rel="canonical" href=".*?"\s*\/?>/, `<link rel="canonical" href="${seo.url}" />`)
    } else {
      modified = modified.replace('</head>', `  <link rel="canonical" href="${seo.url}" />\n  </head>`)
    }
  }

  // Robots replacement
  if (seo.robots) {
    modified = modified.replace(/<meta name="robots" content=".*?"\s*\/?>/, `<meta name="robots" content="${seo.robots}" />`)
  }

  // JSON-LD replacement
  if (seo.schema) {
    const schemaScript = `<script type="application/ld+json" id="seo-schema">${JSON.stringify(seo.schema, null, 2)}</script>`
    if (modified.includes('id="seo-schema"')) {
      modified = modified.replace(/<script type="application\/ld\+json" id="seo-schema">[\s\S]*?<\/script>/, schemaScript)
    } else {
      modified = modified.replace('</head>', `  ${schemaScript}\n  </head>`)
    }
  }

  return modified
}

// Route handlers for SEO rendering
app.use(async (req, res, next) => {
  if (req.method !== 'GET') return next();
  try {
    const indexPath = path.join(__dirname, 'dist', 'index.html')
    if (!fs.existsSync(indexPath)) {
      return res.status(500).send('Application is not built yet. Please run npm run build first.')
    }

    const html = await fs.promises.readFile(indexPath, 'utf-8')
    const pathname = req.path
    let seo = {
      title: 'Maa Bhoomi Infra Developers | Buy, Sell & Rent Properties in India',
      description: 'Maa Bhoomi Infra Developers helps you discover verified residential and commercial properties across India. Buy, sell, rent apartments, villas, plots, houses and investment properties with confidence.',
      image: 'https://maabhoomi.app/logo.png',
      url: `https://maabhoomi.app${pathname}`,
      robots: 'index, follow'
    }

    // Initialize base schema.org data
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "Maa Bhoomi Infra Developers",
      "alternateName": ["Maa Bhoomi", "Maabhoomi", "Maa Bhoomi Infra Developers"],
      "url": "https://maabhoomi.app",
      "logo": "https://maabhoomi.app/logo.png",
      "telephone": "040-31542269",
      "email": "maabhoomiid@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "H No 7-67/1, Street No 4, Nagendra Nagar, Near Habsiguda X Road, Beside Bharat Petrol Pump",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "postalCode": "500007",
        "addressCountry": "IN"
      }
    }

    // 1. Property Detail Page
    if (pathname.startsWith('/property/')) {
      const slug = pathname.replace('/property/', '')
      const project = PROJECTS.find(p => slugify(p.name) === slug || String(p.id) === slug)

      if (project) {
        seo.title = `${project.name} for Sale in ${project.location} | Maa Bhoomi Infra Developers`
        seo.description = `Explore ${project.name} in ${project.location}. Verified ${project.type} property with size ${project.size} and pricing ${project.price}. Contact Maa Bhoomi Infra Developers today.`
        seo.image = project.image
        seo.robots = 'index, follow'
        
        // Dynamic Property JSON-LD Schema
        seo.schema = [
          organizationSchema,
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://maabhoomi.app"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": project.type,
                "item": `https://maabhoomi.app/#projects`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": project.name,
                "item": seo.url
              }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "RealEstateListing",
            "name": project.name,
            "description": seo.description,
            "url": seo.url,
            "image": project.image,
            "offers": {
              "@type": "Offer",
              "priceCurrency": "INR",
              "price": project.price,
              "availability": project.status === 'Available' ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              "validFrom": "2026-07-03"
            },
            "about": {
              "@type": "SingleFamilyResidence",
              "name": project.name,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": project.location,
                "addressRegion": "Telangana",
                "addressCountry": "IN"
              }
            }
          }
        ]
      } else {
        // Unmatched property
        res.status(404)
        seo.title = 'Property Not Found | Maa Bhoomi Infra Developers'
        seo.description = 'The requested property could not be found. Explore other premium plots, villas and commercial projects on Maa Bhoomi.'
        seo.robots = 'noindex, follow'
      }

    // 2. City Filter Page
    } else if (pathname.startsWith('/city/')) {
      const rawCity = pathname.replace('/city/', '')
      const cityName = rawCity.charAt(0).toUpperCase() + rawCity.slice(1)
      
      const validCities = [
        'Hyderabad', 'Bangalore', 'Chennai', 'Mumbai', 'Pune', 
        'Vijayawada', 'Visakhapatnam', 'Warangal', 'Tirupati', 'Goa', 
        'Kurnool', 'Nagpur', 'Nellore', 'Coimbatore', 'Chellam', 'Trichy'
      ]

      if (validCities.includes(cityName)) {
        seo.title = `Property in ${cityName} | Buy Property in ${cityName} | Maa Bhoomi`
        seo.description = `Discover premium open plots, residential projects, and commercial properties in ${cityName}. Browse verified listings with Maa Bhoomi Infra Developers.`
        seo.robots = 'index, follow'

        seo.schema = [
          organizationSchema,
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://maabhoomi.app"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": `Properties in ${cityName}`,
                "item": seo.url
              }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": `Maa Bhoomi Infra Developers - ${cityName} Branch`,
            "description": `Premium real estate services and property listings in ${cityName}.`,
            "url": seo.url,
            "telephone": "040-31542269",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": cityName,
              "addressCountry": "IN"
            }
          }
        ]
      } else {
        res.status(404)
        seo.title = 'City Not Found | Maa Bhoomi Infra Developers'
        seo.description = 'Maa Bhoomi operates in major Indian cities. Discover verified real estate in Hyderabad, Vijayawada, Bangalore, and more.'
        seo.robots = 'noindex, follow'
      }

    // 3. Privacy Policy Modal/Page
    } else if (pathname === '/privacy-policy') {
      seo.title = 'Privacy Policy | Maa Bhoomi Infra Developers'
      seo.description = 'Read the privacy policy of Maa Bhoomi Infra Developers. Learn how we handle your personal data with complete transparency.'
      seo.robots = 'index, follow'
      seo.schema = [
        organizationSchema,
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://maabhoomi.app"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Privacy Policy",
              "item": seo.url
            }
          ]
        }
      ]

    // 4. Default / Home / Fallback 404
    } else if (pathname !== '/') {
      // Any other page is an invalid route in our application, treat as 404
      res.status(404)
      seo.title = 'Page Not Found | Maa Bhoomi Infra Developers'
      seo.description = 'The page you are looking for does not exist. Back to home to explore open plots and premium real estate listings.'
      seo.robots = 'noindex, follow'
    } else {
      // Homepage schema
      seo.schema = [
        organizationSchema,
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Maa Bhoomi",
          "url": "https://maabhoomi.app",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://maabhoomi.app/?search={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
      ]
    }

    const modifiedHtml = rewriteSeoTags(html, seo)
    res.send(modifiedHtml)
  } catch (err) {
    next(err)
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send('Internal Server Error')
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})