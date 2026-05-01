const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { auth, requireRole } = require('../middleware/auth');

// All routes require authentication and doctor role
router.use(auth);
router.use(requireRole(['doctor']));

router.get('/dashboard', doctorController.getDashboard);
router.get('/patients', doctorController.getPatients);
router.get('/patients/:patientId/history', doctorController.getPatientHistory);
router.post('/prescription', doctorController.createPrescription);
router.post('/lab-report', doctorController.createLabReport);

module.exports = router;

