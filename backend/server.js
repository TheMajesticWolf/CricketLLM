const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { spawn } = require('child_process')
const dotenv = require('dotenv')
// const UserRegister = require('./models/UserRegister')
const UserChats = require('./db_schemas/UserChats')
const Users = require('./db_schemas/Users')
const Chats = require('./db_schemas/Chats')
const { v4: uuidv4 } = require('uuid');

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


app.post("/signup", async (req, res) => {

	let userData = {
		username: req.body.username,
		password: req.body.password
	}

	try {

		let isPresent = await Users.find({ username: userData["username"] })

		let toBeSaved = new Users(userData)
		let isSaved = await toBeSaved.save()

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



// Creates a new chat in which a user can have multiple conversations where each conversation is a question and its answer (output)
app.get("/api/create-new-chat/:user_id", async (req, res) => {

	let { user_id } = req.params

	console.log(user_id)

	// let newChat = new Users({
	// 	"username": "bbb",
	// 	"password": "bbb",
	// })



	let newChat = new Chats({
		"title": "Default",
		"user_id": user_id,
		"conversations": [

			// 	{ question: "Q1", output: "A1", response_format: "string", "conversation_id": "conv1",},
			// 	{ question: "Q2", output: "A2", response_format: "string", "conversation_id": "conv2",},
			// 	{ question: "Q3", output: "A3", response_format: "string", "conversation_id": "conv3",}
		]
	})

	let out = await newChat.save()

	res.send({success: true, response: out})

})

// Adds a new conversation to a chat with given chat_id
app.post("/api/update-chat/:user_id/:chat_id", async (req, res) => {

	let { user_id, chat_id } = req.params

	let newConversationObj = req.body.newConversationObj

	let userSpecificChats = await Chats.find({ user_id: user_id })
	let chatToUpdate = await Chats.findOne({ user_id: user_id, _id: chat_id })


	chatToUpdate["conversations"].push(newConversationObj);

	let out = await chatToUpdate.save()

	res.send({ success: true, response: out })

})

// Deletes the chat with given chat_id
app.delete("/api/delete-chat/:user_id/:chat_id", async (req, res) => {
	let { user_id, chat_id } = req.params

	let chatObj = req.body.chatObj

	let chatToUpdate = await Chats.deleteOne({ user_id: user_id, _id: chat_id })

	// let out = await chatToUpdate.save()

	if(chatToUpdate["deletedCount"] == 0) {
		res.status(500).send({success: false, message: "Failed to delete chat"})
		return
	}

	res.send({ success: true, response: chatToUpdate })
})

// Fetches all the chat_ids of a given user
app.get("/api/fetch-chat-ids/:user_id", async (req, res) => {
	let { user_id } = req.params



	let out = await Chats.find({user_id: user_id}).select(["_id", "title"])


	res.send({ success: true, response: out })
})

// Fetches all the conversations of a chat given the chat_id
app.get("/api/fetch-chat/:chat_id", async (req, res) => {
	let { chat_id } = req.params


	// let out = await Chats.aggregate([
		// { $match: { _id: new mongoose.Types.ObjectId(chat_id) } },
		// { $unwind: "$conversations" },
		// { $project: { "conversations": 1, _id: 0 } }
	//   ])

	let out = await Chats.findById(chat_id)


	res.send({ success: true, response: out })
})