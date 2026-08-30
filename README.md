# 🚀 EventHive

EventHive is a multi-role event management platform built with React and TypeScript. It supports public event discovery, organizer onboarding, protected dashboards, attendee registrations, custom event microsites, exports, and Firebase-backed authentication/data flows.

> Built as a frontend engineering portfolio project with a focus on reusable UI, role-based routing, type safety, validation, data fetching, testing, and performance-conscious React patterns.

## Preview

<img width="1365" height="842" alt="image" src="https://github.com/user-attachments/assets/640f3035-22d6-4612-ae43-b8abb6c741d5" />

## ✨ Key Features

- Multi-role access for **Super Admin**, **Organizer**, and **User** flows
- Protected and role-aware dashboard routes
- Event creation, management, discovery, and registration
- Organizer approval workflow
- Event microsite builder with speakers, pricing, videos, and configurable content
- Firebase Authentication
- Firebase Realtime Database integration
- Firebase Storage integration
- Excel attendee export
- PDF attendee ID-card generation
- QR-code support
- Search, filtering, pagination, loading, error, and empty states
- Responsive UI built with Tailwind CSS

## 🧠 Engineering Highlights

### Route-level code splitting

Major layouts and pages are loaded with `React.lazy` and `Suspense` to reduce the initial JavaScript loaded by the browser.

### Role-based routing

Protected dashboard routes are generated from route configuration and validated by `PrivateRoute`, allowing different screens for Super Admin and Organizer roles.

### Server-state handling

TanStack React Query is used for data fetching and caching. Event queries use a configured stale time to reduce unnecessary requests.

### Forms and validation

Organizer and attendee flows use React Hook Form with Zod schemas for typed validation and predictable form handling.

### Type safety

The project uses TypeScript in strict mode with typed event, registration, organizer, route, and Redux models.

### Testing

Vitest and React Testing Library cover route guards, UI components, data hooks, organizer registration, and validation schemas.

## 🛠 Tech Stack

| Area | Technology |
| --- | --- |
| UI | React 19, Tailwind CSS 4, Framer Motion |
| Language | TypeScript |
| Build Tool | Vite |
| Routing | React Router 7 |
| Global State | Redux Toolkit + React Redux |
| Server State | TanStack React Query |
| Forms | React Hook Form |
| Validation | Zod |
| Backend Services | Firebase Authentication, Realtime Database, Storage |
| HTTP | Axios |
| Charts | Chart.js + react-chartjs-2 |
| Export | jsPDF, xlsx, file-saver |
| Testing | Vitest + React Testing Library |

## 🏗 Architecture

```text
EventHive/
├── public/                     # Static assets
├── src/
│   ├── AdminCustomHooks/       # Event/registration data hooks
│   ├── common/                 # Shared UI and application states
│   ├── components/             # Reusable feature/UI components
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
│   ├── App.tsx                 # Routes and application composition
│   ├── Firebase.ts             # Firebase client initialization
│   └── main.tsx                # Application entry point
├── Utils/                      # Shared route/API helpers (planned cleanup)
├── .env.example
├── package.json
├── tsconfig.app.json
└── vite.config.ts
```

> Folder naming and feature-based organization are planned for a later refactor so the current working application can remain stable during portfolio/interview preparation.

## 🔐 Authentication and Authorization Flow

```text
Firebase Authentication
        ↓
AuthContext resolves current user
        ↓
User role loaded from Firebase data
        ↓
PrivateRoute checks authentication + allowed role
        ↓
Role-specific dashboard route is rendered
```

Frontend route guards improve user experience, while Firebase security rules should remain the source of truth for backend data authorization.

## ⚡ Data Flow Example

```text
React component
      ↓
Custom hook
      ↓
TanStack React Query
      ↓
Axios
      ↓
Firebase Realtime Database REST API
```

## 🧪 Tests

The repository includes tests for areas such as:

- `PrivateRoute`
- `EventCard`
- event-fetching hooks
- organizer registration
- registration validation schemas

Run the complete test suite with:

```bash
npm test
```

Run tests in watch mode with:

```bash
npm run test:watch
```

## 🚀 Local Setup

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

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Fill in your Firebase web-app values:

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

### 4. Start development

```bash
npm run dev
```

## 📦 Available Scripts

```bash
npm run dev        # Start Vite development server
npm run build      # Type-check and create production build
npm run lint       # Run ESLint
npm test           # Run Vitest once
npm run test:watch # Run Vitest in watch mode
npm run preview    # Preview production build locally
```

## 📸 Screenshots

Real UI screenshots should be captured from the current deployed build rather than using outdated mockups. Recommended portfolio captures:

1. Public EventHive home/events experience
2. Super Admin dashboard
3. Organizer dashboard
4. Event registration form
5. Generated event microsite

Once captured, keep them in `docs/screenshots/` and embed them here so recruiters can understand the product without running it locally.

## 🔒 Environment Configuration

Firebase client configuration and the Realtime Database URL are loaded through Vite environment variables. `.env` files are ignored by Git, while `.env.example` documents the variables required to run the application.

Firebase web configuration identifies a Firebase project and should still be paired with correctly configured Authentication, Realtime Database, and Storage security rules.

## 🗺 Roadmap

- Feature-based folder organization
- Firebase Hosting CI/CD with GitHub Actions
- Additional integration/component test coverage
- Current production screenshots
- Repository metadata and live-demo link

## 👤 Author

**Rohit Pant**
