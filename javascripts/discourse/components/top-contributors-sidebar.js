import Component from "@ember/component";
import { tagName } from "@ember-decorators/component";
import { withPluginApi } from "discourse/lib/plugin-api";

const fetchDirectoryItems = (settings, component) => {
  const url = `/directory_items.json?period=monthly&order=${settings.order_by}&exclude_groups=${settings.excluded_group_names}&limit=5`;

  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      component.set("contributors", data.directory_items);
    });
};

@tagName("")
export default class TopContributorsSidebar extends Component {
  init() {
    super.init(...arguments);
    this.set("contributors", []);

    withPluginApi("0.11", (api) => {
      api.onPageChange(() => {
        fetchDirectoryItems(settings, this);
      });
    });
  }
}

