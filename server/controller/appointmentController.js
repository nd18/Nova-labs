// appointmentController.js
// Import appointment model
Appointment = require('../models/appointmentModel')

exports.getByUserId = function (req, res) {
  Appointment.find({ user_id: req.params.userId }, function (err, appointment) {
    if (err) {
      res.json({
        status: 'error',
        message: err,
      })
    }
    res.json({
      status: 'success',
      message: 'Appointments retrieved successfully',
      data: appointment
    })
  })
}

exports.getAppointment = function (req, res) {
  Appointment.findById(req.params.id, function (err, appointment) {
    if (err) {
      res.json({
        status: 500,
        message: err,
      })
    }
    res.json({
      status: 'success',
      message: 'Appointments retrieved successfully',
      data: appointment
    })
  })
}

exports.getAppointmentList = async function (req, res) {
  try {
    const list = await Appointment.find(
      req.params,
    );
    res.json({
      status: 'success',
      message: 'Appointments retrieved successfully',
      data: list
    })
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.updateStatusAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body
      }
    );
    res.json(appointment);
  } catch (err) {
    res.status(500).send(err)
  }
}

// Handle create appointments actions
exports.new = function (req, res) {
  const appointment = new Appointment()
  for (let key in req.body) {
    appointment[key] = req.body[key]
  }
  appointment.save(function (err) {
    // Check for validation error
    if (err)
      res.status(500).send(err)
    else
      res.json({
        message: 'New appointment created!',
        data: appointment
      })
  })
}

