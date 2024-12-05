import React, { useContext } from "react";
import Messages from "../ChatWindow/Messages";
import Input from "../ChatWindow/Input";
import { ChatContext } from "../../context/ChatContext";
import {useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const { data } = useContext(ChatContext);
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user.displayName}</span>
      <button onClick={() => navigate("/delete")}>Belépés</button>
        <div className="chatIcons"></div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};
export default Chat;
