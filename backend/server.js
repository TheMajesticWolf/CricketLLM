const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { spawn } = require('child_process')
const dotenv = require('dotenv')
// const UserRegister = require('./models/UserRegister')
const UserChats = require('./db_schemas/UserChats')
const Users = require('./db_schemas/Users')
const Chats = require('./db_schemas/Chats')

dotenv.config()

const executeScript = (script, userObj) => {
	return new Promise((resolve, reject) => {

		// let pythonExecutable = "C:\\Users\\sram\\AppData\\Local\\Microsoft\\WindowsApps\\python3.8.exe"
		let pythonExecutable = "/home/aditya/Desktop/Aditya/cricket-llm/venv/bin/python"
		let pythonFile = script
		let pythonOutput = ""

		const pythonProcess = spawn(pythonExecutable, [pythonFile], {
			stdio: ["pipe", "pipe", "inherit"]
		})

		pythonProcess.stdin.write(JSON.stringify(userObj))
		pythonProcess.stdin.end()

		pythonProcess.stdout.on("data", (data) => {
			pythonOutput += data
		})

		pythonProcess.on("close", async (code) => {


			pythonOutput = JSON.parse(pythonOutput)
			resolve(pythonOutput)
		})

		pythonProcess.on("close", (code) => {
			if (code != 0) {
				reject(`Execution failed with code: ${code}`)
			}
		})
	})
}

const app = express()
const PORT = 6969

mongoose.connect(process.env.MONGO_URI)
	.then(() => {

		app.listen(PORT, () => {
			console.log(`Server listening on port: ${PORT}`)
			console.log(`Mongo connection established`)
		})
	})
	.catch((err) => {
		console.log(`Error connecting to mongo: ${err}`)
	})

// app.listen(PORT, () => {
// 	console.log(`Server listening on port: ${PORT}`)
// 	// console.log(`Mongo connection established`)
// })

app.use(express.json())
app.use(cors())


app.post("/login", async (req, res) => {

	let userData = {
		username: req.body.username,
		password: req.body.password
	}

	try {
		let dataFound = await UserRegister.findOne({ "username": userData.username, "password": userData.password })

		if (dataFound) {

			res.status(200).json({ success: true, message: "Login successfull" })
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


app.post("/signup", (req, res) => {

	let userData = {
		username: req.body.username,
		password: req.body.password
	}

	try {
		let toBeSaved = new UserRegister(userData)
		let isSaved = toBeSaved.save()

		if (isSaved) {
			res.status(200).json({ success: true, message: "Signup successfull" })
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


app.post("/conversation-response", async (req, res) => {

	let userObj = {
		question: req.body.question
	}

	let python_response = await executeScript("./predictor.py", userObj)

	res.status(200).json({ success: true, response: python_response })



})


app.post("/api/fetch-ipl-points-table", async (req, res) => {

	let userObj = {
		question: req.body.question,
	}

	console.log(userObj)

	let python_response = await executeScript("./Python_Web_Scrapingfe/tch_ipl_points_table.py", userObj)

	res.status(200).json({ success: true, response: python_response })



})


app.post("/api/fetch-t20-points-table", async (req, res) => {

	let userObj = {
		question: req.body.question
	}

	let python_response = await executeScript("./Python_Web_Scrapingfe/tch_t20_points_table.py", userObj)

	res.status(200).json({ success: true, response: python_response })



})


app.post("/api/get-player-profile", async (req, res) => {

	// let userObj = {
	// 	question: req.body.question
	// }

	// let python_response = await executeScript("./Python_Web_Scraping/fetch_player_profile.py", userObj)

	// res.status(200).json({ success: true, response: python_response })

	let userObj = {
		question: req.body.question,
		playerName: req.body.playerName
	}

	let python_response = await executeScript("./Python_Web_Scraping/fetch_player_profile.py", userObj)

	res.status(200).json({ success: true, response: python_response })



})


app.post("/api/get-videos-of-player", async (req, res) => {

	let userObj = {
		question: req.body.question
	}
	console.log(userObj)
	let python_response = await executeScript("./Python_Web_Scraping/fetch_player_videos.py", userObj)

	res.status(200).json({ success: true, response: python_response })



})


app.post("/api/fetch-points-table", async (req, res) => {

	let userObj = {
		question: req.body.question,
		matchType: req.body.matchType
	}

	console.log(userObj)

	let python_response = await executeScript("./Python_Web_Scraping/generic_points_table_fetcher.py", userObj)

	res.status(200).json({ success: true, response: python_response })



})


app.get("/api/fetch-latest-news", async (req, res) => {

	let python_response = await executeScript("./Python_Web_Scraping/fetch_latest_news.py", { "_": null })
	res.status(200).json({ success: true, response: python_response })

})
