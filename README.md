# Naskai - AI Task & Notes Manager

Naskai is a modern productivity application designed to help you organize tasks and manage notes efficiently. It features a robust authentication system, real-time-ready architecture, and a sleek, responsive UI.

---

## Getting Started

To get the application running locally, you need to set up and start both the **Server** (Backend) and the **Client** (Frontend).

### 1. Server Setup (Backend)

The backend is built with Node.js, Express, and Better-SQLite3. It handles authentication (via Better-Auth) and data management for tasks and notes.

**Prerequisites:**
- Node.js installed.

**Installation & Running:**

1.  Navigate to the `server` directory:
    ```bash
    cd server
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```
    *The server will start on `http://localhost:8000`.*
    *Database tables will be automatically initialized.*

**Key Technologies:**
-   **Express.js**: API framework.
-   **Better-Auth**: Secure authentication.
-   **Better-SQLite3**: Fast, serverless SQL database.

---

### 2. Client Setup (Frontend)

The frontend is a Next.js application using Tailwind CSS for styling and Zustand for state management.

**Prerequisites:**
- The Server must be running on port 8000.

**Installation & Running:**

1.  Open a new terminal and navigate to the `client` directory:
    ```bash
    cd client
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```
    *The application will be accessible at `http://localhost:3000`.*

**Features:**
-   **Authentication**: Login, Signup, and Forgot Password flows.
-   **Dashboard**: Overview of recent activity.
-   **Tasks**: Create, update, date-track, and complete interactive tasks.
-   **Notes**: Rich note-taking capabilities with organization features.
-   **Profile**: View user profile details.
-   **Dark Mode**: Fully supports light and dark themes.

---

## 🛠 Project Structure

-   **`/server`**: Contains API logic, database schemas (`db.js`), and authentication configuration (`auth.js`).
-   **`/client`**: Contains the Next.js App Router structure, components (`/components`), and state management (`/store`).

## Notes

-   Ensure both terminals (Server and Client) are running simultaneously.
-   The database is a local SQLite file generated in the `server` folder.
