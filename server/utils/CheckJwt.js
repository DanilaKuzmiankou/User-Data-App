const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
require('dotenv').config()

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://' + process.env.AUTH0_DOMAIN + '/.well-known/jwks.json'
    }),
    audience: 'https://express.users_app_server_side',
    issuer: 'https://auth0-users-data-app.eu.auth0.com/',
    algorithms: ['RS256']
});

module.exports = jwtCheck