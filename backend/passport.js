const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const { client } = require("./Config/db");
const createDatabaseForUser=require("./Models/createDatabaseForUser")

// Google Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"],
        },
         function (accessToken, refreshToken, profile, callback) {
            const userData={
                username: profile.displayName,
                email: profile.emails[0].value
            }
            createDatabaseForUser(userData);
            callback(null, userData); // Save or find the user in the database
        }
    )
);

// Local Strategy
passport.use(
    new LocalStrategy(
        { usernameField: "email", passwordField: "password" },
        async (email, password, done) => {
            try {
				// Ensure database connection
                if (!client.topology?.isConnected()) {
					await client.connect();
                }
                const database = client.db("KritiUserData");
                const collection = database.collection(email); // Generic user collection
                const user = await collection.findOne({email});
				
                if (!user) {
					return done(null, false, { message: "Invalid email or password" });
                }
				
                // Validate password using bcrypt
                const isPasswordValid = (password ===user.password);
                if (!isPasswordValid) {
					return done(null, false, { message: "Invalid email or password" });
                }
                // Successful authentication
                return done(null, user);
            } catch (error) {
                console.error("Error during authentication:", error);
                return done(error);
            }
        }
    )
);

// Serialization and Deserialization
passport.serializeUser((user, done) => {
	done(null, user.email); // Serialize only the email
});

passport.deserializeUser(async (email, done) => {
    try {
        const database = client.db("KritiUserData");
        const collection = database.collection(email);
        // Find the specific user document, not all documents.
        const user = await collection.findOne({ email: email });
        done(null, user); // Pass the user object, or null if not found
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;
