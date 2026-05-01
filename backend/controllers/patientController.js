const Appointment = require('../models/Appointment');
const HealthRecord = require('../models/HealthRecord');
const Prescription = require('../models/Prescription');
const LabReport = require('../models/LabReport');
const User = require('../models/User');

// Dashboard
exports.getDashboard = async (req, res) => {
  try {
    const patientId = req.user._id;

    // Get latest vitals
    const latestVitals = await HealthRecord.find({ patientId })
      .sort({ date: -1 })
      .limit(10);

    // Get upcoming appointments
    const upcomingAppointments = await Appointment.find({
      patientId,
      status: { $in: ['pending', 'confirmed'] },
      date: { $gte: new Date() }
    })
      .populate('doctorId', 'name profileDetails.specialization')
      .sort({ date: 1 })
      .limit(5);

    // Calculate stats
    const bpRecords = latestVitals.filter(v => v.type === 'BP');
    const heartRateRecords = latestVitals.filter(v => v.type === 'Heart Rate');

    const stats = {
      latestBP: bpRecords[0]?.value || 'N/A',
      latestHeartRate: heartRateRecords[0]?.value || 'N/A',
      upcomingAppointments: upcomingAppointments.length,
      pendingPrescriptions: await Prescription.countDocuments({ patientId, date: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } })
    };

    res.json({
      stats,
      latestVitals,
      upcomingAppointments
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Appointments
exports.getAppointments = async (req, res) => {
  try {
    const patientId = req.user._id;
    const appointments = await Appointment.find({ patientId })
      .populate('doctorId', 'name profileDetails.specialization profileDetails.phone')
      .sort({ date: -1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Book Appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, reason } = req.body;
    const patientId = req.user._id;

    const appointment = new Appointment({
      patientId,
      doctorId,
      date,
      time,
      reason,
      status: 'pending'
    });

    await appointment.save();
    await appointment.populate('doctorId', 'name profileDetails.specialization');

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Log Vitals
exports.logVitals = async (req, res) => {
  try {
    const { type, value, unit, notes } = req.body;
    const patientId = req.user._id;

    const healthRecord = new HealthRecord({
      patientId,
      type,
      value,
      unit,
      notes,
      date: new Date()
    });

    await healthRecord.save();

    res.status(201).json({
      message: 'Vitals logged successfully',
      healthRecord
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Health Records
exports.getHealthRecords = async (req, res) => {
  try {
    const patientId = req.user._id;
    const healthRecords = await HealthRecord.find({ patientId })
      .sort({ date: -1 });

    res.json(healthRecords);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Prescriptions
exports.getPrescriptions = async (req, res) => {
  try {
    const patientId = req.user._id;
    const prescriptions = await Prescription.find({ patientId })
      .populate('doctorId', 'name profileDetails.specialization')
      .sort({ date: -1 });

    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Reschedule Appointment
exports.rescheduleAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, time } = req.body;
    const patientId = req.user._id;

    const appointment = await Appointment.findOneAndUpdate(
      { _id: id, patientId },
      { date, time },
      { new: true }
    ).populate('doctorId', 'name profileDetails.specialization');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Lab Reports
exports.getLabReports = async (req, res) => {
  try {
    const patientId = req.user._id;
    const labReports = await LabReport.find({ patientId })
      .populate('doctorId', 'name')
      .sort({ date: -1 });

    res.json(labReports);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

