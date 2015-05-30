
var Twit = require('twit');
 
 var newBot = function() {

 	var USER_CONFIG = {
	    consumer_key:         process.env.CONSUMER_KEY,
	    consumer_secret:      process.env.CONSUMER_SECRET,
	    access_token:         process.env.ACCESS_TOKEN,
	    access_token_secret:  process.env.ACCESS_TOKEN_SECRET
	};

 	var uesteibarbot = {
 		name: 'uesteibarbot',
 		bot: new Twit(USER_CONFIG),
		tweet: function(text, repliedID) {
			this.bot.post('statuses/update', { status: text, in_reply_to_status_id: repliedID}, function(err, data, response) {
				if(err) {
					console.log("There was a problem tweeting the message.", err);
				}
			});
		},
		startVigilante: function(name, username) {
			var stream = this.bot.stream('statuses/filter', { track: name});
			var self = this;
			stream.on('tweet', function (tweet) {
				self.tweet('Hey @' + username + '! @' + tweet.user.screen_name + ' is talking about you!', tweet.id_str);
			});
		},
		startAutoDefense: function() {
			var stream = this.bot.stream('statuses/filter', { track: this.name});
			var self = this;
			stream.on('tweet', function (tweet) {
				console.log(tweet);
				self.tweet('Hey @' + tweet.user.screen_name + "! Don't freak out, I'm just a bot", tweet.id_str);
				self.follow(tweet.user.screen_name);
			});
		},
		startAutoFollow: function() {
			var stream = this.bot.stream('user');
			var self = this;
			stream.on('follow', function (data) {
				self.follow(data.source.screen_name);
			});
		},
		follow: function(username) {
			var self = this;
			this.bot.post('friendships/create', {
			    screen_name: username,
			    follow: 'true'
			    }, function (err, resp) {
			    	if (err) {
			    		return console.log('friendship gave error: ' + JSON.stringify(err));
			      	}
			      	console.log('friended @'+username);
			    });
		}

 	};

 	return uesteibarbot;
 };

 exports.newBot = newBot;

