import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const LoginPage = () => {

	const navigate = useNavigate()

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const sendDataToServer = async () => {

		let response = await fetch("http://localhost:6969/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"username": username,
				"password": password,
			})
		})

		let jsonData = await response.json()

		if (jsonData.success) {
			localStorage.setItem("user_id", jsonData["user_id"])
			navigate("/chat")
		}
		else {
			alert("Invalid credentials")
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!username || !password) {
			alert("Enter valid data")
			return
		}
		sendDataToServer()
		localStorage.setItem("username", username)
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