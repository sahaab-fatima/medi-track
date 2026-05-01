'use client';

import { useEffect, useState } from 'react';
import { getStoredUser } from '@/lib/auth';
import api from '@/lib/api';
import StatsCard from '@/components/StatsCard';

interface DashboardData {
  stats: {
    todaysPatients: number;
    pendingReports: number;
    totalPatients: number;
  };
  upcomingAppointments: Array<{
    _id: string;
    patientId: {
      name: string;
      email: string;
    };
    date: string;
    time: string;
    status: string;
  }>;
}

export default function DoctorDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const user = getStoredUser();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/dashboard');
      setData(response.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, Dr. {user?.name || 'Doctor'}
        </h1>
        <p className="text-gray-600 mt-1">Here's your dashboard overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Today's Patients"
          value={data?.stats.todaysPatients || 0}
          icon="👥"
          color="blue"
        />
        <StatsCard
          title="Pending Reports"
          value={data?.stats.pendingReports || 0}
          icon="📋"
          color="orange"
        />
        <StatsCard
          title="Total Patients"
          value={data?.stats.totalPatients || 0}
          icon="🏥"
          color="green"
        />
      </div>

      {/* Upcoming Appointments */}
      {data?.upcomingAppointments && data.upcomingAppointments.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Appointments</h2>
          <div className="space-y-3">
            {data.upcomingAppointments.map((apt) => (
              <div
                key={apt._id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
              >
                <div>
                  <p className="font-semibold text-gray-800">{apt.patientId?.name || 'Patient'}</p>
                  <p className="text-sm text-gray-600">{apt.patientId?.email}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(apt.date).toLocaleDateString('en-PK', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}{' '}
                    at {apt.time}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    apt.status === 'confirmed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {apt.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

