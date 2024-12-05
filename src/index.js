import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
import { KeyContextProvider } from "./context/KeyContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <KeyContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </KeyContextProvider>
    </ChatContextProvider>
  </AuthContextProvider>
);
