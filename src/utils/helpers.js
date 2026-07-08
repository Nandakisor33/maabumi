export const scrollTo = (href, behavior = "smooth") => {
  let targetId = href;
  if (href && href.startsWith("#")) {
    const alias = href.substring(1).toLowerCase();
    if (alias === "home") targetId = "#hero";
    else if (alias === "aboutus" || alias === "about-us") targetId = "#about";
    else if (alias === "gallary") targetId = "#gallery";
    else if (alias === "concept") targetId = "#concepts";
    else if (alias === "contactus" || alias === "contact-us") targetId = "#contact";
  }

  const el = document.querySelector(targetId);
  if (el) {
    const headerOffset = 80; // height of fixed header
    
    // Calculate static absolute top relative to the document
    let absoluteTop = 0;
    let currentEl = el;
    while (currentEl) {
      absoluteTop += currentEl.offsetTop;
      currentEl = currentEl.offsetParent;
    }
    
    const offsetPosition = absoluteTop - headerOffset;
    
    // Perform scroll
    window.scrollTo({
      top: offsetPosition,
      behavior: behavior
    });

    // Run fallback adjustment only for instant/auto snaps on load to settle layout shifts
    if (behavior !== "smooth") {
      setTimeout(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: "auto"
        });
      }, 150);
    }
  }
};
