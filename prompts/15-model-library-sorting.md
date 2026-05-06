### MANDATORY DIRECTIVE

You are an expert full-stack MERN web developer using React and Vite.

**CRITICAL**: Implement the logic exactly as specified below. Do NOT modify the core authentication logic or the overarching UI theme.

# Final Feature: DNF Status & Library Sorting

### **Objective**

Update the database schema to allow a "Did Not Finish" reading status. Update the Library Dashboard to visually filter and sort books by their respective shelves using a modern tab or dropdown interface.

### **MANDATORY: Directives**

1. **Model Enum Update (`backend/src/models/User.js`)**:
  - Locate the `SavedBook` sub-schema.
    - Update the `enum` array for the `shelf` attribute to include `'Did Not Finish'`. 
    - The enum should now be: `['To Read', 'Currently Reading', 'Read', 'Did Not Finish']`.
2. **Library Sorting View (`frontend/src/pages/Library.jsx`)**:
  - Introduce a new piece of state: `const [filter, setFilter] = useState('All');`.
    - **UI Additions:** Above the book grid, add a row of filter buttons or a styled select dropdown (matching the cozy UI from step 12) with the options: "All", "Currently Reading", "To Read", "Read", and "Did Not Finish".
    - **Logic:** When rendering the books, filter the mapped array based on the selected state. If `filter === 'All'`, show everything. Otherwise, only render books where `book.shelf === filter`.
    - **Empty States:** Ensure that if a user clicks a filter that has no books, a friendly message appears (e.g., "No books found on this shelf.").
3. **Status Dropdown Updates (`frontend/src/pages/Library.jsx` & `BookDetails.jsx`)**:
  - Update the `<select>` dropdown menus used to move books between shelves.
    - Add `<option value="Did Not Finish">Did Not Finish</option>` to the list of available choices.

### **Verification (Manual)**

1. Register a new book and successfully change its status to "Did Not Finish" without throwing a database 500 error.
2. Navigate to the Library page and verify clicking the different shelf filters correctly hides and shows the relevant books.

