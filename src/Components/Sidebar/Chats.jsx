import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  useEffect(() => {
    const getChats = () => {
      const getdata = onSnapshot(
        doc(db, "chatOwners", currentUser.uid),
        (doc) => {
          setChats(doc.data());
        });
      return () => {
        getdata();
      };
    };
    if (currentUser.uid) {
      getChats();
    }
  }, [currentUser.uid]);
  const handleSelect = (user) => {
    dispatch({ text: "", payload: user });
  };
  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((rendezett) => (
          <div
            className="userChat"
            key={rendezett[0]}
            onClick={() => handleSelect(rendezett[1].userInfo)}
          >
            <img src={rendezett[1].userInfo.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{rendezett[1].userInfo.displayName}</span>
              <p>{rendezett[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};
export default Chats;
