import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">
      {/* Top Navbar */}
      <header className="border-b bg-white">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              M
            </span>
            <span className="text-xl font-semibold">MediTrack</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="#about">About</Link>
            <Link href="#services">Services</Link>
            <Link href="#features">Features</Link>
            <Link href="#pricing">Pricing</Link>
            <Link href="#contact">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-semibold text-primary hover:text-primary/80"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow hover:bg-primary/90"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section (like screenshots) */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto flex flex-col items-center px-6 text-center md:max-w-3xl">
          <span className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Comprehensive Platform
          </span>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Everything You Need for{' '}
            <span className="text-primary">Complete Health Management</span>
          </h1>
          <p className="mb-8 text-base text-gray-600 md:text-lg">
            From appointment scheduling to digital prescriptions, MediTrack
            connects patients and doctors across Pakistan in one secure platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white shadow hover:bg-primary/90"
            >
              Start Free Trial
            </Link>
            <Link
              href="/login?role=doctor"
              className="rounded-lg border border-primary px-8 py-3 text-sm font-semibold text-primary hover:bg-primary/5"
            >
              For Doctors
            </Link>
          </div>
        </div>
      </section>

      {/* Services / Solutions Section */}
      <section id="services" className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="mb-10 text-center">
            <span className="mb-2 inline-block text-xs font-semibold text-primary">
              Our Services
            </span>
            <h2 className="text-3xl font-bold">
              Complete Healthcare <span className="text-primary">Solutions</span>
            </h2>
            <p className="mt-3 text-gray-600">
              Manage appointments, clinical notes, and lab reports from a single,
              easy-to-use dashboard.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">Vital Signs Monitoring</h3>
              <p className="text-sm text-gray-600">
                Track heart rate, blood pressure, and other vitals over time.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">Appointments & Patients</h3>
              <p className="text-sm text-gray-600">
                Manage upcoming and completed appointments, patients, and notes.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">Clinical Notes & Reports</h3>
              <p className="text-sm text-gray-600">
                Create lab reports and clinical notes that stay attached to each patient.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section (your original idea) */}
      <section id="features" className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="mb-10 text-center text-3xl font-bold text-gray-800">
            Key Features
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <div className="mb-4 text-4xl">📅</div>
              <h3 className="mb-2 text-xl font-semibold">Easy Appointments</h3>
              <p className="text-gray-600">
                Book and manage appointments with doctors from Lahore Medical Center and other clinics.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <div className="mb-4 text-4xl">📋</div>
              <h3 className="mb-2 text-xl font-semibold">Health Records</h3>
              <p className="text-gray-600">
                Store vitals, lab results, and medical history in a single secure profile.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <div className="mb-4 text-4xl">💊</div>
              <h3 className="mb-2 text-xl font-semibold">Digital Prescriptions</h3>
              <p className="text-gray-600">
                Generate and share prescriptions digitally with patients and pharmacies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section like screenshots */}
      <section id="pricing" className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="mb-10 text-center">
            <span className="mb-2 inline-block text-xs font-semibold text-primary">
              Simple, Transparent Pricing
            </span>
            <h2 className="text-3xl font-bold">
              Choose the Perfect Plan for{' '}
              <span className="text-primary">Your Health</span>
            </h2>
            <p className="mt-3 text-gray-600">
              Start with a 30‑day free trial. No credit card required. Cancel anytime.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Free */}
            <div className="flex flex-col rounded-xl border bg-slate-50 p-6">
              <h3 className="mb-1 text-lg font-semibold">Free</h3>
              <p className="mb-4 text-3xl font-bold">$0</p>
              <ul className="mb-6 space-y-2 text-sm text-gray-600">
                <li>• Basic vital signs tracking</li>
                <li>• Up to 5 health records</li>
                <li>• Email support</li>
              </ul>
              <Link
                href="/register?plan=free"
                className="mt-auto rounded-lg bg-primary px-4 py-2 text-center text-sm font-semibold text-white hover:bg-primary/90"
              >
                Get Started
              </Link>
            </div>

            {/* Pro */}
            <div className="flex flex-col rounded-xl border-2 border-primary bg-white p-6 shadow-md">
              <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Most Popular
              </span>
              <h3 className="mb-1 text-lg font-semibold">Pro</h3>
              <p className="mb-4 text-3xl font-bold">$9.99</p>
              <ul className="mb-6 space-y-2 text-sm text-gray-600">
                <li>• Everything in Free</li>
                <li>• Unlimited health records</li>
                <li>• Telemedicine consultations</li>
                <li>• Medication tracking</li>
                <li>• Priority support</li>
              </ul>
              <Link
                href="/register?plan=pro"
                className="mt-auto rounded-lg bg-primary px-4 py-2 text-center text-sm font-semibold text-white hover:bg-primary/90"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Family */}
            <div className="flex flex-col rounded-xl border bg-slate-50 p-6">
              <h3 className="mb-1 text-lg font-semibold">Family</h3>
              <p className="mb-4 text-3xl font-bold">$24.99</p>
              <ul className="mb-6 space-y-2 text-sm text-gray-600">
                <li>• Everything in Pro</li>
                <li>• Up to 5 family members</li>
                <li>• Shared appointments</li>
                <li>• Family health dashboard</li>
              </ul>
              <Link
                href="/register?plan=family"
                className="mt-auto rounded-lg bg-primary px-4 py-2 text-center text-sm font-semibold text-white hover:bg-primary/90"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="mt-16 bg-gray-900 py-8 text-white">
        <div className="container mx-auto px-6 text-center text-sm">
          <p>© 2024 MediTrack. All rights reserved.</p>
          <p className="mt-1 text-gray-400">
            Smart Healthcare for Pakistan • contact@meditrack.pk
          </p>
        </div>
      </footer>
    </div>
  );
}
