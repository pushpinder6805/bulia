import { apiInitializer } from "discourse/lib/api";
import { ajax } from "discourse/lib/ajax";

export default apiInitializer("1.8.0", (api) => {
  api.modifyClass("controller:discovery/categories", {
    pluginId: "community-highlight",
    topContributors: null,

    async loadContributors() {
      if (this.topContributors) return;

      try {
        let data = await ajax("/directory_items.json", {
          data: { period: "monthly", order: "post_count", limit: 10 },
        });

        let items = (data.directory_items || []).filter((i) => i.post_count > 0);

        if (items.length === 0) {
          data = await ajax("/directory_items.json", {
            data: { period: "all", order: "post_count", limit: 10 },
          });
          items = (data.directory_items || []).filter((i) => i.post_count > 0);
        }

        this.set("topContributors", items);
      } catch (e) {
        console.error("Community highlight fetch failed", e);
      }
    },

    onShow() {
      this._super(...arguments);
      this.loadContributors();
    },
  });
});

