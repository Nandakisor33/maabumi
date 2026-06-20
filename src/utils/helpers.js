// Smooth scroll helper
export const scrollTo = (href) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};
