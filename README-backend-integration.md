# Backend Integration Guide for InstaIQ React Frontend

This guide is for backend developers who want to integrate their backend (Node.js, Django, Flask, etc.) with the InstaIQ React frontend.

## 1. Project Structure Overview

- **Frontend Root:** `instaiq-react/`
- **Main Entry:** `src/main.jsx`
- **Pages:** `src/pages/`
- **API Calls:** Typically in `src/pages/` or a dedicated `src/api/` (create if needed)

## 2. Where to Connect API Endpoints

- All API calls (login, register, contact, events, etc.) should be made from React components using `fetch` or `axios`.
- For best practice, create a file like `src/api/index.js` to centralize all API calls.
- Example usage in a component:
  ```js
  import { loginUser } from '../api';
  // ...
  loginUser({ email, password }).then(...)
  ```

## 3. Setting Up Environment Variables

- Store API base URLs and secrets in a `.env` file at the project root.
- Example:
  ```env
  VITE_API_BASE_URL=https://api.instaiq.in
  ```
- Access in code via `import.meta.env.VITE_API_BASE_URL`

## 4. Example API Call (using axios)

Install axios if not present:
```bash
npm install axios
```

Create `src/api/index.js`:
```js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const loginUser = (data) => API.post('/auth/login', data);
export const registerUser = (data) => API.post('/auth/register', data);
// Add more endpoints as needed
```

## 5. CORS
- Ensure your backend allows CORS requests from the frontend domain (e.g., `http://localhost:5173` during development).

## 6. Authentication
- Store JWT tokens in `localStorage` or `sessionStorage` on the frontend after login.
- Attach tokens to API requests as needed (e.g., in headers).

## 7. Best Practices
- Keep API URLs and secrets out of the codebase; use environment variables.
- Use async/await for API calls.
- Handle errors gracefully and show user-friendly messages.
- Keep API logic out of UI components as much as possible.

## 8. Where to Add Backend Integration
- **Login/Register:** Update forms in `src/pages/Login.jsx` and `src/pages/Register.jsx` to call backend APIs.
- **Contact Form:** Update `src/pages/Contact.jsx` to POST form data to the backend.
- **Events/FAQ:** Fetch event/FAQ data from backend if available, otherwise use static data.

## 9. Running the Frontend
```bash
cd instaiq-react
npm install
npm run dev
```

---

For any questions, contact the frontend team or check the code comments for integration points. 