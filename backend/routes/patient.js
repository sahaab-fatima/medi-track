const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { auth, requireRole } = require('../middleware/auth');

// All routes require authentication and patient role
router.use(auth);
router.use(requireRole(['patient']));

router.get('/dashboard', patientController.getDashboard);
router.get('/appointments', patientController.getAppointments);
router.post('/book-appointment', patientController.bookAppointment);
router.put('/appointments/:id', patientController.rescheduleAppointment);
router.post('/vitals', patientController.logVitals);
router.get('/health-records', patientController.getHealthRecords);
router.get('/prescriptions', patientController.getPrescriptions);
router.get('/lab-reports', patientController.getLabReports);

module.exports = router;

