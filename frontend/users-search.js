const FollowToggle = require("./follow_toggle.js");

class UsersSearch {
  constructor($el) {
    this.$el = $el;
    this.handleInput();
  }

  handleInput () {
    const thisSearch = this;
    $(".users-search form input[type='text']").on("keyup", event => {
      event.preventDefault();
      let formData = $(event.currentTarget).serialize();
      $.ajax({
        url: "/users/search",
        type: "GET",
        dataType: "json",
        data: formData,
        success(listOfUsers) {
          thisSearch.renderResults(listOfUsers);
        }
      });
    });
  }

  renderResults (listOfUsers) {
    const $ul = $(".users");
    $ul.children().remove();
    for (var i = 0; i < listOfUsers.length; i++) {
      let $li = $("<li></li>");
      $li.text(listOfUsers[i].username);
      let followedState;
      if (listOfUsers[i].followed) {
        followedState = "followed";
      } else {
        followedState = "unfollowed";
      }
      let options = {userId: listOfUsers[i].id, followState: followedState};

      let $button = $("<button class='follow-toggle'></button>");
      new FollowToggle($button, options);
      $li.append($button);
      $ul.append($li);
    }
  }
}

module.exports = UsersSearch;
