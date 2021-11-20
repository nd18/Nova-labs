// slotController.js
// Import slot model
Slot = require('../models/availabilitySlotModel')

exports.getByUserId = function (req, res) {
  Slot.find({ user_id: req.params.userId }, function (err, appointment) {
    if (err) {
      res.json({
        status: 'error',
        message: err,
      })
    }
    res.json({
      status: 'success',
      message: 'Slot retrieved successfully',
      data: appointment
    })
  })
}

exports.getSlotByDate = function (req, res) {
  Slot.find({ user_id: req.params.date }, function (err, appointment) {
    if (err) {
      res.json({
        status: 'error',
        message: err,
      })
    }
    res.json({
      status: 'success',
      message: 'Slot retrieved successfully',
      data: appointment
    })
  })
}

exports.getSlot = function (req, res) {
  Slot.findById(req.params.id, function (err, appointment) {
    if (err) {
      res.json({
        status: 'error',
        message: err,
      })
    }
    res.json({
      status: 'success',
      message: 'Slot retrieved successfully',
      data: appointment
    })
  })
}

exports.getSlotList = function (req, res) {
  Slot.get(function (err, slots) {
    if (err) {
      res.json({
        status: 'error',
        message: err,
      })
    }
    res.json({
      status: 'success',
      message: 'Slots retrieved successfully',
      data: slots
    })
  })
}

// Handle create slots actions
exports.new = async function (req, res) {
  try {
    const slot = await Slot.findOneAndUpdate(
      {user_id: req.body.user_id, slot_date: req.body.slot_date},
      {
        $set: {
          start_time: req.body.start_time,
          end_time: req.body.end_time
        },
        $inc: {
          __v: 1
        }
      },
      {
        upsert: true
      }
    )
    res.json(slot);
  } catch (err) {
    res.status(500).send(err);
  }
}

// Handle delete slot
exports.delete = function (req, res) {
  Slot.remove({
    _id: req.params.user_id
  }, function (err, slot) {
    if (err)
      res.send(err)
    res.json({
      status: 'success',
      message: 'Slot deleted'
    })
  })
}
