import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider';


const PrivateRoutes = () => {

	const {authContext, setAuthContext} = useContext(AuthContext)

	let auth = true;

	return (

		(authContext?.isloggedin == true) ? <Outlet /> : <Navigate to={"/"} />

	)
}

export default PrivateRoutes