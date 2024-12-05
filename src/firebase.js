import { initializeApp } from "firebase/app";
import { getAuth,  } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGSCY-IPRiCTejZV3Qz9Hfua_rhU536lI",
  authDomain: "reactchat-24be3.firebaseapp.com",
  databaseURL:
    "https://reactchat-24be3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "reactchat-24be3",
  storageBucket: "reactchat-24be3.appspot.com",
  messagingSenderId: "998566098209",
  appId: "1:998566098209:web:d234b359210b9613b33a60",
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
export default app;
