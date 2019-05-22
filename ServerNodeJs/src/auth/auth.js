import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';

export const jwtCheck = jwt({
     secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-58il09h9.auth0.com/.well-known/jwks.json'
    }),
  
    // Validate the audience and the issuer.
    audience: process.env.AUTH0_AUDIENCE,
    issuer: 'https://dev-58il09h9.auth0.com/',
    algorithms: ['RS256']
});
  