'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import jsPDF from 'jspdf';

interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export default function CreatePrescriptionPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    patientId: '',
    medicines: [{ name: '', dosage: '', frequency: '', duration: '' }] as Medicine[],
    instructions: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addMedicine = () => {
    setFormData({
      ...formData,
      medicines: [...formData.medicines, { name: '', dosage: '', frequency: '', duration: '' }],
    });
  };

  const removeMedicine = (index: number) => {
    setFormData({
      ...formData,
      medicines: formData.medicines.filter((_, i) => i !== index),
    });
  };

  const updateMedicine = (index: number, field: keyof Medicine, value: string) => {
    const updatedMedicines = [...formData.medicines];
    updatedMedicines[index] = { ...updatedMedicines[index], [field]: value };
    setFormData({ ...formData, medicines: updatedMedicines });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/doctor/prescription', {
        patientId: formData.patientId,
        medicines: formData.medicines.filter((m) => m.name && m.dosage && m.frequency),
        instructions: formData.instructions,
      });

      // Generate PDF
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('Prescription', 20, 20);
      doc.setFontSize(12);
      doc.text(`Patient ID: ${formData.patientId}`, 20, 35);
      doc.text(`Date: ${new Date().toLocaleDateString('en-PK')}`, 20, 45);

      let yPos = 60;
      doc.setFontSize(14);
      doc.text('Medications:', 20, yPos);
      yPos += 10;

      formData.medicines.forEach((med, index) => {
        if (med.name && med.dosage && med.frequency) {
          doc.setFontSize(12);
          doc.text(`${index + 1}. ${med.name}`, 25, yPos);
          doc.text(`   Dosage: ${med.dosage} | Frequency: ${med.frequency}${med.duration ? ` | Duration: ${med.duration}` : ''}`, 25, yPos + 7);
          yPos += 15;
        }
      });

      if (formData.instructions) {
        yPos += 5;
        doc.setFontSize(14);
        doc.text('Instructions:', 20, yPos);
        doc.setFontSize(12);
        doc.text(formData.instructions, 20, yPos + 7, { maxWidth: 170 });
      }

      doc.save(`prescription-${formData.patientId}-${Date.now()}.pdf`);

      alert('Prescription created and PDF downloaded successfully!');
      router.push('/doctor/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create prescription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Prescription</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patient ID
          </label>
          <input
            type="text"
            required
            value={formData.patientId}
            onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter Patient ID"
          />
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium text-gray-700">Medications</label>
            <button
              type="button"
              onClick={addMedicine}
              className="text-primary hover:underline text-sm font-medium"
            >
              + Add Medicine
            </button>
          </div>

          <div className="space-y-4">
            {formData.medicines.map((medicine, index) => (
              <div key={index} className="bg-slate-50 p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-gray-700">Medicine {index + 1}</span>
                  {formData.medicines.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMedicine(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Name</label>
                    <input
                      type="text"
                      required
                      value={medicine.name}
                      onChange={(e) => updateMedicine(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="e.g., Paracetamol"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Dosage</label>
                    <input
                      type="text"
                      required
                      value={medicine.dosage}
                      onChange={(e) => updateMedicine(index, 'dosage', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="e.g., 500mg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Frequency</label>
                    <input
                      type="text"
                      required
                      value={medicine.frequency}
                      onChange={(e) => updateMedicine(index, 'frequency', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="e.g., Twice daily"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Duration (optional)</label>
                    <input
                      type="text"
                      value={medicine.duration}
                      onChange={(e) => updateMedicine(index, 'duration', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="e.g., 7 days"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Instructions
          </label>
          <textarea
            value={formData.instructions}
            onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            rows={4}
            placeholder="Additional instructions for the patient..."
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Prescription & Download PDF'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

