'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectionString = 'mongodb+srv://' + _constants.constants.MONGO_USER + ':' + _constants.constants.MONGO_PASSWORD + '@' + _constants.constants.MONGO_SERVER + '/' + _constants.constants.MONGO_DATABASE + '?retryWrites=true';

_mongoose2.default.connect(connectionString, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

var db = _mongoose2.default.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error: conn ' + connectionString));
db.once('open', function () {
  console.info('MongoDB connect success');
});

var PersonSchema = new _mongoose2.default.Schema({
  name: {
    type: String,
    required: true,
    default: ''
  },
  surname: {
    type: String,
    required: true,
    default: ''
  },
  typeDocument: {
    type: String,
    required: true,
    default: ''
  },
  dni: {
    type: String,
    required: true,
    default: ''
  },
  movil: {
    type: Number,
    required: true,
    min: 0
  },
  phone: {
    type: Number,
    min: 0
  },
  street: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  typeUser: {
    type: [String],
    required: true
  }
});

var CompanySchema = new _mongoose2.default.Schema({
  name: {
    type: String,
    required: true,
    default: ''
  },
  nit: {
    type: String,
    required: true,
    default: ''
  },
  movil: {
    type: Number,
    required: true,
    min: 0
  },
  phone: {
    type: Number,
    min: 0
  },
  street: {
    type: String,
    required: true
  },
  persons: {
    type: [PersonSchema]
  }
});

exports.default = {
  CompanyModel: _mongoose2.default.model('Company', CompanySchema)
};