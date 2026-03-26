# Pet Adoption & Shelter Website

A visually rich, functional prototype for a pet adoption platform with Google Authentication.

## Features
- **Modern UI:** Built with React and Vanilla CSS, featuring a warm, pet-friendly aesthetic.
- **Google Authentication:** Secure sign-in via Firebase.
- **Pet Listings:** Browse pets fetched from a Node.js/Express backend.
- **Responsive Design:** Optimized for both desktop and mobile.

## Project Structure
- `/frontend`: React (Vite + TypeScript) application.
- `/backend`: Node.js (Express) API.

## Setup Instructions

### 1. Firebase Configuration
This project uses Firebase for Google Authentication. You need to create a Firebase project and provide the configuration.

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Create a new project.
3.  Add a Web App to your project.
4.  Enable **Authentication** and set up the **Google** sign-in provider.
5.  (Optional) Enable **Firestore Database**.
6.  Create a `.env` file in the `frontend` directory and add your credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 2. Run the Backend
```bash
cd backend
npm install
npm run dev
```
The backend will run on `http://localhost:5000`.

### 3. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`.

## Technologies Used
- **Frontend:** React, Vite, TypeScript, Lucide React, Vanilla CSS.
- **Backend:** Node.js, Express, CORS, Dotenv.
- **Auth/DB:** Firebase Authentication & Firestore.
