const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users-search.js');
const TweetCompose = require('./tweet-compose.js');
const InfiniteTweets = require('./infinite-tweets.js');

$( () => {
  $(".follow-toggle").each((idx, element) => {
    new FollowToggle($(element));
  });

  new UsersSearch($(".users-search"));
  new TweetCompose($(".tweet-compose"));

});
