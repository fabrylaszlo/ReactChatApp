import React from "react";
import Search from "./Search";
import Chats from "./Chats";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import logout from "../../img/logout.png";

const Sidebar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="sidebar">
      <div className="navbar">
        <span className="logo">React Chat</span>
        <div className="user">
          <img src={currentUser.photoURL} alt="" />
          <span>{currentUser.displayName}</span>
          <button onClick={() => signOut(auth)}>
            <img src={logout} width="20" height="20" />
          </button>
        </div>
      </div>
      <Search />
      <Chats />
    </div>
  );
};
export default Sidebar;
