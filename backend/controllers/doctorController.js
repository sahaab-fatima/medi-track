const User = require('../models/User');
const Appointment = require('../models/Appointment');
const Prescription = require('../models/Prescription');
const LabReport = require('../models/LabReport');
const HealthRecord = require('../models/HealthRecord');

// Dashboard
exports.getDashboard = async (req, res) => {
  try {
    const doctorId = req.user._id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todaysPatients = await Appointment.countDocuments({
      doctorId,
      date: { $gte: today, $lt: tomorrow },
      status: { $in: ['pending', 'confirmed'] }
    });

    const pendingReports = await LabReport.countDocuments({
      doctorId,
      status: 'pending'
    });

    const upcomingAppointments = await Appointment.find({
      doctorId,
      date: { $gte: today },
      status: { $in: ['pending', 'confirmed'] }
    })
      .populate('patientId', 'name email')
      .sort({ date: 1 })
      .limit(10);

    res.json({
      stats: {
        todaysPatients,
        pendingReports,
        totalPatients: await User.countDocuments({ role: 'patient' })
      },
      upcomingAppointments
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Patients List
exports.getPatients = async (req, res) => {
  try {
    const search = req.query.search || '';
    const query = {
      role: 'patient'
    };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const patients = await User.find(query)
      .select('-password')
      .sort({ name: 1 });

    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Patient History
exports.getPatientHistory = async (req, res) => {
  try {
    const { patientId } = req.params;

    const [appointments, prescriptions, labReports, healthRecords] = await Promise.all([
      Appointment.find({ patientId })
        .populate('doctorId', 'name')
        .sort({ date: -1 }),
      Prescription.find({ patientId })
        .populate('doctorId', 'name')
        .sort({ date: -1 }),
      LabReport.find({ patientId })
        .populate('doctorId', 'name')
        .sort({ date: -1 }),
      HealthRecord.find({ patientId })
        .sort({ date: -1 })
        .limit(20)
    ]);

    const patient = await User.findById(patientId).select('-password');

    res.json({
      patient,
      appointments,
      prescriptions,
      labReports,
      healthRecords
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create Prescription
exports.createPrescription = async (req, res) => {
  try {
    const { patientId, medicines, instructions } = req.body;
    const doctorId = req.user._id;

    const prescription = new Prescription({
      patientId,
      doctorId,
      medicines,
      instructions,
      date: new Date()
    });

    await prescription.save();
    await prescription.populate('patientId', 'name email');
    await prescription.populate('doctorId', 'name');

    res.status(201).json({
      message: 'Prescription created successfully',
      prescription
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create Lab Report
exports.createLabReport = async (req, res) => {
  try {
    const { patientId, testName, reportUrl, results, status } = req.body;
    const doctorId = req.user._id;

    const labReport = new LabReport({
      patientId,
      doctorId,
      testName,
      reportUrl,
      results,
      status: status || 'completed',
      date: new Date()
    });

    await labReport.save();
    await labReport.populate('patientId', 'name email');
    await labReport.populate('doctorId', 'name');

    res.status(201).json({
      message: 'Lab report created successfully',
      labReport
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

