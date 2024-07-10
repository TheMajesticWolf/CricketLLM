const express = require('express')
const Users = require('../db_schemas/Users')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { createAuthToken, createRefreshToken } = require('../authorization/authorizationUtilities')

dotenv.config()

let refreshTokens = []

const router = express.Router()

router.post("/login", async (req, res) => {

	let userData = {
		username: req.body.username,
		password: req.body.password
	}

	try {
		let dataFound = await Users.findOne({ "username": userData.username, "password": userData.password })

		if (dataFound) {

			// let accessToken = jwt.sign({ user_id: dataFound["_id"] }, process.env.ACCESS_TOKEN_SECRET)
			let accessToken = createAuthToken({ username: userData.username, user_id: dataFound["_id"] })
			let refreshToken = createRefreshToken({ username: userData.username, user_id: dataFound["_id"] })
			refreshTokens.push(refreshToken)


			res.cookie("accessToken", accessToken, {
				httpOnly: true,
				sameSite: 'strict'
			})

			res.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				sameSite: 'strict'
			})

			res.status(200).json({ success: true, message: "Login successful" })
		}
		else {
			res.status(401).json({ success: false, message: "Login failed" })
		}


	}
	catch (err) {
		console.log(`Error in /signup: ${err}`)
		res.status(500).json({ success: false })

	}
})


router.post("/signup", async (req, res) => {

	let userData = {
		username: req.body.username,
		password: req.body.password
	}

	try {

		let isPresent = await Users.find({ username: userData["username"] })

		let toBeSaved = new Users(userData)
		let isSaved = await toBeSaved.save()

		if (isSaved) {
			let accessToken = createAuthToken({ username: userData.username, user_id: isSaved["_id"] })
			let refreshToken = createRefreshToken({ username: userData.username, user_id: isSaved["_id"] })
			res.status(200).json({ success: true, message: "Signup successful" })
		}
		else {
			res.status(500).json({ success: false, message: "Signup failed" })
		}


	}
	catch (err) {
		console.log(`Error in /signup: ${err}`)
		res.status(500).json({ success: false })

	}


})

router.post("/logout", async (req, res) => {



	try {


		let refreshToken = req.cookies["refreshToken"]
		
		refreshTokens = refreshTokens.filter((token) => token != refreshToken)
		


		res.clearCookie("accessToken", {
			httpOnly: true,
			sameSite: 'strict'
		})


		res.clearCookie("refreshToken", {
			httpOnly: true,
			sameSite: 'strict'
		})

		res.status(200).json({ success: true, message: "Logout successful" })



	}
	catch (err) {
		console.log(`Error in /logout: ${err}`)
		res.status(500).json({ success: false })

	}
})

router.post("/refresh", async (req, res) => {

	let refreshToken = req.cookies.refreshToken
	
	if(! refreshToken) {
		res.status(401).send({ success: false, response: { authenticationFailed: true, message: "Unauthorised. Refresh token not provided" } })
		return
	}

	if (refreshTokens.includes(refreshToken)) {
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
			if (err) {
				res.status(401).send({ success: false, response: { authenticationFailed: true, message: "Refresh token expired" } })
				return
			}

			if (data) {
				let newAuthToken = createAuthToken({ username: data.username, user_id: data["user_id"] })
				res.cookie("accessToken", newAuthToken, {
					httpOnly: true,
					sameSite: 'strict'
				})
				res.status(200).send({ success: true, message: "New access token generated" })
				return

			}
		})

		return
	}
	res.status(401).send({ success: false, response: { authenticationFailed: true, message: "Unauthorised. Already logged out" } })
})

module.exports = router