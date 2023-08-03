import {  createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()
const AuthProvider = ({ children }) => { 
      const [count,setcount]=useState(0)
  return (
    <AuthContext.Provider value={{count,setcount }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider


export const useAuth =() =>{
    return useContext(AuthContext)
}