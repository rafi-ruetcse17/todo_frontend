# 🧩 Next.js Task App – Frontend

A frontend application built with **Next.js App Router** for managing collaborative ToDo applications.

---
## Getting Started

First, clone the repository [https://github.com/rafi-ruetcse17/frontend.git](https://github.com/rafi-ruetcse17/frontend.git)

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## 🔐 1. Authentication

- Users can **Sign Up** using name, email, and password.
- Users can **Log In** using email and password.
- These are **public API routes**.
- Session is managed using **NextAuth (JWT strategy)**.
- **Axios interceptor** is used to attach token automatically to every REST API request.

### Critical Thinking Outcome:
1. **Authorization header** is automatically sent for all protected routes so that auth guard can easily be implemented on server.
---

## 🧭 2. Navigation

- All authenticated pages include a **navbar** from `layout.js` under `/user/*`.
- Navbar provides:
  - A **Logout** button.
  - A button to return to the **App List Page**.

### Critical Thinking Outcome:
1. Button to return **App List Page** is skipped on app list page as it is unnecessary.
---

## 📋 3. ToDo App List Page  
**Route**: `/user`

- Landing page after login.
- Displays **all apps** the user has access to.
- Each app card shows:
  - **Title**
  - **Created time**
  - **User role** (owner/collaborator)
- Clicking on an app redirects to its **task list**.
- Owners can **delete** their own apps.
- A **confirmation modal** is shown before deletion to prevent accidents.

### Critical Thinking Outcome:
1. Apps are **sorted by latest creation time** for quick access to newly created ones to enhance **user experience**.
2. Deletion is protected with a modal to avoid **accidental removal**.

---

