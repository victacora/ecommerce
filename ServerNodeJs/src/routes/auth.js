import { Router as router } from 'express';

export default () => {
    var authApi = router();
    authApi.post('/callback', (req, resp) => {
        resp.json('token');
    });
    return authApi;
}