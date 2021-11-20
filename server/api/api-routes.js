// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

const availabilitySlotController = require('../controller/availabilitySlotController');
const appointmentController = require('../controller/appointmentController');

router.route('/availabilitySlot')
  .get(availabilitySlotController.getSlotList)
  .post(availabilitySlotController.new);

router.route('/availabilitySlot/:id')
  .get(availabilitySlotController.getSlot);

router.route('/availabilitySlot/user/:userId')
  .get(availabilitySlotController.getByUserId);

router.route('/appointment')
  .get(appointmentController.getAppointmentList)
  .post(appointmentController.new);

router.route('/appointment/:id')
  .get(appointmentController.getAppointment);

router.route('/appointment/:id/status-change')
  .put(appointmentController.updateStatusAppointment);

router.route('/appointment/user/:userId')
  .get(appointmentController.getByUserId);


// Export API routes
module.exports = router;
