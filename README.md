# 💬 Gigly

**Gigly** is a modern, real-time chat application built with **Next.js**, **TypeScript**, **Node.js**, **Socket.io**, and **Supabase**.

---

## 🚀 Key Features

- **Real-Time Messaging**: Instant message delivery using Socket.io.
- **Tailwind CSS v4**: Cutting-edge, lightning-fast styling with the latest Tailwind CSS.
- **Full TypeScript**: End-to-end type safety across both frontend and backend.
- **Premium UI**: Modern dark-mode aesthetic with glassmorphism and smooth animations.
- **Supabase Integration**: Backend power for authentication and room management.
- **Responsive Design**: Works seamlessly across desktops, tablets, and mobile devices.
- **Environment Security**: Sensitive keys managed through secure `.env` files.

---

## 🛠️ Tech Stack

### **Frontend**
- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Socket.io-client](https://socket.io/docs/v4/client-api/)
- [Supabase JS SDK](https://supabase.com/docs/reference/javascript/introduction)

### **Backend**
- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Socket.io](https://socket.io/)
- [dotenv](https://github.com/motdotla/dotenv)

---

## 📂 Project Structure

```text
CHAT-APP/
├── client/          # Next.js frontend application (TypeScript + Tailwind v4)
│   ├── src/
│   │   ├── app/         # Layouts, pages, and global styles
│   │   ├── components/  # Typed UI components
│   │   ├── contexts/    # Auth context provider
│   │   └── services/    # Supabase service client
├── server/          # Node.js Express server (TypeScript)
│   ├── server.ts    # Main entry point
│   └── dist/        # Compiled JavaScript output
└── .env.example     # Environment variable template
```

---

## ⚙️ Getting Started

### **Prerequisites**
- Node.js (v18+ recommended)
- [pnpm](https://pnpm.io/) (preferred) or npm

### **Installation**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shree-Thecreator/CHAT-APP.git
   cd CHAT-APP
   ```

2. **Setup the Backend:**
   ```bash
   cd server
   pnpm install
   ```

3. **Setup the Frontend:**
   ```bash
   cd ../client
   pnpm install
   ```

### **Running the Application**

1. **Start the Server:**
   ```bash
   cd server
   pnpm dev
   ```
   *The server will run on `http://localhost:4000` (via ts-node-dev)*

2. **Start the Client:**
   ```bash
   cd ../client
   pnpm dev
   ```
   *The app will be available at `http://localhost:3000`*

---

## 🔐 Environment Variables

Refer to `.env.example` in the root directory for the required variables. Create `.env.local` in `client/` and `.env` in `server/`.

---

Developed with ❤️ by [Shree-Thecreator](https://github.com/Shree-Thecreator)
