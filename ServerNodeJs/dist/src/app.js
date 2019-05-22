'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _auth = require('./routes/auth');

var _auth2 = _interopRequireDefault(_auth);

var _company = require('./routes/company');

var _company2 = _interopRequireDefault(_company);

var _person = require('./routes/person');

var _person2 = _interopRequireDefault(_person);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
    extended: true
}));

app.use((0, _cors2.default)());
app.use(_auth2.default);
app.use(_company2.default);
app.use(_person2.default);

app.use(function (req, res, next) {
    console.log(new Date().toString() + ' => ' + req.originalUrl, req.body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(_express2.default.static('public'));

// Handler for 404 - Resource Not Found
app.use(function (req, res, next) {
    console.error(req.path);
    res.status(404).sendFile(_path2.default.join(__dirname, '../public/404.html'));
});

// Handler for Error 500
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(505).sendFile(_path2.default.join(__dirname, '../public/500.html'));
});

var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    return console.info('Server has started on ' + PORT);
});