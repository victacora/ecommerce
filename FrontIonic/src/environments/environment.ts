export const environment = {
  production: false,
  UrlServer: '/api',
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

