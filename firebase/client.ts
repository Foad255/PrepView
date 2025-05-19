// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKUKh3dXCO8EO87Qyw7A_BNf2DZeWMnMI",
  authDomain: "prepview-1639a.firebaseapp.com",
  projectId: "prepview-1639a",
  storageBucket: "prepview-1639a.firebasestorage.app",
  messagingSenderId: "636467037165",
  appId: "1:636467037165:web:2d445978fc4f2d16b21de4",
  measurementId: "G-BLBBHK02GG"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig): getApp()

export const auth = getAuth(app)
export const db = getFirestore(app)

export default app;
