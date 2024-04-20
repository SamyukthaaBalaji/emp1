import React, { createContext, useContext, useState } from "react";
// import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [signedin, setsignedin] = useState(false);
  const login = async (token) => {
    try {
      console.log("hello");
      const response = await fetch("http://localhost:9000/auth/profile", {
        headers: { token: token },
      });
      const data = await response.json();
      console.log(data); 

      setUser(data);

      setsignedin(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    // toast("Logged Out Successfully");
    setsignedin(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signedin,
        setUser,
        setsignedin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
