# MediTrack Frontend

Frontend application for MediTrack built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- Landing Page
- Authentication (Login/Register)
- Patient Portal (Dashboard, Appointments, Health Records, Prescriptions)
- Doctor Portal (Dashboard, Patients List, Prescription Form, Lab Reports)
- Responsive Design with Medical Blue Theme

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the frontend directory:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── login/             # Login page
│   ├── register/          # Register page
│   ├── patient/           # Patient portal
│   └── doctor/            # Doctor portal
├── components/            # Reusable components
│   ├── Sidebar.tsx
│   ├── Navbar.tsx
│   ├── StatsCard.tsx
│   └── Charts.tsx
└── lib/                   # Utilities
    ├── api.ts            # API client
    └── auth.ts           # Auth helpers
```

## Design

- Theme: Medical Blue (#0ea5e9)
- Background: Slate-50
- Components: Modular and reusable
- Mock Data: Pakistani names and locations

