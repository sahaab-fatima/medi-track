'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getStoredUser } from '@/lib/auth';

interface SidebarProps {
  role: 'patient' | 'doctor';
}

const patientLinks = [
  { href: '/patient/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/patient/appointments', label: 'Appointments', icon: '📅' },
  { href: '/patient/prescriptions', label: 'Prescriptions', icon: '💊' },
  { href: '/patient/health-records', label: 'Health Records', icon: '📋' },
  { href: '/patient/log-vitals', label: 'Log Vitals', icon: '📝' },
];

const doctorLinks = [
  { href: '/doctor/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/doctor/patients', label: 'Patients List', icon: '👥' },
  { href: '/doctor/prescription', label: 'Create Prescription', icon: '💊' },
  { href: '/doctor/lab-reports', label: 'Lab Reports', icon: '🔬' },
];

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const links = role === 'patient' ? patientLinks : doctorLinks;
  const user = getStoredUser();

  return (
    <div className="w-64 bg-white shadow-lg min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">MediTrack</h1>
        <p className="text-sm text-gray-600 mt-1">Smart Healthcare</p>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-500">Welcome back,</p>
        <p className="font-semibold text-gray-800">{user?.name || 'User'}</p>
      </div>

      <nav className="space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-slate-100'
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <Link
          href="/"
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }}
          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <span className="text-xl">🚪</span>
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
}

