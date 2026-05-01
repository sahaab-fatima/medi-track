# MediTrack - Smart Healthcare for Pakistan

A comprehensive healthcare management system connecting patients and doctors in Pakistan.

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Recharts
- jsPDF

## Quick Start

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/meditrack
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

4. Start MongoDB and run the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

## Features

### Patient Portal
- Dashboard with vitals overview
- Book and manage appointments
- View health records and lab reports
- Access prescriptions

### Doctor Portal
- Dashboard with patient statistics
- View and search patients
- Create prescriptions (with PDF download)
- Create lab reports
- View patient history

## Project Structure

```
medi-tech/
├── backend/          # Node.js/Express API
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   └── middleware/
└── frontend/         # Next.js application
    ├── app/
    ├── components/
    └── lib/
```

## Design

- Clean, professional Medical Blue theme (#0ea5e9)
- Responsive design
- Pakistani context (names, locations)
- Modular component architecture

## License

MIT

