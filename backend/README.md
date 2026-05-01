# MediTrack Backend API

Backend API for MediTrack healthcare management system built with Node.js, Express, and MongoDB.

## Features

- User Authentication (JWT)
- Patient Routes (Dashboard, Appointments, Health Records)
- Doctor Routes (Patients List, Prescriptions, Lab Reports)
- MongoDB Database with Mongoose

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/meditrack
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

3. Make sure MongoDB is running on your system.

4. Start the server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Patient Routes (requires authentication)
- `GET /api/patient/dashboard` - Get patient dashboard data
- `GET /api/patient/appointments` - Get patient appointments
- `POST /api/patient/book-appointment` - Book a new appointment
- `POST /api/patient/vitals` - Log health vitals
- `GET /api/patient/health-records` - Get health records
- `GET /api/patient/prescriptions` - Get prescriptions
- `GET /api/patient/lab-reports` - Get lab reports

### Doctor Routes (requires authentication)
- `GET /api/doctor/dashboard` - Get doctor dashboard data
- `GET /api/doctor/patients` - Get patients list
- `GET /api/doctor/patients/:patientId/history` - Get patient history
- `POST /api/doctor/prescription` - Create prescription
- `POST /api/doctor/lab-report` - Create lab report

## Project Structure

```
backend/
├── models/          # MongoDB schemas
├── controllers/     # Route controllers
├── routes/          # API routes
├── middleware/      # Auth middleware
└── server.js        # Entry point
```

