'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

exports.default = function () {
    var authApi = (0, _express.Router)();
    authApi.post('/callback', function (req, resp) {
        resp.json('token');
    });
    return authApi;
};