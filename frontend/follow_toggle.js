class FollowToggle {
  constructor ($el, options) {
    this.$el = $el;
    this.userId = $el.attr("data-user-id") || options.userId;
    this.followState = $el.attr("data-initial-follow-state") ||
                          options.followState;

    this.render();
    this.handleClick();
  }

  render() {
    if (this.followState === "unfollowed") {
      this.$el.attr("data-initial-follow-state", "followed");
      this.$el.text("Follow");
    } else {
      this.$el.attr("data-initial-follow-state", "unfollowed");
      this.$el.text("Unfollow");
    }
  }

  toggle() {
    if (this.followState === "unfollowed") {
      this.followState = "followed";
    } else {
      this.followState = "unfollowed";
    }
  }

  handleClick() {
    const thisFollow = this;
    this.$el.on("click", event => {
      event.preventDefault();
      const $currentTarget = $(event.currentTarget);
      $currentTarget.attr("disabled", "disabled");
      if (thisFollow.followState === "unfollowed") {
        $.ajax({
          url: `/users/${this.userId}/follow`,
          type: "POST",
          dataType: "json",
          data: {user_id: this.userId},
          success() {
            thisFollow.toggle();
            $currentTarget.prop("disabled", false);
            thisFollow.render();
          }
        });
      } else {
        $.ajax({
          url: `/users/${this.userId}/follow`,
          type: "DELETE",
          dataType: "json",
          data: {user_id: this.userId},
          success() {
            thisFollow.toggle();
            $currentTarget.prop("disabled", false);
            thisFollow.render();
          }
        });
      }
    });
  }
}

module.exports = FollowToggle;
