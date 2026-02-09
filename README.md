# Naskai

AI-supported task and note management app built as a full-stack take-home style project.

## 1. Project Summary

Naskai is a monorepo with:
- `client/`: Next.js 16 frontend (App Router, TypeScript, TailwindCSS, Zustand)
- `server/`: Express 5 backend (Better Auth, Kysely, libSQL/Turso, Groq SDK)

Core user flow:
1. User signs up or logs in with email/password.
2. Auth session cookie is issued by Better Auth.
3. User manages Notes and Tasks (CRUD).
4. User can run AI helpers on notes (title summary and enhanced text).
5. Dashboard aggregates calendar, latest tasks, latest notes.

## 2. Feature Set

### Public
- Landing page sections: Hero, Features, Pricing, FAQ.
- About page (`/aboutus`).
- Legal page (`/legal`).
- 404 page with a frendly cat.

### Authentication
- Email/password sign-up and sign-in with Better Auth.
- Cookie-based session handling (`credentials: include`).
- Session-aware header state and protected page redirects.

### Tasks
- Create, list, update, delete.
- Mark complete/incomplete.
- Duplicate task.
- Date support and status-focused filtering (all/pending/completed).

### Notes
- Create, list, update, delete.
- Duplicate note.
- Date support.
- AI actions from the note panel:
  - Generate summary title
  - Generate enhanced content

### Dashboard
- Monthly calendar widget with task/note date indicators.
- Compact task list widget.
- Compact note list widget.

### Profile
- Session user info (name, email, created date).
- Activity stats (task counts and completion rate).

### Shared UX
- Dark/light theme toggle.
- Search bar across tasks/notes for authenticated users.
- Responsive header/footer and page layouts.

## 3. Tech Stack

### Frontend (`client/`)
- Next.js `16.1.6`
- React `19.2.3`
- TypeScript
- Tailwind CSS `v4`
- Zustand (client state)
- Better Auth React client
- date-fns

### Backend (`server/`)
- Node.js + Express `5.2.1`
- Better Auth
- Kysely + `@libsql/kysely-libsql`
- libSQL/Turso
- Groq SDK
- dotenv
- CORS

## 4. Monorepo Structure

```text
Naskai/
├─ client/
│  ├─ app/
│  │  ├─ page.tsx              # Landing page
│  │  ├─ login/page.tsx
│  │  ├─ signup/page.tsx
│  │  ├─ dashboard/page.tsx
│  │  ├─ tasks/page.tsx
│  │  ├─ notes/page.tsx
│  │  ├─ profile/page.tsx
│  │  ├─ aboutus/page.tsx
│  │  ├─ legal/page.tsx
│  │  └─ not-found.tsx
│  ├─ components/
│  │  ├─ landing/              # Hero/Features/Pricing/FAQ
│  │  ├─ notes/
│  │  ├─ tasks/
│  │  └─ dashboard/
│  ├─ store/useStore.ts        # Zustand stores
│  ├─ types/index.ts
│  └─ proxy.ts                 # Next middleware-like proxy logic
├─ server/
│  ├─ server.js                # Express app bootstrap
│  ├─ auth.js                  # Better Auth config
│  ├─ db.js                    # Kysely + libSQL/Turso config
│  ├─ routes/
│  │  ├─ UserRoutes.js         # Notes/Tasks routes
│  │  └─ AIRoutes.js           # AI routes
│  └─ controllers/
│     ├─ UserRoutesController.js
│     └─ AIRoutesController.js
└─ README.md
```

## 5. Environment Variables

Create `.env` files in both `server/` and `client/`.

### `server/.env`

```env
PORT=8000
CLIENT_URL=http://localhost:3000
TRUSTED_ORIGINS=http://localhost:3000 ...

# Better Auth
BETTER_AUTH_URL=http://localhost:8000
BETTER_AUTH_SECRET=<your-key>

# Database (libSQL/Turso)
TURSO_DATABASE_URL=libsql://<your-db-url>
TURSO_AUTH_TOKEN=<your-turso-token>

# Groq
Groq_key=<your-groq-api-key>
```

### `client/.env`

```env
BETTER_AUTH_SECRET=<your-key> Same with Server
BETTER_AUTH_URL=http://localhost:3000

NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_SERVER_URL=http://localhost:8000

```

Notes:
- `NEXT_PUBLIC_SERVER_URL` is used for auth client base URL and API calls.
- Backend requires Turso env vars at startup (`server/db.js` exits if missing).
- CORS/auth trusted origin values must match your real frontend/backend origins in deployment.

## 6. Installation & Run

### Prerequisites
- Node.js 22+ (recommended latest LTS)
- npm
- Turso/libSQL database and credentials
- Groq API key

### 1) Install dependencies

```bash
# from repo root
cd server && npm install
cd ../client && npm install
```

### 2) Run backend

```bash
cd server
npm run dev
```

Backend default URL: `http://localhost:8000`

### 3) Run frontend

```bash
cd client
npm run dev
```

Frontend default URL: `http://localhost:3000`

## 7. Build, Lint, Analyze

### Frontend scripts

```bash
cd client
npm run dev
npm run lint
npm run test
npm run test:watch
npm run build
npm run start
npm run analyze
```

### Backend scripts

```bash
cd server
npm run dev
npm run test
npm run test:watch
npm run start
```

## 8. API Reference

Base backend URL: `http://localhost:8000`

### Auth Routes (Better Auth handler)
- `ALL /api/auth/*`

Handled internally by Better Auth (`toNodeHandler(auth)`).

### User Routes (Notes + Tasks)

#### Notes
- `GET /api/user/notes`
- `POST /api/user/notes`
- `GET /api/user/notes/:id`
- `PUT /api/user/notes/:id`
- `DELETE /api/user/notes/:id`

Expected note payload fields (used by backend):
- `title?: string`
- `content?: string`
- `summary?: string | null`
- `imageUrl?: string | null`
- `date?: string`

#### Tasks
- `GET /api/user/tasks`
- `POST /api/user/tasks`
- `GET /api/user/tasks/:id`
- `PUT /api/user/tasks/:id`
- `DELETE /api/user/tasks/:id`

Expected task payload fields (used by backend):
- `title?: string`
- `content?: string`
- `date?: string`
- `imageUrl?: string | null`
- `isCompleted?: boolean`

### AI Routes
- `POST /api/ai/generate-summary-title`
- `POST /api/ai/generate-enhanced-content`

Request body:

```json
{
  "content": "your note content"
}
```

Responses:
- Summary endpoint returns `{ "title": "..." }`
- Enhance endpoint returns `{ "enhancedContent": "..." }`

## 9. Authentication & Session Flow

1. Frontend calls Better Auth client (`client/app/auth_client.ts`).
2. Backend Better Auth endpoint issues cookie-based session.
3. Protected pages check `useSession()` and redirect to `/login` if unauthenticated.
4. API requests include cookies via `credentials: "include"`.
5. Backend controllers verify user with `auth.api.getSession(...)` before CRUD/AI operations.

## 10. State Management (Frontend)

Zustand stores in `client/store/useStore.ts`:
- `useTaskStore`: task list + CRUD + duplicate + loading state
- `useNoteStore`: note list + CRUD + duplicate + loading state
- `useUIStore`: shared search query state

Pattern used:
- Fetch data from backend.
- Apply optimistic update for some update/delete operations.
- Fallback by re-fetching on catch blocks.

## 11. Data Model (Application-Level)

### Task (frontend type)
- `id: number`
- `title: string`
- `content?: string`
- `isCompleted: boolean`
- `date?: string`
- `image?: string`
- `userId: string`
- `createdAt: string`

### Note (frontend type)
- `id: number`
- `title: string | null`
- `content: string`
- `summary: string | null`
- `image?: string`
- `date?: string`
- `userId: string`
- `createdAt: string`
- `updatedAt: string`

Important mapping note:
- Backend persists image as `imageUrl`.
- Frontend models commonly use `image`.
- Keep payload mapping explicit to avoid data mismatch.

## 12. Deployment Notes

- Configure production URLs:
  - `BETTER_AUTH_URL` = backend public URL
  - `CLIENT_URL` = frontend public URL
  - `NEXT_PUBLIC_SERVER_URL` = backend public URL
- Ensure CORS and trusted origins are consistent.
- If frontend/backend are on different origins, cookie behavior depends on browser policy and Better Auth cookie configuration.

## 14. Errors

- Cors errors may occur even with correct env vars because of Better Auth cookie policies and browser security. In that case, check the network request details and console logs for clues on cookie handling issues.

- AI genereted content may not always be perfect. The AI endpoints are designed to return a best effort result, but edge cases or ambiguous input may lead to less relevant summaries or enhancements. And Because of limited free api I used Llama 2 7b chat, which is not the best for content generation. In a production scenario, you would want to use a more robust model and potentially implement retry logic or user feedback mechanisms for AI-generated content.

- 

## 15. License

All Rights Reserved. This code is provided for review purposes only and is not licensed for production use without explicit permission.