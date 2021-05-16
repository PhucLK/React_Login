import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContexProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("isLogin");
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    localStorage.setItem("isLogin", "true");
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const storeUserLoggeedInformation = localStorage.getItem("isLogin");
    if (storeUserLoggeedInformation === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
