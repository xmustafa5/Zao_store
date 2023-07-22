import {  useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthContextAdmin = ({ children }) => {
 
  const navigate = useNavigate();
 useEffect(() => {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn) {
      // Redirect to the login page if not logged in
      navigate('/logadmin', { replace: true });
    }
  }, []);

 


  return children;
};

export default AuthContextAdmin;


