import Component from "@ember/component";
import { tagName } from "@ember-decorators/component";
import avatar from "discourse/helpers/avatar";
import htmlSafe from "discourse/helpers/html-safe";
import User from "discourse/models/user";

@tagName("")
export default class MonthlyTopContributor extends Component {
  init() {
    super.init(...arguments);

    this.set("posts", this.data.post_count);

    // fetch full user object
    User.findByUsername(this.data.user.username).then((user) => {
      this.set("user", user);
    });
  }

  <template>
    <div class="contributor-row">
      <div class="contributor-left">
        <span data-user-card={{this.user.username}} class="user">
          {{avatar
            this.user
            avatarTemplatePath="avatar_template"
            usernamePath="username"
            namePath="name"
            imageSize="medium"
          }}
        </span>

        <div class="contributor-names">
          <div class="contributor-username">
            {{htmlSafe this.user.username}}
          </div>
          {{#if this.user.name}}
            <div class="contributor-name">
              {{this.user.name}}
            </div>
          {{/if}}
        </div>
      </div>

      <div class="contributor-posts">
        <div class="contributor-count">{{this.posts}}</div>
        <div class="contributor-label">Posts</div>
      </div>
    </div>
  </template>
}

