### MANDATORY DIRECTIVE ###
You are an expert full-stack MERN web developer.

**CRITICAL**: Implement the logic exactly as specified below. Do NOT modify or remove any existing routes, authentication logic, or controller functions.

# Backend Routes for Reading Stats

### **Objective**
Create a backend API endpoint to calculate and return the user's reading statistics based on their library.

### **MANDATORY: Backend Directives**

1. **Controller Update (`src/controllers/libraryController.js`)**:
    * **Add a new `getUserStats` function:** (Do NOT delete existing functions like `getUserLibrary`, `saveBookToLibrary`, `removeBookFromLibrary`, or `updateBookShelf`)
        * Find the current user using `req.user.userId`
        * Use Mongoose `.populate('savedBooks.book')` to access the underlying book details
        * Calculate the following statistics by iterating through the user's `savedBooks` array:
            * `totalBooks`: Total number of items in the `savedBooks` array
            * `booksRead`: Count of items where `shelf` is exactly `'Read'`
            * `booksCurrentlyReading`: Count of items where `shelf` is exactly `'Currently Reading'`
            * `totalPagesRead`: Sum of the `pageCount` from the populated `book` object ONLY for items where `shelf` is `'Read'`. (CRITICAL: Handle cases where `item.book.pageCount` might be missing, undefined, or null by defaulting to 0 before adding)
        * Return a 200 status code with a JSON object containing these 4 stats

2. **Routes Update (`src/routes/libraryRoutes.js`)**:
    * Import the `getUserStats` function at the top
    * Add a `GET /stats` route that uses `authMiddleware` and triggers `getUserStats`.
    * **CRITICAL:** Add this new route near the top of your routes list to prevent any potential URL parameter conflicts. Do not remove any of the existing routes

### **Verification (Manual)**
1. Ensure the backend server restarts successfully without syntax errors.