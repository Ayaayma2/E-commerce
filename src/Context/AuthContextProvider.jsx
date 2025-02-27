import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
export let AuthContext = createContext()
export default function AuthContextProvider({ children }) {
    let [token, settoken] = useState(null)
    useEffect(() => {
        let tokenstorage = localStorage.getItem("token")
        if (tokenstorage) {
            settoken(tokenstorage)
        }
    }, []);
    return (
        <AuthContext.Provider value={{ token, settoken }}>{children}</AuthContext.Provider>
    )
}
