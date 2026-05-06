# Personal Library App - Setup & Installation Guide

This is a full-stack MERN (MongoDB, Express, React, Node.js) application. 

## Prerequisites

Ensure your machine (Mac or Windows) has the following installed:

1. **Node.js** (v18 or higher)
2. **Git**

## 1. Clone & Install

Open your terminal (Mac) or Command Prompt/PowerShell (Windows) and run:

```bash
# Clone the repository
git clone <https://github.com/santiarellanos/personal-library-app.git>
cd personal-library-app

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## 2. Environment Variables

You must create a `.env` file in the `backend` folder to connect to the database. 
Create `backend/.env` and add the following keys (replace with your actual testing keys if providing to the professor):

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_secret_key_here
```

## 3. Run the Application

You will need two terminal windows open simultaneously.

**Terminal 1 (Backend Server):**

```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend Client):**

```bash
cd frontend
npm run dev
```

The application will automatically open in your default browser at `http://localhost:5173` (or whichever port Vite assigns).

---

## Notes

Git Repo Is Available Here: [https://github.com/santiarellanos/personal-library-app.git](https://github.com/santiarellanos/personal-library-app.git)

### API Documentation

Because this project utilizes Node.js/Express rather than Java, API documentation is provided via standard inline JSDoc comments within the Controller files. You can find this documentation directly in the codebase at:

- `backend/src/controllers/libraryController.js`
- `backend/src/controllers/authController.js`

### Unit Testcases

Unit testcases for the core backend logic (Models and Controllers) are located in the `backend/tests/` directory. Since this is a JavaScript application, the tests run via standard JS testing frameworks (like Jest) instead of JUnit.