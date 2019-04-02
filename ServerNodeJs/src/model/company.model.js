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

let CompanySchema = new mongoose.Schema({
  name: String,
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
})

module.exports = mongoose.model('Company', CompanySchema)