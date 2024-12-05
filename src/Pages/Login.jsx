import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import "../css/form.css";
import userimage from "../img/user.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    try {
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      if (err.message.includes("invalid-credential")) {
        toast.error("Hibás jelszó és/vagy email-cím");
      }
      setErr(true);
    }
  };
  return (
    <div className="center">
      <img src={userimage} alt="" height="30px" width="30px" />
      <span className="title">Bejelentkezés</span>
      <div className="formWrapper">
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email cím" />
          <input type="password" placeholder="Jelszó" />
          <button>Belépés</button>
        </form>
        <button onClick={() => navigate("/register")}>Regisztráció</button>
        <ToastContainer />
      </div>
    </div>
  );
};
export default Login;
