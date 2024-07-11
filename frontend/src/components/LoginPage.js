import React, { useState,  useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance, {axiosLoginInstance} from '../api/myaxios'
import { AuthContext } from '../context/AuthProvider';



const LoginPage = () => {

	const navigate = useNavigate()

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const {authContext, setAuthContext} = useContext(AuthContext)


	const sendDataToServer = async () => {

		try {

			let response = await axiosLoginInstance.post("/api/auth/login", {
				"username": username,
				"password": password
				
			}, {
				headers: {
					"Content-Type": "application/json"
				}
			})
	
	
			let jsonData = response.data
	
			if (jsonData.success) {
				setAuthContext({
					isloggedin: true,
				})
                localStorage.setItem("isloggedin", JSON.stringify(true));
				localStorage.setItem("username", username)
				navigate("/chat")
			}

			
		} 
		catch (error) {
			alert(error?.response?.data?.message)
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!username || !password) {
			alert("Enter valid data")
			return
		}
		sendDataToServer()
		
		setUsername("")
		setPassword("")

	}

	return (


		<div className="login-container">
			<form className="my-form" onSubmit={handleSubmit}>

				<div className="auth-box">
					<label htmlFor="username">Username</label>
					<input type="text" id="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />

				</div>

				<div className="auth-box">
					<label htmlFor="password">Password</label>
					<input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
				</div>

				<div className="auth-box">
					<button type="submit">Login</button>
				</div>

				<div className="link-box auth-box">
					<Link to="/signup">New user? Signup</Link>
				</div>

			</form>
		</div>

	)
}

export default LoginPage