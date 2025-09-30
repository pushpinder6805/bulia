import Component from "@ember/component";
import { tagName } from "@ember-decorators/component";

const fetchDirectoryItems = (component) => {
  fetch(`/directory_items.json?period=monthly&order=post_count&limit=5`)
    .then((response) => response.json())
    .then((data) => {
      component.set("contributors", data.directory_items || []);
    });
};

@tagName("")
export default class MonthlyTopContributors extends Component {
  init() {
    super.init(...arguments);

    this.set("contributors", []);

    fetchDirectoryItems(this);
  }

  <template>
    <div class="community-highlight">
      <div class="community-highlight__contributors">
        <h3 class="contributors-heading">Monthly top contributors</h3>

        {{#if this.contributors.length}}
          <div class="contributors-list">
            {{#each this.contributors as |user|}}
              <MonthlyTopContributor @data={{user}} />
            {{/each}}
          </div>
        {{else}}
          <p class="no-contributors">
            No top contributors yet — start posting to appear here!
          </p>
        {{/if}}

        <div class="contributors-see-more">
          <a href="/u?order=post_count&period=monthly">See more +</a>
        </div>
      </div>
    </div>
  </template>
}

