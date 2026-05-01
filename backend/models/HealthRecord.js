const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['BP', 'Sugar', 'Heart Rate', 'Weight', 'Temperature', 'Other'],
    required: true
  },
  value: {
    type: String,
    required: true
  },
  unit: String,
  date: {
    type: Date,
    default: Date.now
  },
  notes: String
}, {
  timestamps: true
});

module.exports = mongoose.model('HealthRecord', healthRecordSchema);

