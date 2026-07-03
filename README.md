
# 🚀 EventHive

**EventHive** is a scalable, production-ready event management platform built with a strong focus on performance, security, and modular architecture.

It enables users to create, manage, and explore events while giving organizers powerful tools like a **Microsite Builder**, **RBAC system**, and **data export utilities**.

---

## ✨ Key Features

### 🔹 Event Management

* Create, manage, and browse multiple events
* Real-time updates for availability and RSVPs

### 🔐 Role-Based Access Control (RBAC)

* Super Admin, Organizer, and User roles
* Dynamic route protection via `RoleBasedRoutes.tsx`

### 🌐 Microsite Builder

* Create custom event pages
* Add pricing, videos, and structured content sections

### ⚡ Real-Time System

* Firebase-powered live updates
* Custom hooks for optimized data flow

### 📊 Data Export

* Export attendee data to Excel
* Generate PDF ID cards for participants

### 🧠 State Management

* Redux Toolkit for predictable global state
* Dedicated slices for microsite & auth data

### 🛡️ Type Safety

* Fully typed with strict TypeScript
* Reduces runtime errors and improves scalability

---

## 🛠️ Tech Stack

| Category | Technology                   |
| -------- | ---------------------------- |
| Frontend | React + Vite                 |
| Language | TypeScript                   |
| Backend  | Firebase (Auth + Firestore)  |
| State    | Redux Toolkit                |
| Routing  | React Router v6              |
| Testing  | Jest + React Testing Library |


## 📂 Project Structure

```
📦src
 ┣ 📂AdminCustomHooks
 ┣ 📂assets
 ┣ 📂Auth
 ┣ 📂common
 ┣ 📂components
 ┣ 📂dashboard
 ┣ 📂Layout
 ┣ 📂pages
 ┣ 📂Registration
 ┣ 📂slice
 ┣ 📂store
 ┣ 📂Types
 ┣ 📂utils
 ┣ 📜App.tsx
 ┣ 📜Firebase.ts
 ┣ 📜main.tsx
 ┣ 📜PrivateRoute.tsx
 ┗ 📜RoleBasedRoutes.tsx
```

**EventHive** is a scalable, production-ready event management platform built with a strong focus on performance, security, and modular architecture.

## 👤 Author

**Rohit Pant**
