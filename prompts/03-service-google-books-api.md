# Phase 3: Google Books API Integration

### **Objective**
Build a secure backend route to fetch book data from the public Google Books API, and create a React frontend page where users can search for books by title or author

### **MANDATORY: Backend Directives**
1. **Controller (`src/controllers/bookController.js`)**: Create a new controller with a `searchBooks` function
    * It must accept a search query (`q`) from the request
    * Use `axios` to make a GET request to `https://www.googleapis.com/books/v1/volumes?q=[QUERY]`
    * **CRITICAL**: The Google Books API returns massive, nested JSON objects. You must map over the results and return a clean, simplified array of objects to the frontend containing ONLY: `googleId` (the volume id), `title`, `authors` (array), `description`, `pageCount`, and `coverImage` (from imageLinks.thumbnail)
2. **Routes (`src/routes/bookRoutes.js`)**: Create a new route file
    * Create a `GET /search` route that triggers the `searchBooks` controller
3. **Server Registration (`server.js`)**: 
    * Import the new `bookRoutes` and mount them at `/api/books`

### **MANDATORY: Frontend Directives**
1. **Search Page (`src/pages/Search.jsx`)**: Create a new page component containing:
    * A text input field for the search query
    * A "Search" button
    * A visual grid or list mapping over the search results returned by the backend, displaying the book cover, title, and author
    * When the user clicks Search, use `axios` to make a GET request to `http://localhost:5001/api/books/search?q=[query]`
2. **Routing (`src/App.jsx`)**: Add a new route for `/search` that renders the `Search` component
3. **Navigation (`src/components/Navbar.jsx`)**: It is time to add navigation so the user doesn't have to type URLs manually
    * Create a simple Navbar component with links to Home (`/`), Login (`/login`), Register (`/register`), and Search (`/search`)
    * Insert this Navbar into `App.jsx` so it appears at the top of every page

### **Verification (Manual)**
1. Ensure both backend and frontend servers are running (`npm run dev`)
2. Navigate to `http://localhost:5173/search`
3. Type a book title (e.g. "The Martian") and click search
4. Verify that clean book cards appear on the screen containing the title, author, and cover image