import { createContext, useState, useContext } from "react";
export const KeyContext = createContext("");
export const KeyContextProvider = ({ children }) => {
  const [currentKey, setCurrentKey] = useState("");
  return (
    <KeyContext.Provider value={{ currentKey, setCurrentKey }}>
      {children}
    </KeyContext.Provider>
  );
};
export const useKey = () => {
  const context = useContext(KeyContext);
  return context;
};