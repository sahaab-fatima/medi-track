# How to Run MediTrack Project

This guide will walk you through setting up and running both the backend and frontend of the MediTrack application.

## Prerequisites

Before you begin, make sure you have the following installed:

1. **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
2. **MongoDB** - [Download here](https://www.mongodb.com/try/download/community)
   - Or use MongoDB Atlas (cloud) for free: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
3. **npm** (comes with Node.js) or **yarn**

## Step 1: Start MongoDB

### Option A: Local MongoDB
1. Start MongoDB service on your system:
   - **Windows**: MongoDB should start automatically as a service, or run `mongod` from command prompt
   - **Mac/Linux**: Run `mongod` in terminal or `brew services start mongodb-community` (if installed via Homebrew)

### Option B: MongoDB Atlas (Cloud - Recommended)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get your connection string (it will look like: `mongodb+srv://username:password@cluster.mongodb.net/meditrack`)

## Step 2: Set Up Backend

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   Create a file named `.env` in the `backend` folder with the following content:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/meditrack
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   ```
   
   **If using MongoDB Atlas**, replace `MONGODB_URI` with your Atlas connection string:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/meditrack
   ```

4. **Start the backend server:**
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   Connected to MongoDB
   Server is running on port 5000
   ```

   ✅ Backend is now running at `http://localhost:5000`

## Step 3: Set Up Frontend

1. **Open a NEW terminal window** (keep backend running)

2. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```
   
   This may take a few minutes as it installs Next.js, React, and other dependencies.

4. **Create `.env.local` file:**
   Create a file named `.env.local` in the `frontend` folder with:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

5. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   ▲ Next.js 14.0.4
   - Local:        http://localhost:3000
   ```

   ✅ Frontend is now running at `http://localhost:3000`

## Step 4: Access the Application

1. Open your browser and go to: **http://localhost:3000**
2. You should see the landing page
3. Click "Get Started" or "Register" to create an account
4. Choose "I am a Patient" or "I am a Doctor" and register

## Quick Test

### Register a Test Patient:
1. Go to http://localhost:3000/register
2. Select "I am a Patient"
3. Fill in:
   - Name: `Zainab Bibi`
   - Email: `zainab@test.com`
   - Password: `password123`
4. Click Register

### Register a Test Doctor:
1. Go to http://localhost:3000/register
2. Select "I am a Doctor"
3. Fill in:
   - Name: `Dr. Arshad Malik`
   - Email: `arshad@test.com`
   - Password: `password123`
4. Click Register

## Project Structure

```
medi-tech/
├── backend/              # Backend API (runs on port 5000)
│   ├── .env            # Backend environment variables
│   ├── server.js       # Entry point
│   └── ...
└── frontend/            # Frontend App (runs on port 3000)
    ├── .env.local      # Frontend environment variables
    ├── app/            # Next.js pages
    └── ...
```

## Troubleshooting

### Backend Issues

**Problem: "Cannot connect to MongoDB"**
- Make sure MongoDB is running (check with `mongosh` command)
- Verify your `MONGODB_URI` in `.env` is correct
- If using Atlas, check your IP is whitelisted and credentials are correct

**Problem: "Port 5000 already in use"**
- Change `PORT=5000` to another port (e.g., `PORT=5001`) in backend `.env`
- Update frontend `.env.local` to match: `NEXT_PUBLIC_API_URL=http://localhost:5001/api`

**Problem: "Module not found"**
- Run `npm install` again in the backend directory
- Delete `node_modules` and `package-lock.json`, then run `npm install`

### Frontend Issues

**Problem: "Cannot connect to API"**
- Make sure backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in `.env.local` matches your backend URL
- Restart the frontend server after changing `.env.local`

**Problem: "Port 3000 already in use"**
- Next.js will automatically use port 3001, 3002, etc.
- Or specify a port: `npm run dev -- -p 3001`

**Problem: "Build errors"**
- Delete `.next` folder and `node_modules`
- Run `npm install` again
- Run `npm run dev`

### General Issues

**Problem: "CORS errors"**
- Backend already has CORS enabled, but if you see errors, check that backend is running

**Problem: "Authentication not working"**
- Check browser console for errors
- Verify JWT_SECRET is set in backend `.env`
- Clear browser localStorage and try again

## Development Commands

### Backend:
```bash
cd backend
npm run dev      # Start development server with auto-reload
npm start        # Start production server
```

### Frontend:
```bash
cd frontend
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run linter
```

## Next Steps

1. ✅ Both servers running
2. ✅ Register test accounts
3. ✅ Explore the Patient Portal
4. ✅ Explore the Doctor Portal
5. ✅ Test booking appointments
6. ✅ Test creating prescriptions

## Need Help?

- Check the console logs for error messages
- Verify all environment variables are set correctly
- Make sure MongoDB is running and accessible
- Ensure both backend and frontend servers are running simultaneously

