### MANDATORY DIRECTIVE ###
You are an expert full-stack MERN web developer using React and Vite.

**CRITICAL**: Implement the logic exactly as specified below. Do NOT modify the existing core Library Dashboard API calls or the Mongoose User schema.

# Feature Addition: Auth Payload Update, Home Dashboard & Accessibility

### **Objective**
Ensure the backend authentication payload includes the user's existing username. Overhaul the existing blank root page (`/`) into a centralized Home Dashboard. Fix global form accessibility so the "Enter" key triggers form submissions.

### **MANDATORY: Directives**

1. **Backend Auth Payload Update (`backend/src/controllers/authController.js`)**:
    * **Controller:** Update the `login` and `register` functions. When sending the successful response back to the client, ensure the `username` field from the database is included in the returned user object/payload (alongside the email and ID) 
    * Update the frontend Auth context/state to ensure it stores this `username` when a user logs in

2. **Global Form Accessibility (`frontend/src/pages/Login.jsx`, `Register.jsx`, `Search.jsx`)**:
    * Wrap the existing input fields and submit buttons inside a native HTML `<form>` tag
    * Change the button's `onClick` handler to the form's `onSubmit` handler 
    * **CRITICAL:** Ensure you use `e.preventDefault()` inside the submit function to stop the page from reloading

3. **Home Dashboard Overhaul**:
    * Locate the component currently rendering the blank home page at the `/` route (e.g., `Home.jsx` or similar). Update it with the following UI:
    * **Welcome Banner:** Display a prominent welcome message using the username from the auth state: "Welcome back, {username || 'Reader'}!"
    * **Search CTA:** Include a prominently styled primary button that routes the user directly to the `/search` page
    * **"To Read" Preview:** Use `useEffect` and `axios` (with the JWT authorization header) to fetch the user's library (`GET /api/library`) 
    * Filter the returned array to only include books where `shelf === 'To Read'`, and `.slice(0, 4)` to display a maximum of 4 books 
    * Display these books using your existing Book Card CSS classes. If the "To Read" array is empty, display a friendly message: "Your 'To Read' list is empty. Time to find your next great read!"

### **Verification (Manual)**
1. Log out, then log back in by pressing the "Enter" key instead of clicking the button.
2. Verify the login redirects to the updated Home Dashboard, displaying the correct username ("santiago") and functional "To Read" preview.