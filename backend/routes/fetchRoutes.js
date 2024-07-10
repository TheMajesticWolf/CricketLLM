const express = require('express')
const { spawn } = require('child_process')
const {createAuthToken, authenticateToken} = require('../authorization/authorizationUtilities')



const router = express.Router()

router.use(authenticateToken)

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


router.post("/conversation-response", async (req, res) => {

	let userObj = {
		question: req.body.question
	}

	let python_response = await executeScript("./predictor.py", userObj)

	res.status(200).json({ success: true, response: python_response })



})


router.post("/fetch-ipl-points-table", async (req, res) => {

	let userObj = {
		question: req.body.question,
	}

	console.log(userObj)

	let python_response = await executeScript("./Python_Web_Scrapingfe/tch_ipl_points_table.py", userObj)

	res.status(200).json({ success: true, response: python_response })



})


router.post("/fetch-t20-points-table", async (req, res) => {

	let userObj = {
		question: req.body.question
	}

	let python_response = await executeScript("./Python_Web_Scrapingfe/tch_t20_points_table.py", userObj)

	res.status(200).json({ success: true, response: python_response })



})


router.post("/get-player-profile", async (req, res) => {

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


router.post("/get-videos-of-player", async (req, res) => {

	let userObj = {
		question: req.body.question
	}
	console.log(userObj)
	let python_response = await executeScript("./Python_Web_Scraping/fetch_player_videos.py", userObj)

	res.status(200).json({ success: true, response: python_response })



})


router.post("/fetch-points-table", async (req, res) => {

	let userObj = {
		question: req.body.question,
		matchType: req.body.matchType
	}

	console.log(userObj)

	let python_response = await executeScript("./Python_Web_Scraping/generic_points_table_fetcher.py", userObj)

	res.status(200).json({ success: true, response: python_response })



})


router.get("/fetch-latest-news", async (req, res) => {

	let python_response = await executeScript("./Python_Web_Scraping/fetch_latest_news.py", { "_": null })
	res.status(200).json({ success: true, response: python_response })

})

module.exports = router