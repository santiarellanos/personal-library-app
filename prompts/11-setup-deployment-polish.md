### MANDATORY DIRECTIVE

You are an expert MERN stack developer preparing a project for a university final submission.

**CRITICAL**: You are adding documentation and testing only. Do NOT modify the core logic of any existing React components, Node routes, or Mongoose models.

# Final Polish: JSDoc and Unit Tests

### **MANDATORY: Directives**

1. **API Documentation (`backend/src/controllers/libraryController.js` & `backend/src/controllers/authController.js`)**:
  - Add standard JSDoc block comments above every single function
    - The comments must include a description of the function, `@param` tags for the Express `req` and `res` objects, and `@returns` tags describing the JSON payload and status codes
2. **Unit Testing Setup (`backend/`)**:
  - Install `jest` as a development dependency in the backend.
    - Update the backend `package.json` to include `"test": "jest"` in the scripts section. (Ensure Jest is configured correctly if the project uses `"type": "module"`).
    - Create a new folder: `backend/tests/`.
3. **Unit Test Generation (`backend/tests/libraryController.test.js`)**:
  - Create a test file that validates the logic of the `libraryController` functions directly
    - **CRITICAL SAFETY PROTOCOL 1:** Test the controller functions in isolation by passing mocked `req` and `res` objects (e.g., `const req = { user: { userId: '123' }, body: {}, params: {} }`). Do NOT try to spin up the Express app to test the routes
    - **CRITICAL SAFETY PROTOCOL 2:** You MUST mock the `User` database model using `jest.mock()`. Provide mock return data for functions like `.findById()` and `.findOne()`. Do NOT attempt to connect to a live MongoDB database
    - Write at least three distinct `test()` blocks (e.g., "should successfully fetch a user's library", "should calculate reading stats correctly")

### **Verification (Manual)**

1. Ensure the code comments look professional.
2. The user should be able to navigate to the backend folder and run `npm run test` to see the Jest tests pass without database connection errors.