import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  api.modifyClass("controller:discovery/categories", {
    pluginId: "top-contributors",

    topContributors: null,

    onShow() {
      this._super(...arguments);

      if (!this.topContributors) {
        fetch("/directory_items.json?period=monthly&order=post_count&limit=5")
          .then((r) => r.json())
          .then((data) => {
            this.set("topContributors", data.directory_items);
          });
      }
    }
  });
});

