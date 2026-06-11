# ctnet-evaluation

This is a full-stack web application featuring a **React (Vite)** frontend and a **.NET (C#)** backend, utilizing a MySQL database and JWT-based authentication.

## Project Structure

The repository is organized into a monorepo structure:

- `/frontend` - The React Vite application, UI components (Ant Design), and E2E tests (Playwright).
- `/backend` - The .NET Web API, Entity Framework Core models, and authentication logic.

---

## Recommended IDE Setup

- **VS Code** or a **JetBrains IDE**, enhanced with **GitHub Copilot** for faster development.
- **Extensions:**
  - _Frontend:_ ESLint, Prettier
  - _Backend:_ C# Dev Kit (for VS Code)
- **Browser Tools:** [React Developer Tools](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) for component inspection.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/)

---

## 1. Environment Setup

The backend relies on environment variables for database connections and JWT signing.

1. At the **root** of the project (outside the frontend and backend folders), duplicate the `.sample.env` file.
2. Rename the duplicated file to `.env`.
3. Update the credentials inside `.env` to match your local MySQL setup and preferred JWT secrets:
   ```env
   DB_SERVER=localhost
   DB_NAME=database
   DB_UID=root
   DB_PWD=your_database_password
   DB_PORT=3306
   JWT_KEY=your_super_secret_jwt_key_here
   JWT_ISSUER=http://localhost:5079
   JWT_AUDIENCE=http://localhost:5173
   ```

## 2. Backend Setup (.NET)

- Open a terminal and navigate to the backend directory:
  `cd backend`
- Restore dependencies:
  `dotnet restore`
- Apply database migrations:
  `dotnet ef database update`
- Run the API:
  `dotnet run`

The backend API will start, typically accessible at http://localhost:5079. You can view the Swagger documentation at http://localhost:5079/swagger.

## 3. Frontend Setup (React / Vite)

- Open a new terminal window and navigate to the frontend directory:
  `cd frontend`
- Install dependencies:
  `npm install`
- Run the development server:
  `npm run dev`

The React application will be available at http://localhost:5173.

## Testing

The frontend includes setup for both unit and end-to-end testing. Run these from inside the /frontend directory.

- Unit Tests (Vitest)
  `npm run test:unit`

## Project Structure

```
ctnet-evaluation/
├── .vscode/
│   └── extensions.json                 # Recommended VS Code extensions
├── backend/                            # .NET (C#) Web API Backend
│   ├── Controllers/                    # API Endpoints (e.g., AccountController)
│   ├── Data/                           # Entity Framework DB Context
│   ├── Dtos/                           # Data Transfer Objects (Accounts)
│   ├── Helpers/                        # Utility classes (e.g., CaseSensitiveUserManager)
│   ├── Interfaces/                     # Interfaces for Services, Repositories, Managers
│   ├── Managers/                       # Business logic managers
│   ├── Migrations/                     # EF Core Database Migrations
│   ├── Models/                         # Database entities (e.g., AppUser)
│   ├── Properties/                     # Launch settings for the backend
│   ├── Repositories/                   # Data access layer patterns
│   ├── Services/                       # Application services (TokenService, AuthService)
│   ├── appsettings.json                # Application configuration
│   ├── appsettings.Development.json    # Development-specific configuration
│   ├── backend.csproj                  # .NET project file
│   ├── backend.http                    # HTTP request definitions for testing
│   └── Program.cs                      # Application entry point and service registration
├── e2e/                                # End-to-End Tests
│   ├── tsconfig.json
│   └── vue.spec.ts                     # Playwright spec file
├── frontend/                           # React (Vite) Application Frontend
│   ├── public/
│   │   └── favicon.ico                 # Public static assets
│   ├── src/
│   │   ├── api/                        # API configurations (e.g., axios.ts)
│   │   ├── assets/                     # Global CSS and SVG assets
│   │   ├── components/                 # React components (Dashboard, Login, Register)
│   │   │   └── __tests__/              # Component unit tests
│   │   ├── App.tsx                     # Main React component and routing setup
│   │   ├── index.css                   # Global styling
│   │   └── main.tsx                    # React application entry point
│   ├── .prettierrc.json                # Prettier code formatting configuration
│   ├── env.d.ts                        # TypeScript environment declarations
│   ├── index.html                      # Main HTML template
│   ├── package.json                    # NPM dependencies and scripts
│   ├── package-lock.json               # NPM lockfile
│   ├── playwright.config.ts            # Playwright configuration for E2E testing
│   ├── tsconfig.*.json                 # TypeScript configurations for Vite, App, and Node
│   ├── vite.config.ts                  # Vite bundler configuration
│   └── vitest.config.ts                # Vitest unit testing configuration
├── .gitignore                          # Ignored files and directories
├── .sample.env                         # Template for environment variables
└── README.md                           # Project documentation and setup instructions
```
