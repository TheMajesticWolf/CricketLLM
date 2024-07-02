import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'


const SignupPage = () => {
	const navigate = useNavigate()

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const sendDataToServer = async () => {

		let response = await fetch("http://localhost:6969/api/auth/signup", {
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
			localStorage.setItem("username", username)
			localStorage.setItem("user_id", jsonData["user_id"])
			navigate("/chat")
		}
		else {
			alert("An error occured")
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
					<button type="submit">Signup</button>
				</div>

				<div className="link-box auth-box">
					<Link to="/">Aldready registered? Login</Link>
				</div>

			</form>
		</div>

	)
}

export default SignupPage