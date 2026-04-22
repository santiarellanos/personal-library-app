# CRITICAL REQUIREMENTS - Web Project Structure Setup

### MANDATORY DIRECTIVE

You are an expert full-stack web developer. **CRITICAL**: Create a complete web project structure in Cursor IDE for a Personal Library Manager with the exact specifications below. The purpose of this app is to provide an easy method to organize the user's personal book library, whether it is a physical or digital library.

## PROJECT STRUCTURE REQUIREMENTS

### **CRITICAL**: Create the following directory structure exactly:

```text

personalLibraryApp/

├── backend/

│   ├── src/

│   │   ├── controllers/

│   │   ├── models/

│   │   ├── routes/

│   │   ├── services/

│   │   │   └── GoogleBooksService.js

│   │   └── config/

│   ├── package.json

│   └── server.js

├── frontend/

│   ├── public/

│   ├── src/

│   │   ├── components/

│   │   │   ├── layout/

│   │   │   └── books/

│   │   ├── pages/

│   │   │   ├── Home.jsx

│   │   │   ├── Login.jsx

│   │   │   ├── Library.jsx

│   │   │   └── Search.jsx

│   │   ├── App.jsx

│   │   └── index.css

│   └── package.json

└── [README.md](http://README.md)
```text



### **MANDATORY**: Module & Import Requirements



1. **CRITICAL**: All backend controllers and routes must use standard CommonJS exports (e.g., `module.exports = {}`).

2. **CRITICAL**: All frontend React components must use ES6 module syntax (e.g., `export default function ComponentName()`).

3. **CRITICAL**: Frontend components must use clean, relative paths to import from the `components/layout/` directory.



### **MANDATORY**: Project Configuration



1. **CRITICAL**: Create a `package.json` in both the `backend/` and `frontend/` directories.

2. **CRITICAL**: Set the project name in both files to "personal-library-manager".

3. **CRITICAL**: Include an `npm run dev` script in both files to spin up the local development servers.

4. **CRITICAL**: Specify standard web dependencies (express, cors, dotenv for the backend; react, react-dom, react-router-dom for the frontend).



### **MANDATORY**: Initial File Creation



1. **CRITICAL**: Create ALL files listed above with proper initial boilerplate code only. Do not add deep implementation logic yet.

2. **CRITICAL**: Frontend `.jsx` pages must return a simple `<div>` containing the page name (e.g., `<div>Home Page</div>`) to verify routing.

3. **CRITICAL**: Backend `.js` controllers must export empty placeholder functions.

4. **CRITICAL**: `server.js` should only contain a basic Express setup and a health-check endpoint `/api/health`) to verify the server runs.



### **MANDATORY**: Verification Steps



1. **CRITICAL**: Verify `npm install` runs successfully in both the frontend and backend directories.

2. **CRITICAL**: Verify running `npm run dev` starts both servers without terminal errors.

3. **CRITICAL**: Verify navigating to the frontend port (e.g., `http://localhost:3000`) successfully loads the base application in a browser.

4. **CRITICAL**: Verify the project structure matches the diagram exactly.



### CRITICAL REQUIREMENT ###

**MANDATORY**: Complete this setup phase before proceeding to any implementation. The project structure must be exactly as specified above.
```

