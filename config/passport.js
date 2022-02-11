const LocalStrategy = require('passport-local');

function initialize(passport) {
	const authenticateUser = (email, password, done) => {
		const user = getUserByEmail(email);

		if (user == null) {
			return done(null);
		}
	};

	passport.use(new LocalStrategy({ usernameField: 'email' }), authenticateUser);
	passport.serializeUser((user, done) => {});
	passport.deserializeUser((id, done) => {});
}
