if (process.env.NODE_ENV == 'test') {
    module.exports = {
        JWT_SECRET: 'jokerauthentication',
        oauth: {
            google: {
                clientID: '613292730707-r1ml65gakin66dha3ma3259pc4csufnq.apps.googleusercontent.com',
                clientSecret: 'jepXM2hEpCpTRVzrrYtB1jfR'
            }
        }
    };
} else {
    module.exports = {
        JWT_SECRET: 'jokerauthentication',
        oauth: {
            google: {
                clientID: '613292730707-r1ml65gakin66dha3ma3259pc4csufnq.apps.googleusercontent.com',
                clientSecret: 'jepXM2hEpCpTRVzrrYtB1jfR'
            }
        }
    };
}