import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdpGr74vC8Ip1WTjKYAwlpIXr6pU9wMw8",
  authDomain: "gestion-tareas-bd4a1.firebaseapp.com",
  projectId: "gestion-tareas-bd4a1",
  storageBucket: "gestion-tareas-bd4a1.appspot.com",
  messagingSenderId: "212979809481",
  appId: "1:212979809481:web:0b4db7a20365cbb4182118",
  measurementId: "G-MJCDHN4HT7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
