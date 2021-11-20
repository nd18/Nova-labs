// availabilitySlotModel.js
const mongoose = require('mongoose');
// Setup schema
const availabilitySlotSchema = mongoose.Schema({
  user_id: String,
  slot_date: {
    type: Date
  },
  start_time: {
    type: Date
  },
  end_time: {
    type: Date
  }
});
// Export availabilitySlot model
const Contact = module.exports = mongoose.model('availabilitySlot', availabilitySlotSchema);
module.exports.get = function (callback, limit) {
    Contact.find(callback).limit(limit);
};
