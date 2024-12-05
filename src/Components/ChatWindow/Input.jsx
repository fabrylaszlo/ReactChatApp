import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { KeyContext } from "../../context/KeyContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { v4 as uuid } from "uuid";
import CryptoJS from "crypto-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const encryptData = (data, key) => {
  const ciphertext = CryptoJS.AES.encrypt(data, key).toString();
  return ciphertext;
};
const Input = () => {
  const [text, updateText] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const { currentKey } = useContext(KeyContext);
  const handleKey = (e) => {
    if (e.code === "Enter") {
      handleSend();
    }
  };
  const handleSend = async () => {
    if (text == null || text.length < 1 || data.chatId == "null") {
      toast.error("Üres mező/ nincs kiválasztva beszélgetés");
    } else {
      console.log("simatext" + text);
      console.log("Kulcs" + currentKey);
      var encrypted = encryptData(text, currentKey);
      console.log("titkositott" + encrypted);
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: encrypted,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
      await updateDoc(doc(db, "chatOwners", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "chatOwners", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
      updateText("");
    }
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Aa"
        onChange={(e) => updateText(e.target.value)}
        onKeyDown={handleKey}
        value={text}
      />
      <ToastContainer />
      <div className="send">
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};
export default Input;
