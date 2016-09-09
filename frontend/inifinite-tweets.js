class InfiniteTweets {
  constructor () {
    this.maxCreatedAt = null;
  }
  fetchTweets () {
    const infTweets = this;
    $.ajax({
      url: "/feed",
      type: "GET",
      dataType: "json",
      success(newTweets) {
        infTweets.insertTweets(newTweets);
      }
    });
  }

  insertTweets (newTweets) {
    let $li;
    for (var i = 0; i < newTweets.length; i++) {
      $li = $("<li></li>");
      $li.append(JSON.stringify(newTweets[i]));
      $("#feed").append($li);
    }
  }
}


module.exports = InfiniteTweets;
