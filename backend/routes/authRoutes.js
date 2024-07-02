const express = require('express')
const Users = require('../db_schemas/Users')

const router = express.Router()


router.post("/login", async (req, res) => {

	let userData = {
		username: req.body.username,
		password: req.body.password
	}

	try {
		let dataFound = await Users.findOne({ "username": userData.username, "password": userData.password })

		if (dataFound) {

			res.status(200).json({ success: true, message: "Login successfull", user_id: dataFound["_id"] })
		}
		else {
			res.status(500).json({ success: false, message: "Login failed" })
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
			res.status(200).json({ success: true, message: "Signup successfull", user_id: isSaved["_id"] })
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

module.exports = router