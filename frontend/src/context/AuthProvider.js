import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext({})

const AuthProvider = ({ children }) => {

	const [authContext, setAuthContext] = useState({
		isloggedin: JSON.parse(localStorage.getItem("isloggedin")) || false
	})

	useEffect(() => {
        localStorage.setItem('isloggedin', JSON.stringify(authContext.isloggedin));
    }, [authContext]);


	return (
		<AuthContext.Provider value={{authContext, setAuthContext}}> 
			{children}
		</AuthContext.Provider>
	)

}

export default AuthProvider