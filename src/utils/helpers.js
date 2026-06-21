// Smooth scroll helper with header offset support
export const scrollTo = (href) => {
  const el = document.querySelector(href);
  if (el) {
    const headerOffset = 80; // height of fixed header
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
};
