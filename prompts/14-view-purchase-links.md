### MANDATORY DIRECTIVE

You are an expert full-stack MERN web developer using React and Vite.

**CRITICAL**: You are adding UI features and fixing accessibility only. Do NOT modify the core Library or Auth logic.

# Final Polish: Search Accessibility & Purchase Links

### **Objective**

Ensure the Search page handles 'Enter' key submissions correctly and add dynamic, crash-proof purchase links (Amazon and Barnes & Noble) to the Book Details page.

### **MANDATORY: Directives**

1. **Search Accessibility Fix (`frontend/src/pages/Search.jsx`)**:
  - **Structure:** Ensure the search input and search button are wrapped in a native `<form>` tag
    - **Trigger:** Move the search API call logic from the button's `onClick` to the form's `onSubmit`
    - **CRITICAL:** Ensure `e.preventDefault()` is called immediately in the submit handler to prevent page refresh
    - **Button:** Explicitly set the search button to `type="submit"`
2. **Crash-Proof Purchase Links (`frontend/src/pages/BookDetails.jsx`)**:
  - **Logic:** Use the current `book` object's title and author to create search URLs. 
    - **Safety:** The Google Books API occasionally returns books without an `authors` array. You MUST use optional chaining and a fallback string to prevent a fatal crash (e.g., `const authorQuery = book.authors?.[0] || '';`).
    - **Amazon Link:** `https://www.amazon.com/s?k=${encodeURIComponent(book.title + ' ' + authorQuery)}`
    - **Barnes & Noble Link:** `https://www.barnesandnoble.com/s/${encodeURIComponent(book.title + ' ' + authorQuery)}`
    - **UI:** Add a "Purchase Options" section below the book details. Create two styled buttons (or link pills): "Buy on Amazon" and "Buy on Barnes & Noble"
    - **Security:** Ensure both external links use `target="_blank"` and `rel="noopener noreferrer"`
3. **Visual UI Polish**:
  - Ensure these new buttons match the "cozy" modern UI theme established in Step 12 (rounded corners, soft hover effects)

### **Verification (Manual)**

1. Navigate to the Search page and verify hitting the 'Enter' key successfully triggers the search.
2. Navigate to a Book Details page and verify clicking the external links safely opens a new tab with the correct search query.