import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PROJECTS } from '../src/data/constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
};

const cities = [
  'hyderabad', 'bangalore', 'chennai', 'mumbai', 'pune', 
  'vijayawada', 'visakhapatnam', 'warangal', 'tirupati', 'goa', 
  'kurnool', 'nagpur', 'nellore', 'coimbatore', 'chellam', 'trichy'
];

let urls = [
  { loc: 'https://maabhoomi.app', changefreq: 'daily', priority: '1.0' },
  { loc: 'https://maabhoomi.app/privacy-policy', changefreq: 'monthly', priority: '0.3' }
];

// Add city pages
cities.forEach(city => {
  urls.push({
    loc: `https://maabhoomi.app/city/${city}`,
    changefreq: 'weekly',
    priority: '0.8'
  });
});

// Add property pages
PROJECTS.forEach(project => {
  urls.push({
    loc: `https://maabhoomi.app/property/${slugify(project.name)}`,
    changefreq: 'weekly',
    priority: '0.9'
  });
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

const destPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(destPath, xml, 'utf8');
console.log('Sitemap generated successfully at:', destPath);
