import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { ajax } from "discourse/lib/ajax";

export default class TopContributors extends Component {
  @tracked users = [];

  constructor() {
    super(...arguments);
    this.loadContributors();
  }

  async loadContributors() {
    try {
      const data = await ajax("/directory_items.json", {
        data: { period: "monthly", order: "post_count", limit: 5 },
      });
      this.users = data.directory_items || [];
    } catch (e) {
      console.error("Failed to load top contributors", e);
    }
  }
}

