# StackScribe — Full-Stack Blog Platform

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![Express](https://img.shields.io/badge/Express.js-v5-green?style=for-the-badge&logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue?style=for-the-badge&logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=for-the-badge&logo=tailwind-css)

> A modern, full-stack blog platform where users can write, publish, and explore articles. Built with Next.js App Router, Express.js, PostgreSQL, and Better Auth.

**🌐 Live Demo:** [https://stackscribe-blog-platform.vercel.app](https://stackscribe-blog-platform.vercel.app)

---

## ✨ Features

- 📝 Create, edit, and delete blog posts with cover image uploads
- 🔐 Email & password authentication with email verification
- 🔑 Google OAuth — one-click sign in
- 👤 User dashboard — manage posts, view history
- 🛡️ Admin dashboard — analytics, user management, comment moderation
- 💬 Comment system with moderation support
- 📄 Pagination on blog listing
- 🌙 Dark mode support
- 🖼️ Cloudinary image hosting
- 📧 Transactional email via Brevo API
- 📱 Fully responsive design

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| Next.js 16 (App Router) | React framework with SSR & file-based routing |
| TypeScript | Type safety across the entire codebase |
| Tailwind CSS v4 | Utility-first styling |
| Shadcn UI | Accessible, pre-built UI components |
| TanStack Form + Zod | Form state management with schema validation |
| Better Auth (client) | Auth session management in the browser |
| Sonner | Toast notifications |
| next-themes | Dark mode support |

### Backend
| Technology | Purpose |
|---|---|
| Express.js v5 | REST API server |
| TypeScript + tsx | TypeScript runtime for Node.js |
| Better Auth | Authentication — sessions, OAuth, email verification |
| Prisma v7 | Type-safe ORM for database access |
| PostgreSQL (Neon) | Serverless cloud database |
| Brevo HTTP API | Transactional email delivery |
| Cloudinary | Cloud image storage and delivery |

### Deployment
| Service | Purpose |
|---|---|
| Vercel | Frontend hosting with automatic CI/CD |
| Railway | Backend hosting |
| Neon | Serverless PostgreSQL database |

---

## 🏗️ Project Structure

```
stackscribe-blog-platform/
├── client/                          # Next.js 16 frontend
│   └── src/
│       ├── app/
│       │   ├── (commonLayout)/      # Public pages (home, blogs, about)
│       │   ├── (dashboardLayout)/   # Protected dashboard pages
│       │   ├── (authLayout)/        # Login & register pages
│       │   └── api/auth/[...all]/   # Auth proxy route
│       ├── components/              # Reusable UI components
│       ├── services/                # API call functions
│       ├── lib/                     # Auth client, utilities
│       └── proxy.ts                 # Next.js middleware
│
└── Server/                          # Express.js backend
    └── src/
        ├── modules/
        │   ├── posts/               # Post router, controller, service
        │   └── comment/             # Comment router, controller, service
        ├── middlewares/             # Auth middleware, error handler
        ├── lib/
        │   ├── auth.ts              # Better Auth configuration
        │   └── prisma.ts            # Prisma client instance
        └── app.ts / server.ts       # Express app setup
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+
- PostgreSQL database (or a free [Neon](https://neon.tech) account)

### 1. Clone the repository
```bash
git clone https://github.com/shad-bin-abi-aydid/stackscribe-blog-platform.git
cd stackscribe-blog-platform
```

### 2. Setup the Backend
```bash
cd Server
npm install
```

Create a `.env` file inside the `Server/` folder:
```env
DATABASE_URL=your_postgresql_connection_string
PORT=5000
APP_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_random_secret_key

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

BREVO_KEY=your_brevo_api_key
BREVO_USER=your_brevo_smtp_user
BREVO_FROM_EMAIL=your_verified_sender_email
```

Run migrations and start the server:
```bash
npx prisma generate
npx prisma migrate dev
npm run dev
```

### 3. Setup the Frontend
```bash
cd ../client
npm install
```

Create a `.env.local` file inside the `client/` folder:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000

BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
AUTH_URL=http://localhost:5000/api/auth
API_URL=http://localhost:5000

RESEND_API_KEY=your_resend_api_key
```

Start the frontend:
```bash
npm run dev
```

Frontend runs at **http://localhost:3000** | Backend runs at **http://localhost:5000**

---

## 📡 API Endpoints

[![Postman Docs](https://img.shields.io/badge/Postman-API_Docs-orange?style=for-the-badge&logo=postman)](https://documenter.getpostman.com/view/51503501/2sBXqJL1H9)

> Full interactive API documentation is available on Postman — including request bodies, example responses, and environment setup.

### Posts
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/posts` | Public | Get all posts (paginated) |
| GET | `/posts/:postId` | Public | Get single post |
| GET | `/posts/my-post` | User/Admin | Get logged-in user's posts |
| GET | `/posts/stats` | Admin only | Get analytics & statistics |
| POST | `/posts` | User/Admin | Create new post |
| PATCH | `/posts/:postId` | User/Admin | Update post |
| DELETE | `/posts/:postId` | User/Admin | Delete post |

### Comments
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/comment` | User/Admin | Create comment |
| PATCH | `/comment/:commentId` | User/Admin | Edit comment |
| DELETE | `/comment/:commentId` | User/Admin | Delete comment |
| PATCH | `/comment/:commentId/moderate` | Admin only | Moderate comment |

### Authentication
All auth endpoints are handled by Better Auth at `/api/auth/*`

| Endpoint | Description |
|---|---|
| `POST /api/auth/sign-up/email` | Register with email & password |
| `POST /api/auth/sign-in/email` | Login with email & password |
| `GET /api/auth/sign-in/social` | Google OAuth login |
| `POST /api/auth/sign-out` | Logout |
| `GET /api/auth/get-session` | Get current session |
| `POST /api/auth/verify-email` | Verify email token |

---

## 🔐 Authentication Flow

```
Register → Email Verification → Login → Session Cookie → Protected Routes
```

1. User registers with email & password
2. Verification email sent via Brevo API
3. User clicks link → email verified → can now log in
4. Login sets an HTTP-only session cookie
5. All protected API calls validate the session token from the cookie

---

## 📦 Environment Variables

### Backend (Railway)
| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string from Neon |
| `PORT` | Server port (set to 5000) |
| `APP_URL` | Frontend URL used in email verification links |
| `BETTER_AUTH_SECRET` | Random secret for session signing |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `BREVO_KEY` | Brevo API key (from API Keys tab — not SMTP key) |
| `BREVO_FROM_EMAIL` | Verified sender email address in Brevo |

### Frontend (Vercel)
| Variable | Description |
|---|---|
| `NEXT_PUBLIC_BACKEND_URL` | Railway backend URL |
| `NEXT_PUBLIC_FRONTEND_URL` | Vercel frontend URL |
| `FRONTEND_URL` | Vercel frontend URL (server-side validation) |
| `BACKEND_URL` | Railway backend URL (server-side) |
| `AUTH_URL` | Railway auth endpoint base URL |
| `API_URL` | Railway API base URL |
| `RESEND_API_KEY` | Resend API key for contact form emails |

---

## 🌐 Deployment

### Frontend → Vercel
1. Push code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Set the **root directory** to `client`
4. Add all frontend environment variables
5. Deploy — Vercel auto-deploys on every push to `main`

### Backend → Railway
1. Import the repository in [Railway](https://railway.app)
2. Set the **root directory** to `Server`
3. Add all backend environment variables including `PORT=5000`
4. Railway uses the `Procfile` to start the server: `web: npm start`

---

## 👨‍💻 Author

**Shad Bin Abi Aydid**
- GitHub: [@shad-bin-abi-aydid](https://github.com/shad-bin-abi-aydid)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
