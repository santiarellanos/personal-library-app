### MANDATORY DIRECTIVE

You are an expert full-stack MERN web developer.

**CRITICAL**: Implement the logic exactly as specified below. Do not modify existing authentication or search logic.

# Backend Routes for Shelf Logic

### **Objective**

Update the user model and library controller to support custom reading shelves.

### **MANDATORY: Backend Directives**

1. **Model Update (`src/models/User.js`)**:
  - Update the `savedBooks` array schema object. Add a new `shelf` property.
    - `shelf`: String, enum of `['To Read', 'Currently Reading', 'Read']`, default is `'To Read'`.
    - **CRITICAL:** Do NOT remove or modify the existing `book`, `format`, or `addedAt` properties inside this array.
2. **Controller Update (`src/controllers/libraryController.js`)**:
  - **Modify `saveBookToLibrary`:** Update the logic so that when a new book is saved, it explicitly sets `shelf: 'To Read'` if one is not provided in the request body.
    - **Add `updateBookShelf` function:**
      - Accept `bookId` from `req.params.bookId` and `shelf` from `req.body`.
      - Validate that the `shelf` value is one of the allowed enums.
      - Find the current user and update the specific book's `shelf` value inside the `savedBooks` array (hint: use the Mongoose `$set` operator with the positional operator `$` or `arrayFilters`).
      - Return a 200 status JSON message containing the updated shelf.
3. **Routes Update (`src/routes/libraryRoutes.js`)**:
  - Add a `PATCH /update-shelf/:bookId` route that uses `authMiddleware` and triggers `updateBookShelf`.

### **Verification (Manual)**

1. Ensure the backend server restarts successfully without syntax errors.