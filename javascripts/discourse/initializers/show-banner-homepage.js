import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.15.0", (api) => {
  api.onPageChange((url) => {
    const banner = document.querySelector(".ambassador-banner");
    if (!banner) return;

    // Show only on homepage routes
    if (url === "/" || url.startsWith("/latest") || url.startsWith("/categories")) {
      banner.style.display = "block";
    } else {
      banner.style.display = "none";
    }
  });
});

