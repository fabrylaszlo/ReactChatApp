import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import CryptoJS from "crypto-js";
import { KeyContext } from "../../context/KeyContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const { currentKey } = useContext(KeyContext);
  const decryptData = (ciphertext, key) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
  };
  var decryptedData = decryptData(message.text, currentKey);
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  const date = new Date(message.date.seconds * 1000);
  const currentDate = new Date();
  var months = [
    "Jan.",
    "Feb.",
    "Márc.",
    "Ápr.",
    "Máj.",
    "Jún.",
    "Júl.",
    "Aug.",
    "Szept.",
    "Okt.",
    "Nov.",
    "Dec.",
  ];
  if (message.senderId === currentUser.uid) {
    return (
      <div
        ref={ref}
        className={`message${
          message.senderId === currentUser.uid ? "sender" : "receiver"
        }`}
      >
        <div className="messageContent">
          {console.log(typeof decryptedData)}
          <p>{decryptedData}</p>
          {message.img && <img src={message.img} alt="" />}
        </div>
        <div className="messageInfo">
          <img
            src={
              message.senderId === currentUser.uid
                ? currentUser.photoURL
                : data.user.photoURL
            }          />
          <span>{`${
            date.getMonth() + "" + date.getDay() ===
            currentDate.getMonth() + "" + currentDate.getDay()
              ? date.getHours() +
                ":" +
                date.getMinutes() +
                ":" +
                date.getSeconds()
              : months[date.getMonth()] +
                "." +
                date.getDay() +
                ". " +
                date.getHours() +
                ":" +
                date.getMinutes()
          }`}</span>
        </div>
      </div>
    );
  } else {
    return (
      <div
        ref={ref}
        className={`message${
          message.senderId === currentUser.uid ? "sender" : "receiver"
        }`}
      >
        <div className="messageInfo">
          <img
            src={
              message.senderId === currentUser.uid
                ? currentUser.photoURL
                : data.user.photoURL
            }
          />
          <span>{`${
            date.getMonth() + "" + date.getDay() ===
            currentDate.getMonth() + "" + currentDate.getDay()
              ? date.getHours() +
                ":" +
                date.getMinutes() +
                ":" +
                date.getSeconds()
              : months[date.getMonth()] +
                "." +
                date.getDay() +
                ". " +
                date.getHours() +
                ":" +
                date.getMinutes()
          }`}</span>
        </div>
        <div className="messageContent">
          <p>{decryptedData}</p>
          {message.img && <img src={message.img} alt="" />}
        </div>
      </div>
    );  }
};
export default Message;
