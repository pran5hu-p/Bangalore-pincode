# 📍 Bangalore Pincode Explorer

A full-stack web application designed to quickly map Bangalore areas to their respective postal codes, and vice versa. Built under a strict 2-3 hour time constraint, this project demonstrates rapid full-stack development, database seeding, and modern UI implementation.

**Live Demo:** [bangalore-pincode-1akq0k8cw-pranshu-pallavs-projects.vercel.app](https://bangalore-pincode-1akq0k8cw-pranshu-pallavs-projects.vercel.app/)
**Backend API:** [bangalore-pincode.onrender.com](https://bangalore-pincode.onrender.com)/api/search?query=Indiranagar

![App Screenshot](https://github.com/user-attachments/assets/11ef8acf-63b9-41c2-b033-51622e59739b)
![App Screenshot](https://github.com/user-attachments/assets/1247d70c-8231-4530-a6fe-0f574dfca8b8)

---

## 🚀 Features

* **Smart Search:** Automatically detects whether the user is typing a numeric 6-digit pincode or a text-based area name (case-insensitive).
* **Modern UI/UX:** Built with a sleek, responsive dark-mode interface using Tailwind CSS v4.
* **Instant Feedback:** Handles loading states and gracefully displays error messages when no locations are found.
* **Rapid Data Ingestion:** Uses a custom Node.js parser to transform raw text data into structured JSON, which is then natively digested by MongoDB.

---

## 🛠️ Tech Stack

**Frontend:**
* React (via Vite for optimized build times)
* Tailwind CSS v4 (Utility-first styling)
* Axios (Data fetching)
* Lucide React (Iconography)

**Backend:**
* Node.js & Express.js (RESTful API architecture)
* Mongoose (MongoDB object modeling)
* CORS & Dotenv (Security and environment management)

**Database:**
* MongoDB Atlas (Cloud NoSQL Database)

**Deployment:**
* Frontend: Vercel
* Backend: Render

---

## 📐 Architecture & Database Choice

For a rapid 2-3 hour development window, **MongoDB** was explicitly chosen over **PostgreSQL**.

**Why?**

1. **Zero-Schema Setup:** PostgreSQL requires strict SQL schema definitions, data types (VARCHAR, INT), and migration files. MongoDB's document-based nature allowed for direct JSON array ingestion.
2. **Speed of Seeding:** The raw location data was parsed into a JSON array using a custom script (`parser.js`) and imported directly into MongoDB Atlas via Compass in two clicks, saving hours of manual SQL insertion scripting.
3. **Flexible Querying:** MongoDB's `$regex` operator made it incredibly easy to write a single API endpoint that handles both partial numeric string matches and case-insensitive text matches.

---

## 💻 Local Setup Instructions

To run this project on your local machine, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/bangalore-pincode-explorer.git
cd bangalore-pincode-explorer
```

### 2. Backend Setup

Navigate to the backend directory, install dependencies, and set up your environment variables.

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder and add your MongoDB connection string:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string_here/PincodeDB
```

Start the backend server:

```bash
node server.js
```

The server will run on `http://localhost:5000`.

### 3. Frontend Setup

Open a new terminal window, navigate to the frontend directory, and install dependencies.

```bash
cd frontend
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The React app will run on `http://localhost:5173`.

---

## 📂 Project Structure

```
bangalore-pincode-explorer/
├── backend/
│   ├── server.js           # Express API and Mongoose configuration
│   ├── package.json
│   └── .env                # Database secrets (git-ignored)
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Main React component and Tailwind UI
│   │   ├── index.css       # Tailwind v4 import
│   │   └── main.jsx        # React DOM rendering
│   ├── package.json
│   └── vite.config.js
├── bangalore_pincodes.json # Parsed JSON dataset
├── parser.js               # Script used to parse raw text to JSON
└── README.md
```
