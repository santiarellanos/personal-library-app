### MANDATORY DIRECTIVE

You are an expert full-stack MERN web developer using React and Vite.

**CRITICAL**: Implement the logic exactly as specified below. Do NOT modify the existing Search, Library Dashboard, or Auth logic.

# Book Details View & Logic

### **Objective**

Create a dedicated page for individual books where the user can view the full details, add personal notes, and leave a 1-5 star rating.

### **MANDATORY: Directives**

1. **Backend Model Update (`src/models/User.js`)**:
  - Add `notes` (String, default `""`) and `rating` (Number, min 0, max 5, default `0`) to the `savedBooks` array schema object
    - **CRITICAL:** Do NOT modify `book`, `format`, `addedAt`, or `shelf`
2. **Backend Controller Updates (`src/controllers/libraryController.js`)**:
  - **Add `getBookDetails` function:** Accept `bookId` from parameters. Find the user, locate the specific book in their `savedBooks` array, use `.populate()` to get the full book data, and return this single object
    - **Add `updateBookDetails` function:** Accept `notes` and `rating` from `req.body`. Find the user and use the Mongoose `$set` operator with the positional operator `$` to update `"savedBooks.$.notes"` and `"savedBooks.$.rating"` for the matching book. Return a 200 success response
    - **CRITICAL:** Do not delete any existing functions in this file
3. **Backend Routes (`src/routes/libraryRoutes.js`)**:
  - Add a `GET /details/:bookId` route triggering `getBookDetails`
    - Add a `PATCH /details/:bookId` route triggering `updateBookDetails`
    - Ensure both use `authMiddleware`
4. **Frontend Component (`frontend/src/pages/BookDetails.jsx`)**:
  - Create a new page component that reads the `bookId` from the URL parameters (`useParams`)
    - Use `useEffect` and `axios` (with the JWT token in headers) to fetch the specific book from `GET /api/library/details/${bookId}`
    - **UI Layout:** Display the cover image, title, authors, and format prominently
    - **Interactive Elements:**
      - A `<textarea>` for "Personal Notes" (bound to state)
      - A number input or select dropdown for "Rating (0-5)" (bound to state)
      - A "Save Changes" button that sends a `PATCH` request to your backend with the updated notes and rating. Show a visual success message (like "Saved!") when successful
5. **Frontend Routing Integration (`frontend/src/App.jsx` & `Library.jsx`)**:
  - Add the new route to `App.jsx`: `<Route path="/library/:bookId" element={<BookDetails />} />`
    - Update the Book Cards in `Library.jsx` so that clicking the cover image or title navigates the user to `/library/${bookId}` (using React Router's `Link` or `useNavigate`)

### **Verification (Manual)**

1. Ensure the servers restart cleanly.
2. Clicking a book cover in the library must route to the details page, and saving notes must persist in the database.