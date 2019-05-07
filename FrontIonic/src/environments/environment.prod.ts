export const environment = {
  production: true,
  UrlServer: 'http://localhost:3000/api',
  auth0Config: {
    clientID: '6ffEDYqJCoQtXeHngfMbdJpMJxiIgiEo',
    domain: 'xm-dev.auth0.com',
    audience: 'https://xm-dev.auth0.com/userinfo',
    redirectUri: 'https://gaps.local:8443/auth/login',
    responseType: 'token id_token',
    responseMode: 'form_post',
    scope: 'openid profile'
  }
};
