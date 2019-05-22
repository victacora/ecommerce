'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jwtCheck = undefined;

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _jwksRsa = require('jwks-rsa');

var _jwksRsa2 = _interopRequireDefault(_jwksRsa);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jwtCheck = exports.jwtCheck = (0, _expressJwt2.default)({
  secret: _jwksRsa2.default.expressJwtSecret({
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