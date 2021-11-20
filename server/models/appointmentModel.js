// appointmentModel.js
const mongoose = require('mongoose')
// Setup schema
const appointmentSchema = mongoose.Schema({
  user_id: String,
  appointment_date: {
    type: Date,
    required: true
  },
  start_time: {
    type: Date,
    required: true
  },
  end_time: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'awaiting'
  },
  approvedBy: {
    type: String
  }
})
// Export appointment model
const Contact = module.exports = mongoose.model('appointment', appointmentSchema)
module.exports.get = function (callback, limit) {
  Contact.find(callback).limit(limit)
}
