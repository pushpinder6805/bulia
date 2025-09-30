import Component from "@ember/component";
import { tagName } from "@ember-decorators/component";
import { withPluginApi } from "discourse/lib/plugin-api";

const fetchDirectoryItems = (component) => {
  fetch("/directory_items.json?period=monthly&order=post_count&limit=10")
    .then((res) => res.json())
    .then((data) => {
      let sorted = (data.directory_items || [])
        .filter((i) => i.post_count > 0)
        .sort((a, b) => b.post_count - a.post_count);

      component.set("contributors", sorted);
    });
};

@tagName("")
export default class TopContributorsSidebar extends Component {
  init() {
    super.init(...arguments);
    this.set("contributors", []);

    withPluginApi("0.11", (api) => {
      api.onPageChange(() => {
        fetchDirectoryItems(this);
      });
    });
  }
}

