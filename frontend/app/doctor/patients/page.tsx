'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface Patient {
  _id: string;
  name: string;
  email: string;
  profileDetails?: {
    phone?: string;
    city?: string;
  };
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await api.get(`/doctor/patients?search=${searchTerm}`);
      setPatients(response.data);
    } catch (error) {
      console.error('Failed to fetch patients:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchPatients();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleViewHistory = (patientId: string) => {
    router.push(`/doctor/patients/${patientId}/history`);
  };

  if (loading && patients.length === 0) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Patients List</h1>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {patients.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 text-lg">No patients found</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">City</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {patients.map((patient) => (
                  <tr key={patient._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-gray-800">{patient.name}</td>
                    <td className="px-6 py-4 text-gray-600">{patient.email}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {patient.profileDetails?.phone || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {patient.profileDetails?.city || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewHistory(patient._id)}
                        className="text-primary hover:underline font-medium"
                      >
                        View History
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

