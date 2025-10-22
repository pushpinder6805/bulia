import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.15.0", (api) => {
  api.onPageChange((url) => {
    const homepage = url === "/" || url.startsWith("/latest") || url.startsWith("/categories");

    const selectors = [
      ".ambassador-banner",
      ".community-highlight__wrapper",
      ".support-section",
    ];

    selectors.forEach((selector) => {
      const el = document.querySelector(selector);
      if (!el) return;
      el.style.display = homepage ? "block" : "none";
    });
  });
});

