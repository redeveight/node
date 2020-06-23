if (process.env.NODE_ENV == 'test') {
    module.exports = {
        JWT_SECRET: 'jokerauthentication',
        oauth: {
            google: {
                clientID: '000.apps.googleusercontent.com',
                clientSecret: '000'
            }
        }
    };
} else {
    module.exports = {
        JWT_SECRET: 'jokerauthentication',
        oauth: {
            google: {
                clientID: '000.apps.googleusercontent.com',
                clientSecret: '000'
            }
        }
    };
}