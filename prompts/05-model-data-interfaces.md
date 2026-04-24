### MANDATORY DIRECTIVE

You are an expert full-stack MERN web developer.

**CRITICAL**: Implement the logic and interfaces exactly as specified below for the Personal Library Manager architecture. Do not deviate from the requested stack or introduce unprompted features.

# Data Structures for Book Formats

### **MANDATORY: Backend Directives**

1. **Model Update (`src/models/User.js`)**:
  - Redefine the `savedBooks` field. It should no longer be an array of ObjectIds
    - It must now be an array of **objects**. Each object must contain:
      - `book`: A reference to the `Book` model (ObjectId)
      - `format`: A String with an `enum` restricted to: `['Hardcover', 'Paperback', 'Ebook', 'Audiobook']`
      - `addedAt`: A Date field defaulting to `Date.now`
2. **Controller Update (`src/controllers/libraryController.js`)**:
  - Update the `saveBookToLibrary` function to extract `format` from the request body.
    - When pushing to the `savedBooks` array, ensure it saves the new object structure: `{ book: book._id, format: format }`

### **MANDATORY: Frontend Directives**

1. **Search UI Update (`src/pages/Search.jsx`)**:
  - For every book search result, add a `<select>` dropdown menu immediately above the "Save to Library" button
    - The dropdown must contain the options: Hardcover, Paperback, Ebook, and Audiobook
    - Default the selection to "Paperback"
    - Update the "Save" function to capture the value of this dropdown and send it in the `axios` POST request as `format`

### **Verification**

1. Log in and go to `/search`
2. Select "Audiobook" from the dropdown for a specific book
3. Click "Save to Library"
4. Check MongoDB Atlas: In the `users` collection, the `savedBooks` array should now contain an object with both the book's ID and the string "Audiobook"