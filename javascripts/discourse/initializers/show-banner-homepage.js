import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.15.0", (api) => {
  api.onPageChange((url) => {
    const homepage = url === "/" || url.startsWith("/latest") || url.startsWith("/categories");

    const elements = [
      { selector: ".ambassador-banner", display: "block" },
      { selector: ".community-highlight__wrapper", display: "flex" },
      { selector: ".support-section", display: "block" },
    ];

    elements.forEach(({ selector, display }) => {
      const el = document.querySelector(selector);
      if (!el) return;
      el.style.display = homepage ? display : "none";
    });
  });
});

