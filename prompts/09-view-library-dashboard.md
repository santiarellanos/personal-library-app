### MANDATORY DIRECTIVE

You are an expert full-stack MERN web developer using React and Vite.

**CRITICAL**: Implement the logic exactly as specified below. Do NOT modify the existing Search page, Login/Register pages, or Auth setup.

# Frontend View for Library Dashboard

### **Objective**

Create the main Library Dashboard interface that fetches the user's saved books and allows them to change shelf statuses or remove books directly from the UI.

### **MANDATORY: Frontend Directives**

1. **Component Creation (`frontend/src/pages/Library.jsx` or equivalent main view)**:
  - **Data Fetching:** On component mount (`useEffect`), use `axios` to make a `GET` request to your backend library route to fetch the user's populated library
    - **Auth Header:** You MUST include the user's JWT token in the request headers (e.g., `{ Authorization: \`Bearer ${localStorage.getItem('token')} }` or using your existing auth context)
    - **State Management:** Store the returned array in a React state variable (e.g., `const [library, setLibrary] = useState([])`)
    - **UI Layout:** Render a responsive CSS Grid displaying a "Book Card" for each item. If the library array is empty, show a friendly message linking back to the Search page
    - **Book Card Contents:**
      - Display the `coverImage`, `title`, and `authors` from the populated `book` object
      - Display the `format` string (e.g., Audiobook, Paperback)
      - Render a `<select>` dropdown for the Shelf status (`To Read`, `Currently Reading`, `Read`). The `value` must be the item's current `shelf`
      - Render a "Remove" button (a simple red button or trash icon)
2. **Interactive Handlers**:
  - **Shelf Change (`handleShelfChange`):** On dropdown change, make a `PATCH` request to the backend `update-shelf` route. On success, use `.map()` on your local `library` state to update the shelf for that specific book so the UI updates instantly without a page refresh
    - **Remove Book (`handleRemove`):** On button click, make a `DELETE` request to the backend `remove` route. On success, use `.filter()` to remove the book from the local `library` state so it vanishes instantly
3. **Routing Integration (`frontend/src/App.jsx`)**:
  - Ensure the `Library` component is imported and added as a route (e.g., `/` or `/library`)
    - Ensure there is a navigation link to this dashboard in your main Navbar so the user can easily click between "Search" and "My Library"

### **Verification (Manual)**

1. Ensure the frontend compiles successfully.
2. The user should be able to view their saved books, change shelves, and remove books without manually refreshing the browser.