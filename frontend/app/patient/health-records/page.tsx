'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface HealthRecord {
  _id: string;
  type: string;
  value: string;
  unit?: string;
  date: string;
  notes?: string;
}

interface LabReport {
  _id: string;
  testName: string;
  reportUrl?: string;
  date: string;
  doctorId: {
    name: string;
  };
}

export default function HealthRecordsPage() {
  const router = useRouter();
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
  const [labReports, setLabReports] = useState<LabReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'vitals' | 'lab'>('vitals');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [recordsRes, reportsRes] = await Promise.all([
        api.get('/patient/health-records'),
        api.get('/patient/lab-reports'),
      ]);
      setHealthRecords(recordsRes.data);
      setLabReports(reportsRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Health Records</h1>
        {activeTab === 'vitals' && (
          <button
            onClick={() => router.push('/patient/log-vitals')}
            className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            + Log New Vitals
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('vitals')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'vitals'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Vitals Log
        </button>
        <button
          onClick={() => setActiveTab('lab')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'lab'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Lab Reports
        </button>
      </div>

      {/* Vitals Tab */}
      {activeTab === 'vitals' && (
        <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
          {healthRecords.length === 0 ? (
            <div className="p-12 text-center text-gray-600">No vitals records found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Value</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {healthRecords.map((record) => (
                    <tr key={record._id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-gray-800">{record.type}</td>
                      <td className="px-6 py-4">
                        {record.value} {record.unit || ''}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(record.date).toLocaleDateString('en-PK', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{record.notes || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Lab Reports Tab */}
      {activeTab === 'lab' && (
        <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
          {labReports.length === 0 ? (
            <div className="p-12 text-center text-gray-600">No lab reports found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Test Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Doctor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {labReports.map((report) => (
                    <tr key={report._id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-gray-800">{report.testName}</td>
                      <td className="px-6 py-4 text-gray-600">Dr. {report.doctorId?.name || 'N/A'}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(report.date).toLocaleDateString('en-PK', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="px-6 py-4">
                        {report.reportUrl ? (
                          <a
                            href={report.reportUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-1"
                          >
                            <span>📄</span> Download PDF
                          </a>
                        ) : (
                          <span className="text-gray-400">No file available</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

