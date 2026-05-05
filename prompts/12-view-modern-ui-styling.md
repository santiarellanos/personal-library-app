### MANDATORY DIRECTIVE ###
You are an expert frontend developer and UX/UI designer.

**CRITICAL**: You are performing a visual redesign ONLY. You are strictly forbidden from modifying ANY state management (`useState`), side effects (`useEffect`), API calls (`axios`), routing (`react-router-dom`), or backend logic.

# Frontend UI Modernization: Cozy & System-Aware

### **MANDATORY: Styling Directives**

1. **Global CSS Variables & Theming (`frontend/src/index.css` or `App.css`)**:
    * **Light Mode (Default):** Use a cozy, warm palette. Backgrounds should be off-white or soft cream (e.g., `#faf9f6`), cards pure white, text warm dark gray (`#2d3748`), and a calming primary accent color (like soft sage, muted indigo, or warm terracotta).
    * **Dark Mode (Automatic):** Implement `@media (prefers-color-scheme: dark)`. Override the CSS variables with deep, cozy dark tones. Backgrounds should be deep slate/charcoal (not harsh black, e.g., `#1e293b`), cards slightly lighter (`#334155`), text soft off-white, and desaturate the accent color slightly so it doesn't strain the eyes
    * Use a modern sans-serif font (import 'Inter', 'Nunito', or 'Outfit' from Google Fonts)
    * Define CSS variables for `border-radius: 16px` (for that cozy, friendly feel) and soft transitions (`transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease`)

2. **Component Modernization (Targeting `Library.jsx`, `BookDetails.jsx`, `Search.jsx`, `Navbar.jsx`)**:
    * **Navbar:** Make it a sleek header with flexbox spacing. Links should have a subtle hover effect (like a soft background pill or gentle underline)
    * **Book Cards:** Apply the background variable, `border-radius: 16px`, and a very soft, diffused `box-shadow` (e.g., `rgba(0,0,0,0.05)` in light mode) that slightly elevates and scales up on hover (`transform: translateY(-4px)`). Ensure the cover image fills the top portion cleanly with `object-fit: cover` and rounded top corners
    * **Inputs & Selects:** Update text inputs, textareas, and dropdown menus to have fully rounded corners, subtle borders, and a clear, cozy focus ring (outline using the accent color) when typing
    * **Buttons:** Style primary buttons with the accent color background, white text, bold font-weight, fully rounded pill shapes, and a slight opacity change or lift on hover

### **Verification (Manual)**
1. Ensure the Vite server compiles without CSS errors.
2. Toggle the computer's system appearance between Light and Dark to verify the CSS responds automatically.
3. Verify that clicking buttons, changing shelves, and saving notes still function perfectly.