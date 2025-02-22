import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();
export const useAuth = () => React.useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  //   const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [tempUser, setTempUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const login = () => {
  //   setIsAuthenticated(true);
  // };

  const logout = async () => {

    const logoutURL = import.meta.env.VITE_API_URL + '/auth/logout';
    const res = await axios.post(logoutURL, {}, { withCredentials: true });
    loggedInUser.setLoggedInUser(null);
    loggedInUser.setIsAuthenticated(false);
    console.log(res);
    navigate("/");
  };

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const authUrl = import.meta.env.VITE_API_URL + "/auth/is-auth";

      const response = await axios.get(authUrl, { withCredentials: true });

      console.log('auth response', response);
      setLoggedInUser(response.data.data.user);
      setIsAuthenticated(true);
      console.log("loggedInUser: ", response.data.data.user);
    } catch (error) {
      console.log("AuthContext service :: checkAuthStatus :: error : ", error);
      setLoggedInUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        logout,
        loggedInUser,
        setLoggedInUser,
        tempUser,
        setTempUser,
        checkAuthStatus,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
