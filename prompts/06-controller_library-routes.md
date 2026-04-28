### MANDATORY DIRECTIVE

You are an expert full-stack MERN web developer.

**CRITICAL**: Implement the logic and interfaces exactly as specified below for the Personal Library Manager architecture. Do not modify the existing search logic in `bookController.js` or the authentication logic in `authController.js`.

# Backend Routes for Library Management

### **Objective**

Create the core backend API endpoints necessary to fetch a user's populated library and to remove a book from their collection.

### **MANDATORY: Backend Directives**

1. **Controller Update (`src/controllers/libraryController.js`)**:
  - **Add a `getUserLibrary` function:** * Find the current user using `req.user.userId` (provided by the `authMiddleware`).
  - Use Mongoose `.populate()` on the `savedBooks.book` path to replace the Book ObjectIds with the full Book documents so the frontend can display titles, authors, and covers.
  - Return the populated `savedBooks` array with a 200 status code.
    - **Add a `removeBookFromLibrary` function:**
      - Accept a `bookId` parameter from the route URL (`req.params.bookId`).
      - Find the current user and use the `$pull` operator to remove the specific object from the `savedBooks` array where the `book` reference matches the provided `bookId`.
      - Return a 200 success JSON message.
2. **Routes Update (`src/routes/libraryRoutes.js`)**:
  - Add a `GET /` route that uses `authMiddleware` and triggers `getUserLibrary`.
    - Add a `DELETE /remove/:bookId` route that uses `authMiddleware` and triggers `removeBookFromLibrary`.

### **Verification (Manual)**

1. Ensure the server restarts successfully without syntax errors.
2. The `getUserLibrary` endpoint must gracefully handle empty libraries by returning an empty array `[]`.