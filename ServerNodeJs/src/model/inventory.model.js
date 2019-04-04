let mongoose = require('mongoose')
let mongoConstants = require('../shared/resources/mongo-constants')
let connectionString = `mongodb+srv://${mongoConstants.USER}:${mongoConstants.PASSWORD}@${mongoConstants.SERVER}/${mongoConstants.DATABASE}?retryWrites=true`;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.info('MongoDB connect success')
});

let PersonSchema = new mongoose.Schema({
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
})

let CompanySchema = new mongoose.Schema({
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
})

module.exports = {
  CompanyModel: mongoose.model('Company', CompanySchema)
}