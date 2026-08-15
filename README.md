# Inventory Frontend (StockPilot)

React + Vite frontend for the Inventory Management System, wired up to
the `inventory-backend` API.

## Setup

Make sure the backend is running first (`http://localhost:3000`),
with an admin user already created (`npm run create-admin` in the
backend folder).

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`, and log in with the username/password
you created on the backend.

## How it's wired together

- `src/context/AuthContext.jsx` — holds the JWT token in memory + localStorage,
  exposes `login()`/`logout()`/`isAuthenticated` to the whole app
- `src/components/PrivateRoute/PrivateRoute.jsx` — wraps every page except
  Login; redirects to `/login` if there's no token. This is the
  "route protection" requirement.
- `src/services/api.js` — a shared `fetch` wrapper. Attaches
  `Authorization: Bearer <token>` to every request automatically, and if
  the backend ever responds `401` (expired/invalid token), it clears the
  token and bounces the user to `/login` — so you never end up stuck
  looking at stale protected data.
- `src/services/productService.js` — builds `FormData` for product
  create/update, since image upload requires `multipart/form-data`,
  not JSON. The `image` field only gets attached if the user actually
  picked a new file (so editing a product without touching the image
  keeps the old one, per the backend's logic).

## Pages

| Route | Page | Notes |
|---|---|---|
| `/login` | Login | public |
| `/` | Dashboard | product/low-stock/supplier counts |
| `/products` | Product list | search bar + supplier filter, low-stock rows shown in red |
| `/products/new` | Add product | includes real file image upload |
| `/products/:id` | View product | shows image, full details |
| `/products/:id/edit` | Edit product | same form as Add, pre-filled |
| `/suppliers` | Supplier list | |
| `/suppliers/new` | Add supplier | |
| `/suppliers/:id/edit` | Edit supplier | |

## Styling

`src/style.css` is your original StockPilot mockup CSS, extended with
a few classes for forms (`.form-card`, `.error-text`) and the login
box (`.login-box`) — the dark blue/orange theme and the `.low` red
highlight are unchanged.
