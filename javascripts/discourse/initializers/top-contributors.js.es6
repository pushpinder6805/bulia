import { apiInitializer } from "discourse/lib/api";
import { ajax } from "discourse/lib/ajax";

export default apiInitializer("1.8.0", (api) => {
  api.modifyClass("controller:discovery/categories", {
    pluginId: "top-contributors",
    topContributors: null,

    async loadContributors() {
      if (this.topContributors) return;

      try {
        // 1. Try monthly first
        let data = await ajax("/directory_items.json", {
          data: { period: "monthly", order: "post_count", limit: 5 },
        });

        // 2. Check if any user actually has posts
        let items = data.directory_items || [];
        let hasPosts = items.some((i) => i.post_count > 0);

        if (!hasPosts) {
          // fallback to all-time
          data = await ajax("/directory_items.json", {
            data: { period: "all", order: "post_count", limit: 5 },
          });
          items = data.directory_items || [];
        }

        this.set("topContributors", items);
      } catch (e) {
        console.error("Top contributors fetch failed", e);
      }
    },

    onShow() {
      this._super(...arguments);
      this.loadContributors();
    },
  });
});

