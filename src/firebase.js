// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjEjXZHWLydZxJ0RcVbqNDsrfZC2r21_8",
  authDomain: "not-spotify-d9c10.firebaseapp.com",
  projectId: "not-spotify-d9c10",
  storageBucket: "not-spotify-d9c10.firebasestorage.app",
  messagingSenderId: "684911101022",
  appId: "1:684911101022:web:d9746a3ea4bb54e79b20cf",
  measurementId: "G-HR0QX94K1Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
