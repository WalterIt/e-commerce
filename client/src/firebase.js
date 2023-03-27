// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  authDomain: "shop-ab44c.firebaseapp.com",
  projectId: "shop-ab44c",
  storageBucket: "shop-ab44c.appspot.com",
  messagingSenderId: "681634539264",
  measurementId: "G-646DTEGD8G",
};

// Initialize Firebase
const app = initializeApp({
  ...firebaseConfig,
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  appId: import.meta.env.VITE_APPID,
});
export default app;
const analytics = getAnalytics(app);
