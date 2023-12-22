// const passport = require('passport')
// var GoogleStrategy = require('passport-google-oauth20').Strategy;

// const User = require('../model/user.model');

// passport.use(new GoogleStrategy({
//     clientID: "773286884556-j7csb1ifb3pe7d90gte98nlkr03q0lmh.apps.googleusercontent.com",
//     clientSecret: "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",
//     callbackURL: "/auth/google/callback",
//     scope: ['profile'],
//     state: true
// },
//     function (accessToken, refreshToken, profile, cb) {
//         User.findOrCreate({ googleId: profile.id }, function (err, user) {
//             return cb(err, user);
//         });
//     }
// ));



const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
	new GoogleStrategy(
		{
			clientID: "773286884556-j7csb1ifb3pe7d90gte98nlkr03q0lmh.apps.googleusercontent.com",
			clientSecret: "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",
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
		function (accessToken, refreshToken, profile, callback) {
			callback(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
