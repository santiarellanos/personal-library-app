### MANDATORY DIRECTIVE ###
You are an expert full-stack MERN web developer.

**CRITICAL**: Implement the logic and interfaces exactly as specified below for the Personal Library Manager architecture. Do not deviate from the requested stack or introduce unprompted features

### **Objective**
Create the Mongoose schema for Books, update the User schema to reference saved books, and build the full-stack route to allow users to save a book from the Google search results into their personal library

### **MANDATORY: Backend Directives**
1. **Model (`src/models/Book.js`)**: Create a Mongoose schema for a Book
    * Fields must perfectly match the stripped-down Google API data: `googleId` (String, required, unique), `title` (String), `authors` (Array of Strings), `description` (String), `pageCount` (Number), `coverImage` (String)
2. **Model Update (`src/models/User.js`)**: 
    * Add a new field called `savedBooks` which is an array of Mongoose ObjectIds referencing the `Book` model
3. **Controller (`src/controllers/libraryController.js`)**: Create a new controller with a `saveBookToLibrary` function
    * It must accept the book data from the request body
    * It must check if the book already exists in the `Book` collection (by `googleId`). If not, create it
    * It must find the logged-in user (using the JWT from the `authMiddleware`) and push the Book's `_id` into the user's `savedBooks` array
4. **Routes (`src/routes/libraryRoutes.js`)**: 
    * Create a `POST /save` route that uses the `authMiddleware` (to protect the route) and triggers the `saveBookToLibrary` controller
    * Mount this new route in `server.js` at `/api/library`

### **MANDATORY: Frontend Directives**
1. **Save Action (`src/pages/Search.jsx`)**: 
    * Add a "Save to Library" button to the existing book result cards
    * When clicked, use `axios` to make a POST request to `http://localhost:5001/api/library/save`
    * **CRITICAL**: You must pass the JWT token in the `Authorization` header so the backend knows which user is saving the book. Read the token from `localStorage`
    * Show a simple Javascript `alert()` confirming the book was saved successfully, or an alert showing the error

### **Verification (Manual)**
1. Log in to the application to generate a fresh JWT
2. Navigate to `/search` and search for a book
3. Click "Save to Library"
4. Check your MongoDB Atlas cluster: The `books` collection should have a new document, and your `users` document should have a new ID inside its `savedBooks` array