import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "custom-placeholder",

  initialize() {
    withPluginApi("0.8.7", (api) => {
      api.onPageChange(() => {
        const input = document.querySelector("#custom-search-input.search-term__input");
        if (input) {
          input.setAttribute("placeholder", "this is test");
        }
      });
    });
  },
};
