# EventHive

A multi-role event management platform built with React and TypeScript for event discovery, organizer onboarding, role-based administration, attendee registration, event microsites, analytics, and export workflows.

EventHive demonstrates practical frontend engineering patterns including protected routing, server-state management, form validation, reusable UI, code splitting, testing, and Firebase-backed application flows.

## Preview

<img width="1365" height="842" alt="EventHive application preview" src="https://github.com/user-attachments/assets/640f3035-22d6-4612-ae43-b8abb6c741d5" />

## Product Overview

EventHive provides dedicated experiences for public users, organizers, and super administrators.

### Super Admin
- Review organizer registration requests
- Approve or revoke organizer access
- View platform-level dashboard metrics
- Manage organizer and event administration workflows

### Organizer
- Create and manage events
- Configure event content and microsites
- Manage attendee registrations
- Export attendee data
- View organizer-specific dashboard insights

### Public User
- Discover available events
- View event details and microsites
- Register for events
- Access event-specific information such as speakers, pricing, and media content

## Visual Overview

> **Screenshot Placeholder — Public Home / Event Discovery**  
> Public-facing homepage or event listing showcasing the discovery experience.

> **Screenshot Placeholder — Super Admin Dashboard**  
> Dashboard view showing platform metrics, organizer requests, or administrative controls.

> **Screenshot Placeholder — Organizer Dashboard**  
> Organizer view showing event statistics, management actions, and registrations.

> **Screenshot Placeholder — Event Registration Flow**  
> Registration form or attendee onboarding experience.

> **Screenshot Placeholder — Event Microsite**  
> Generated event microsite with event branding, speakers, pricing, video, and content sections.

## Key Features

- Multi-role access for **Super Admin**, **Organizer**, and **User** flows
- Firebase Authentication-based user sessions
- Protected and role-aware dashboard routes
- Organizer approval and access-management workflow
- Event creation, editing, discovery, and registration
- Configurable event microsites
- Speaker, pricing, video, and event-content sections
- Search, filtering, pagination, loading, error, and empty states
- Excel attendee export
- PDF attendee ID-card generation
- QR-code support
- Dashboard metrics and charts
- Responsive interface built with Tailwind CSS

## Engineering Highlights

### Route-Level Code Splitting

Major layouts and pages are loaded with `React.lazy` and `Suspense`, reducing the amount of JavaScript required during the initial application load.

### Role-Based Routing

Protected dashboard routes use authentication state and allowed-role checks to control which areas of the frontend are accessible to Super Admin and Organizer users.

### Server-State Management

TanStack React Query is used for remote data fetching and caching. Event queries use configured stale times to reduce unnecessary network requests while keeping server-backed data manageable.

### Client-State Management

Redux Toolkit is used for shared client-side application state where global state is useful across components and routes.

### Form Handling and Validation

React Hook Form and Zod are used for typed form handling and schema-based validation in organizer and attendee registration workflows.

### Type Safety

The application uses TypeScript in strict mode with typed models for events, registrations, organizers, routing, and application state.

### Testing

Vitest and React Testing Library are used for route guards, UI components, data hooks, organizer registration, and validation logic.

## Tech Stack

| Area | Technology |
| --- | --- |
| Frontend | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Build Tool | Vite |
| Routing | React Router 7 |
| Global State | Redux Toolkit, React Redux |
| Server State | TanStack React Query |
| Forms | React Hook Form |
| Validation | Zod |
| Backend Services | Firebase Authentication, Realtime Database, Storage |
| HTTP Client | Axios |
| Charts | Chart.js, react-chartjs-2 |
| Export | jsPDF, xlsx, file-saver |
| Motion | Framer Motion |
| Testing | Vitest, React Testing Library |

## Application Architecture

```text
EventHive/
├── public/
├── src/
│   ├── AdminCustomHooks/       # Event and registration data hooks
│   ├── common/                 # Shared UI and application states
│   ├── components/             # Reusable UI and feature components
│   ├── constants/              # Shared constants
│   ├── dashboard/              # Organizer and Super Admin dashboards
│   ├── Layout/                 # Public, dashboard and microsite layouts
│   ├── pages/                  # Public application pages
│   ├── Registration/           # Organizer registration flow
│   ├── services/               # Service-layer helpers
│   ├── slice/                  # Redux feature slices
│   ├── store/                  # Redux store and typed hooks
│   ├── Types/                  # Shared TypeScript models
│   ├── utils/                  # Export and error utilities
│   ├── App.tsx                 # Routing and application composition
│   ├── Firebase.ts             # Firebase client initialization
│   └── main.tsx                # Application entry point
├── Utils/                      # Shared route and API helpers
├── .env.example
├── .firebaserc
├── firebase.json
├── package.json
├── tsconfig.app.json
└── vite.config.ts
```

## Authentication and Role Flow

```text
Firebase Authentication
        ↓
AuthContext resolves the current user
        ↓
User role is loaded from Firebase data
        ↓
PrivateRoute validates authentication and allowed role
        ↓
Role-specific dashboard route is rendered
```

Frontend route guards control navigation and UI access. Backend authorization should remain enforced through Firebase security rules.

## Data Flow

```text
React Component
      ↓
Custom Hook
      ↓
TanStack React Query
      ↓
Axios
      ↓
Firebase Realtime Database REST API
```

This separation keeps remote data concerns outside presentation components and makes loading, error, caching, and refetch behavior easier to manage.

## Performance Considerations

- Route-level code splitting with `React.lazy` and `Suspense`
- React Query caching with configured stale times
- Memoized filtering and derived data where repeated calculations are unnecessary
- Pagination for large registration datasets
- Reusable loading, error, and empty states
- Vite-based production builds and asset bundling

## Testing

The repository includes tests covering areas such as:

- `PrivateRoute`
- `EventCard`
- event-fetching hooks
- organizer registration
- registration validation schemas

Run the test suite with:

```bash
npm test
```

Run tests in watch mode with:

```bash
npm run test:watch
```

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Rohit30418/EventHive.git
cd EventHive
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env`.

macOS / Linux:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Add your Firebase web-app configuration values:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
```

### 4. Start the development server

```bash
npm run dev
```

## Available Scripts

```bash
npm run dev        # Start the Vite development server
npm run build      # Type-check and create a production build
npm run lint       # Run ESLint
npm test           # Run the Vitest test suite once
npm run test:watch # Run Vitest in watch mode
npm run preview    # Preview the production build locally
```

## Firebase Hosting

The project includes Firebase Hosting configuration for the Vite production output.

```text
npm run build
      ↓
dist/
      ↓
Firebase Hosting
```

`firebase.json` uses `dist` as the hosting directory and includes an SPA rewrite to `index.html` so React Router routes work correctly when opened directly.

## Environment Configuration

Firebase client configuration and the Realtime Database URL are loaded through Vite environment variables using the `VITE_` prefix.

The real `.env` file is excluded from version control, while `.env.example` documents the values required to run the project locally.

Firebase web configuration identifies the Firebase project; application data access should still be protected with appropriate Firebase Authentication and database/storage security rules.

## Author

**Rohit Pant**  
Frontend Developer
