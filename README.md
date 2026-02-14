# 💬 Real-Time Chat App

A modern, real-time chat application built with **React**, **Node.js**, **Socket.io**, and **Supabase**. This project enables users to communicate instantly through a sleek and responsive interface.

---

## 🚀 Key Features

- **Real-Time Messaging**: Instant message delivery using Socket.io.
- **Modern UI**: Clean and intuitive design built with React.
- **Supabase Integration**: Backend power for authentication and data management.
- **Responsive Design**: Works seamlessly across desktops, tablets, and mobile devices.
- **Scalable Backend**: Robust Node.js & Express server for handling concurrent connections.

---

## 🛠️ Tech Stack

### **Frontend**
- [React](https://reactjs.org/) (Create React App)
- [Socket.io-client](https://socket.io/docs/v4/client-api/)
- [Supabase JS SDK](https://supabase.com/docs/reference/javascript/introduction)
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) (Vanilla CSS)

### **Backend**
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Socket.io](https://socket.io/)

---

## 📂 Project Structure

```text
CHAT-APP/
├── client/          # React frontend application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── contexts/    # React Context providers
│   │   ├── pages/       # Page-level components
│   │   └── services/    # API and Socket services
├── server/          # Node.js Express server
│   └── server.js    # Entry point for backend
└── .gitignore       # Git ignore rules
```

---

## ⚙️ Getting Started

### **Prerequisites**
- Node.js (v16+ recommended)
- npm or pnpm

### **Installation**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shree-Thecreator/CHAT-APP.git
   cd CHAT-APP
   ```

2. **Setup the Backend:**
   ```bash
   cd server
   npm install
   ```

3. **Setup the Frontend:**
   ```bash
   cd ../client
   npm install
   ```

### **Running the Application**

1. **Start the Server:**
   ```bash
   cd server
   npm start
   ```
   *The server will run on `http://localhost:4000`*

2. **Start the Client:**
   ```bash
   cd ../client
   npm start
   ```
   *The app will be available at `http://localhost:3000`*

---

## 🔐 Environment Variables

To run this project, you will need to add the following environment variables to your `.env` files.

### **Frontend (.client/.env)**
```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Developed with ❤️ by [Shree-Thecreator](https://github.com/Shree-Thecreator)
