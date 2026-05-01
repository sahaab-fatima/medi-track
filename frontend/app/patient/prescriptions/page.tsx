'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration?: string;
}

interface Prescription {
  _id: string;
  doctorId: {
    name: string;
    profileDetails?: {
      specialization?: string;
    };
  };
  medicines: Medicine[];
  instructions?: string;
  date: string;
}

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await api.get('/patient/prescriptions');
      setPrescriptions(response.data);
    } catch (error) {
      console.error('Failed to fetch prescriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Prescriptions</h1>

      {prescriptions.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 text-lg">No prescriptions found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {prescriptions.map((prescription) => (
            <div key={prescription._id} className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-semibold text-lg text-gray-800">
                    Dr. {prescription.doctorId?.name || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {prescription.doctorId?.profileDetails?.specialization || 'General Practitioner'}
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  {new Date(prescription.date).toLocaleDateString('en-PK', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Medications:</h3>
                <div className="space-y-2">
                  {prescription.medicines.map((medicine, index) => (
                    <div key={index} className="bg-slate-50 p-3 rounded-lg">
                      <p className="font-medium text-gray-800">{medicine.name}</p>
                      <p className="text-sm text-gray-600">
                        Dosage: {medicine.dosage} | Frequency: {medicine.frequency}
                        {medicine.duration && ` | Duration: ${medicine.duration}`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {prescription.instructions && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Instructions:</h3>
                  <p className="text-gray-600">{prescription.instructions}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

