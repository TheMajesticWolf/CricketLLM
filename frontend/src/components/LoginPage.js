import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../api/myaxios'

const LoginPage = () => {

	const navigate = useNavigate()

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	localStorage.clear()

	const sendDataToServer = async () => {

		try {

			let response = await axiosInstance.post("/api/auth/login", {
				"username": username,
				"password": password
				
			}, {
				headers: {
					"Content-Type": "application/json"
				}
			})
	
	
			let jsonData = response.data
	
			if (jsonData.success) {
				localStorage.setItem("user_id", jsonData["user_id"])
				localStorage.setItem("username", username)
				localStorage.setItem("accessToken", jsonData["accessToken"])
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