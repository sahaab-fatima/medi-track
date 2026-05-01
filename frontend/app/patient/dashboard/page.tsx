'use client';

import { useEffect, useState } from 'react';
import { getStoredUser } from '@/lib/auth';
import api from '@/lib/api';
import StatsCard from '@/components/StatsCard';
import { VitalsChart } from '@/components/Charts';

interface DashboardData {
  stats: {
    latestBP: string;
    latestHeartRate: string;
    upcomingAppointments: number;
    pendingPrescriptions: number;
  };
  latestVitals: Array<{
    type: string;
    value: string;
    date: string;
  }>;
  upcomingAppointments: Array<any>;
}

export default function PatientDashboard() {
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

  // Prepare chart data
  const chartData = data?.latestVitals
    .filter((v) => v.type === 'BP' || v.type === 'Heart Rate')
    .map((v) => ({
      date: new Date(v.date).toLocaleDateString('en-PK', { month: 'short', day: 'numeric' }),
      value: parseFloat(v.value) || 0,
      type: v.type,
    })) || [];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          As-salamu alaykum, {user?.name || 'Patient'}
        </h1>
        <p className="text-gray-600 mt-1">Welcome to your dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Blood Pressure"
          value={data?.stats.latestBP || 'N/A'}
          icon="🩺"
          color="red"
        />
        <StatsCard
          title="Heart Rate"
          value={data?.stats.latestHeartRate || 'N/A'}
          icon="❤️"
          color="red"
        />
        <StatsCard
          title="Upcoming Appointments"
          value={data?.stats.upcomingAppointments || 0}
          icon="📅"
          color="blue"
        />
        <StatsCard
          title="Recent Prescriptions"
          value={data?.stats.pendingPrescriptions || 0}
          icon="💊"
          color="green"
        />
      </div>

      {/* Chart */}
      {chartData.length > 0 && (
        <div className="mb-8">
          <VitalsChart data={chartData} title="Vitals History" />
        </div>
      )}

      {/* Upcoming Appointments */}
      {data?.upcomingAppointments && data.upcomingAppointments.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Appointments</h2>
          <div className="space-y-3">
            {data.upcomingAppointments.map((apt: any) => (
              <div
                key={apt._id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    Dr. {apt.doctorId?.name || 'Doctor'}
                  </p>
                  <p className="text-sm text-gray-600">
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

