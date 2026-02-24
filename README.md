# 💬 Gigly

**Gigly** is a premium, real-time chat application built for privacy and speed. It features a modern dark-mode aesthetic and uses a **serverless-first** architecture optimized for **Vercel** and **Supabase Realtime**.

---

## 🚀 Key Features

- **Real-Time Messaging**: Instant broadcast delivery using **Supabase Realtime Channels**.
- **Privacy-First Architecture**: Messages are delivered instantly and **never stored** on any database.
- **Secure Access**: Every room is protected by a cryptographically secure **Secret Key (PIN)**.
- **JWT Authentication**: Integrated with Supabase Auth to ensure only verified users can connect.
- **Rate Limiting**: Built-in protection against message spamming and flooding.
- **Tailwind CSS v4**: Lightning-fast, modern styling with a premium glassmorphism UI.
- **Full TypeScript**: End-to-end type safety across the entire monorepo.

---

## 🛠️ Tech Stack

### **Frontend & Realtime**
- [Next.js 15+](https://nextjs.org/) (App Router)
- [Supabase Realtime](https://supabase.com/docs/guides/realtime) (Broadcast Protocol)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Lucide React](https://lucide.dev/) (Icons)

### **Backend & Security**
- [Supabase Auth](https://supabase.com/auth) (JWT Verification)
- [Supabase Database](https://supabase.com/database) (Room configuration & PIN verification)

---

## 📂 Project Structure

This project is organized as a **PNPM Monorepo** for seamless deployment.

```text
CHAT-APP/
├── client/          # Next.js Frontend (The main application)
├── server/          # Node.js Server (Legacy/Local Socket.IO reference)
├── pnpm-workspace.yaml # Monorepo configuration
├── package.json      # Root manager for scripts and dependencies
└── vercel.json       # Production deployment configuration
```

---

## ⚙️ Getting Started

### **Prerequisites**
- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (v10+)

### **Installation**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shree-Thecreator/CHAT-APP.git
   cd CHAT-APP
   ```

2. **Install all dependencies:**
   ```bash
   pnpm install
   ```

### **Running Locally**

1. **Setup Environment Variables:**
   - Create `client/.env.local` and add:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

2. **Start the App:**
   ```bash
   pnpm client-dev
   ```
   *The app will be available at `http://localhost:3000`*

---

## 🚀 Deployment

### **Deploy to Vercel**
1. Push your code to GitHub.
2. Connect your repository to Vercel.
3. Vercel will automatically detect the `vercel.json` configuration and build from the root.
4. Add your Supabase environment variables in the Vercel Dashboard.

**Note:** Ensure **Realtime** is enabled in your Supabase project settings (Replication > Realtime).

---

Developed with ❤️ by [Shree-Thecreator](https://github.com/Shree-Thecreator)
