import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../css/form.css";
import userimage from "../img/user.png";
import uploadimage from "../img/upload.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}
const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const displayName = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const file = event.target[3].files[0];
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setPersistence(auth, browserSessionPersistence);
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL,
          });
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });
          setLoading(true);
          await timeout(2000);
          await setDoc(doc(db, "chatOwners", res.user.uid), {});
          navigate("/");
        });
      });
    } catch (err) {
      if (err.message.includes("email-already-in-use")) {
        toast.error("Az email cím már használatban van");
      }
      if (err.message.includes("WEAK_PASSWORD")) {
        toast.error("A jelszó nem elég hosszú! (6 karakter)");
      }
    }
  };
  return (
    <div className="center">
      <img src={userimage} height="30px" alt="" width="30px" />
      <span className="title">Regisztráció</span>
      <div className="formWrapper">
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Felhasználónév" />
          <input required type="email" placeholder="Email cím" />
          <input required type="password" placeholder="Jelszó" />
          <input required type="file" id="file" hidden />
          <label htmlFor="file">
            <p>Profilkép feltöltése</p>
            <img src={uploadimage} height="30px" alt="" width="30px" />
          </label>
          <button disabled={loading}>Regisztráció</button>
          {loading && toast.success("Sikeres regisztráció!")}
          <ToastContainer />
        </form>
        <button onClick={() => navigate("/login")}>Belépés</button>
      </div>
    </div>
  );
};
export default Register;
