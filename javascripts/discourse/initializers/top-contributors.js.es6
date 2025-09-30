import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  api.decorateWidget("above-discovery-categories:after", (helper) => {
    return helper.h("div#top-contributors-container");
  });

  api.onPageChange(() => {
    const container = document.querySelector("#top-contributors-container");
    if (!container || container.dataset.loaded) return;

    fetch("/directory_items.json?period=monthly&order=post_count&limit=5")
      .then((res) => res.json())
      .then((data) => {
        const app = Discourse.__container__.lookup("service:app-events");
        const topUsers = data.directory_items;
        app.trigger("top-contributors:loaded", topUsers);
      });

    container.dataset.loaded = true;
  });

  api.modifyClass("component:top-contributors-banner", {
    pluginId: "top-contributors-banner",
    topUsers: null,

    init() {
      this._super(...arguments);
      const app = Discourse.__container__.lookup("service:app-events");
      app.on("top-contributors:loaded", this, (users) => {
        this.set("topUsers", users);
      });
    }
  });
});
