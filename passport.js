const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const config = require('./configuration');
const User = require('./models/user');

// Json web token Strategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.JWT_SECRET
}, async(payLoad, done) => {
    try {
        const user = await User.findById(payLoad.sub);
        if (!user) {
            return done(null, false);
        }

        done(null, user);
    } catch (error) {
        done(error, false)
    }
}));

// Google OAuth Strategy
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: config.oauth.google.clientID,
    clientSecret: config.oauth.google.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);
        console.log('profile', profile);

        const existingUser = await User.findOne({ 'google.id': profile.id });
        if (existingUser) {
            console.log('User already exists in our DB');
            return done(null, existingUser);
        }

        console.log('User doesn\'t exists, we\'re creating a new one');

        const newUser = new User({
            method: 'google',
            google: {
                id: profile.id,
                email: profile.emails[0].value
            }
        });

        await newUser.save();
        done(null, newUser);
    } catch (error) {
        done(error, false, error.message);
    }
}));

// Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
    const user = await User.findOne({ 'local.email': email });
    if (!user) {
        return done(null, false);
    }

    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
        return done(null, false);
    }

    done(null, user);
    } catch (error) {
        done(error, false);
    }
}));