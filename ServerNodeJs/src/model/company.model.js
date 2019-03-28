let mongoose = require('mongoose')
let mongoConstants = require('../shared/resources/mongo-constants')

mongoose.connect(`mongodb+srv://${mongoConstants.USER}:${mongoConstants.PASSWORD}@${mongoConstants.SERVER}/${mongoConstants.DATABASE}?retryWrites=true`)

let CompanySchema = new mongoose.Schema({
  name: String,
  nit: {
    type: Number,
    required: true,
    unique: true
  },
  movil: {
    type: Number,
    required: true
  },
  phone: {
    type: Number
  },
  street: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('Company', CompanySchema)