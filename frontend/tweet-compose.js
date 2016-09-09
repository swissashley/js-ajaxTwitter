class TweetCompose {
  constructor ($el) {
    this.$el = $el;
    this.submit();
    this.addMentionedUser();
    this.removeMentionedUser();
  }

  submit () {
    const thisCompose = this;
    $(".tweet-compose").on("submit", event => {
      event.preventDefault();
      let $currentTarget = $(event.currentTarget);
      let formData = $currentTarget.serialize();

      $(".tweet-compose input").prop("disabled", true);

      $.ajax({
        url: "/tweets",
        type: "POST",
        dataType: "json",
        data: formData,
        success(newTweet) {
          thisCompose.handleSuccess(newTweet);
        }
      });
    });
  }

  clearInput() {
    $(".tweet-compose textarea").val("");
  }

  handleSuccess(newTweet) {
    this.clearInput();
    $(".tweet-compose input").prop("disabled", false);
    let $li = $("<li></li>");
    // id: 319, content: "xyz", user_id: 8, created_at: "2016-08-18T22:31:59.824Z"
    $li.text(`${newTweet.content} -- `);
    let $a = $(`<a></a>`);
    $a.attr('href', `/users/${newTweet.user_id}`);
    $a.text(`${newTweet.user.username}`);
    $li.append($a);
    $li.append(` -- ${newTweet.created_at}`);
    $($(".tweet-compose").attr("data-tweets-ul")).prepend($li);
  }

  addMentionedUser() {
    $(".add-mentioned-user").on("click", event => {
      let $scriptTag = $(".tweet-compose script");
      $(".mentioned-users").append($scriptTag.html());
    });
  }

  removeMentionedUser() {
    $(".mentioned-users").on("click", ".remove-mentioned-user",event => {
      let $currentTarget = $(event.currentTarget);
      let $removeTarget = $(event.target).parent();
      $removeTarget.remove();
    });
  }
}

module.exports = TweetCompose;
