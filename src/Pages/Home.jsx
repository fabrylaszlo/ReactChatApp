import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Chat from "../Components/Sidebar/Chat";

export const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};
export default Home;
