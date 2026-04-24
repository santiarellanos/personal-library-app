# CRITICAL REQUIREMENTS - Auth & Security Implementation

### MANDATORY DIRECTIVE

You are an expert full-stack web developer. **CRITICAL**: Implement secure user authentication for the Personal Library Manager using MongoDB, Mongoose, JSON Web Tokens (JWT), and Bcrypt. Do NOT use any other database or authentication strategy.

### **MANDATORY**: Backend Dependencies & Config

1. **CRITICAL**: Install `mongoose`, `bcryptjs`, `jsonwebtoken`, and `cookie-parser` in the `backend/` directory.
2. **CRITICAL**: Update `backend/.env` (and create a `.env.example`) to include `MONGO_URI` and `JWT_SECRET`.
3. **CRITICAL**: Update `server.js` to connect to MongoDB using Mongoose before starting the Express server.
4. **CRITICAL**: Update `server.js` to configure the `cors` middleware to explicitly allow requests from the frontend `http://localhost:5173` and `http://localhost:3000`) and to support sending credentials.

### **MANDATORY**: Backend Models & Routes

1. **CRITICAL**: Create `backend/src/models/User.js`. The schema must include `username` (String, required, unique), `email` (String, required, unique), and `password` (String, required).
2. **CRITICAL**: Implement a pre-save hook in `User.js` using `bcryptjs` to hash the password before saving it to the database.
3. **CRITICAL**: Create `backend/src/controllers/authController.js` with two functions: `registerUser` and `loginUser`. Both must return a signed JWT upon success.
4. **CRITICAL**: Create a custom middleware function in `backend/src/middleware/authMiddleware.js` to verify the JWT and protect private routes.

### **MANDATORY**: Frontend Wiring

1. **CRITICAL**: Install `axios` in the `frontend/` directory to handle HTTP requests to the backend.
2. **CRITICAL**: Update `frontend/src/pages/Register.jsx` (create this file if missing) and `frontend/src/pages/Login.jsx` to include basic HTML forms with email and password inputs.
3. **CRITICAL**: On successful login, the frontend must save the received JWT to `localStorage` or browser cookies to maintain the session.

### **MANDATORY**: Verification Steps

1. **CRITICAL**: Verify a new user can be registered via the frontend form and the hashed password appears in the MongoDB database.
2. **CRITICAL**: Verify an existing user can log in with correct credentials and receives a JWT.
3. **CRITICAL**: Verify that submitting incorrect credentials returns a clean `401 Unauthorized` error message to the frontend without crashing the backend server.

### CRITICAL REQUIREMENT

**MANDATORY**: Do not proceed to the Google Books API implementation until user registration, login, and token generation are 100% verified and working.