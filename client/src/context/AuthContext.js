import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null )


    const login = async(inputs) => { 

        const res = await axios.post("http://localhost:8800/api/auth/login",inputs, {withCredentials: true, credentials: 'include'}).then(console.log('success'))
        setCurrentUser(res.data)
    }

// session is based on user in local storage so clearing localStorage is the simplest solution. 

    const logout = async(inputs) => { 
        console.log('in logout call')
        setCurrentUser(null)
        localStorage.clear(); 
    }

    
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
      }, [currentUser]);
    
    return (
        <AuthContext.Provider value={{currentUser, login, logout}}>{children}</AuthContext.Provider>
    )
}