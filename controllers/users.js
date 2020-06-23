const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');

signToken = user => {
    return JWT.sign({
        iss: 'Joker',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, JWT_SECRET);
}

module.exports = {
    signUp: async(req, res, next) => {
        console.log('UsersConstroller.signUp called');

        const { email, password } = req.value.body;

        const foundUser = await User.findOne({ 'local.email': email });
        if (foundUser) {
            return res.status(409).send({ error: 'Email is already in use' });
        }

        const newUser = new User({
            method: 'local',
            local: {
                email: email,
                password: password
            }
        });
        await newUser.save();
        
        const token = signToken(newUser);

        res.status(200).json({ token });
    },

    signIn: async(req, res, next) => {
        const token = signToken(req.user);
        res.status(200).json({ token });
        console.log('Successful login');
    },

    googleOAuth: async(req, res, next) => {
        console.log('req.user', req.user);
        const token = signToken(req.user);
        res.status(200).json({ token });
    },

    secret: async(req, res, next) => {
        console.log('I managed to get here');
        res.json({ secret: 'resource '});
    }
}