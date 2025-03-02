// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:process.env.NEXT_PUBLIC_FIREBASE_api_Key,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_auth_Domain,
  projectId:process.env.NEXT_PUBLIC_FIREBASE_project_Id,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_storage_Bucket,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_messaging_SenderId,
  appId:process.env.NEXT_PUBLIC_FIREBASE_appId1 ,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_measurement_Id
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)

export default auth;