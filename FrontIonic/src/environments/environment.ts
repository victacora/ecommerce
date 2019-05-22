export const environment = {
  production: false,
  UrlServer: 'http://localhost:3000/api',
  auth0Config: {
    clientID: 'Q1Wsf6fE_oPHpOfFHUkp6JrvgF3znAMW',
    domain: 'dev-58il09h9.auth0.com',
    audience: 'https://dev-58il09h9.auth0.com/userinfo',
    redirectUri: 'http://localhost:3000/callback',
    responseType: 'token id_token',
    responseMode: 'form_post',
    scope: 'openid profile'
  }
};

