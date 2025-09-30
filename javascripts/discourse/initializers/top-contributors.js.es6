import { apiInitializer } from "discourse/lib/api";
import { ajax } from "discourse/lib/ajax";

export default apiInitializer("1.8.0", (api) => {
  api.modifyClass("controller:discovery/categories", {
    pluginId: "top-contributors",

    topContributors: null,

    async loadContributors() {
      if (this.topContributors) return;
      try {
        const data = await ajax("/directory_items.json", {
          data: { period: "monthly", order: "post_count", limit: 5 }
        });
        this.set("topContributors", data.directory_items || []);
      } catch (e) {
        console.error("Top contributors fetch failed", e);
      }
    },

    onShow() {
      this._super(...arguments);
      this.loadContributors();
    }
  });
});

