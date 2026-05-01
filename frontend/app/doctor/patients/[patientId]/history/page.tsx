'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';

interface PatientHistory {
  patient: {
    name: string;
    email: string;
  };
  appointments: Array<any>;
  prescriptions: Array<any>;
  labReports: Array<any>;
  healthRecords: Array<any>;
}

export default function PatientHistoryPage() {
  const params = useParams();
  const router = useRouter();
  const [history, setHistory] = useState<PatientHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'appointments' | 'prescriptions' | 'lab' | 'vitals'>('appointments');

  useEffect(() => {
    fetchHistory();
  }, [params.patientId]);

  const fetchHistory = async () => {
    try {
      const response = await api.get(`/doctor/patients/${params.patientId}/history`);
      setHistory(response.data);
    } catch (error) {
      console.error('Failed to fetch patient history:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!history) {
    return <div className="text-center py-12">Patient not found</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="text-primary hover:underline mb-4 inline-block"
        >
          ← Back to Patients
        </button>
        <h1 className="text-3xl font-bold text-gray-800">
          Patient History: {history.patient.name}
        </h1>
        <p className="text-gray-600 mt-1">{history.patient.email}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {(['appointments', 'prescriptions', 'lab', 'vitals'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium transition-colors capitalize ${
              activeTab === tab
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
        {activeTab === 'appointments' && (
          <div>
            {history.appointments.length === 0 ? (
              <p className="text-gray-600">No appointments found</p>
            ) : (
              <div className="space-y-3">
                {history.appointments.map((apt: any) => (
                  <div key={apt._id} className="bg-slate-50 p-4 rounded-lg">
                    <p className="font-semibold">
                      {new Date(apt.date).toLocaleDateString('en-PK')} at {apt.time}
                    </p>
                    <p className="text-sm text-gray-600">Status: {apt.status}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'prescriptions' && (
          <div>
            {history.prescriptions.length === 0 ? (
              <p className="text-gray-600">No prescriptions found</p>
            ) : (
              <div className="space-y-4">
                {history.prescriptions.map((pres: any) => (
                  <div key={pres._id} className="bg-slate-50 p-4 rounded-lg">
                    <p className="font-semibold mb-2">
                      {new Date(pres.date).toLocaleDateString('en-PK')}
                    </p>
                    <div className="space-y-1">
                      {pres.medicines.map((med: any, idx: number) => (
                        <p key={idx} className="text-sm">
                          {med.name} - {med.dosage} ({med.frequency})
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'lab' && (
          <div>
            {history.labReports.length === 0 ? (
              <p className="text-gray-600">No lab reports found</p>
            ) : (
              <div className="space-y-3">
                {history.labReports.map((report: any) => (
                  <div key={report._id} className="bg-slate-50 p-4 rounded-lg">
                    <p className="font-semibold">{report.testName}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(report.date).toLocaleDateString('en-PK')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'vitals' && (
          <div>
            {history.healthRecords.length === 0 ? (
              <p className="text-gray-600">No vitals records found</p>
            ) : (
              <div className="space-y-3">
                {history.healthRecords.map((record: any) => (
                  <div key={record._id} className="bg-slate-50 p-4 rounded-lg">
                    <p className="font-semibold">
                      {record.type}: {record.value} {record.unit || ''}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(record.date).toLocaleDateString('en-PK')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

