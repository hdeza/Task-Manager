import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  //   Aqui usa tus credenciales de firestore
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
