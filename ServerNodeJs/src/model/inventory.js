import mongoose from 'mongoose';
import { constants } from './constants';

const connectionString = `mongodb+srv://${constants.MONGO_USER}:${constants.MONGO_PASSWORD}@${constants.MONGO_SERVER}/${constants.MONGO_DATABASE}?retryWrites=true`;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error: conn '+connectionString));
db.once('open', function () {
  console.info('MongoDB connect success')
});

const PersonSchema = new mongoose.Schema({
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

const CompanySchema = new mongoose.Schema({
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

export default { 
  CompanyModel: mongoose.model('Company', CompanySchema) 
};
