// Smooth scroll helper with header offset support
export const scrollTo = (href) => {
  const el = document.querySelector(href);
  if (el) {
    const headerOffset = 80; // height of fixed header
    
    // Calculate absolute top relative to the document statically
    let absoluteTop = 0;
    let currentEl = el;
    while (currentEl) {
      absoluteTop += currentEl.offsetTop;
      currentEl = currentEl.offsetParent;
    }
    
    const offsetPosition = absoluteTop - headerOffset;
    
    // Perform smooth scroll
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
};
