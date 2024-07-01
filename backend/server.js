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

app.post("/test-db", async (req, res) => {
	let data = await UserChats.find({})
	res.send({ response: data })
})


app.get("/api/fetch-chats", async (req, res) => {

	let db_response = [
		{
			"_id": "667d30f92992e2c0c450cc11",
			"chats": [
				{
					"output": "Virat Kohli (; born 5 November 1988) is an Indian international cricketer and the former captain of the Indian national cricket team. He is a right-handed batsman and an occasional medium-fast bowler\n\nVirat Kohli and K. L\n\nKohli has been deemed one of the most commercially viable athletes, with often ranked among the highest-paid globally.\nEarly life.\nVirat Kohli was born on 5 November 1988 in Delhi into a Punjabi Hindu family. His father, Prem Nath Kohli, worked as a criminal lawyer, and his mother, Saroj Kohli, served as a housewife\n\nVirat Kohli's senior career began when he made his debut in List A cricket, playing against Services in the Ranji One-Day Trophy, but he did not have the opportunity to bat during the match. On the international stage, he has been representing India since he was included in the ODl squad for the tour of Sri Lanka\n\nIn 2016, a sport biopic \"\" based on his life was released.\nThe third recipient, is Virat Kohli. He is considered the best batsman of the current generation\n\n",
					"question": "Who is virat kohli",
					"return_format": "string"
				},
				{
					"output": "Cummins is widely regarded as an all-time great fast bowler in Test cricket and one of the finest fast bowlers of his generation. He is also known for being a handy lower-order batsman\n\nPatrick James Cummins (born 8 May 1993) is an Australian international cricketer who captains the Australia men's national cricket team in Test and One Day International cricket. He is also the current captain of Sunrisers Hyderabad in the 2024 Indian Premier League\n\nIn 2023, he was awarded the Sir Garfield Sobers Trophy by the ICC.\nEarly life.\nCummins grew up in Mount Riverview in the Blue Mountains west of Sydney with his two brothers and two sisters. He attended St Paul's Grammar School\n\nSunrisers finished the league stage at 2nd position on points table with 8 wins in 14 matches played. The team ultimately finished the tournament as runners-up after losing in final against Kolkata Knight Riders.\nPersonal life.\nCummins attended the University of Technology, Sydney under its Elite Athlete Program, graduating in 2017 with a Bachelor of Business.\nIn February 2020 Cummins got engaged to his longtime girlfriend Becky Boston; the couple have a son\n\nHe stayed with Knight Riders for IPL 2021 and played for them again in IPL 2022 after taking a huge pay cut by selling for. In an interview, Cummins said he is 'absolutely pumped' to return to Knight Riders.\nCummins played in 37 IPL matches from 2014 to 2021, taking 38 wickets\n\n",
					"question": "Who is pat cummins",
					"return_format": "string"
				},
				{
					"output": "Sakshi Dhoni, the wife of M.S Dhoni, was her classmate in that school. She completed her schooling at Army School, Bangalore\n\nM.S. Dhoni was portrayed by Sushant Singh Rajput.\nIn Sachin Tendulkar's biopic documentary \" the match is also a significant part of the story plot.\n\nMS Dhoni scored 183 * in 2005 against the Sri Lankans. India won the 7 match series 6-1 .\n\nFollowing the retirement of test skipper Anil Kumble, MS Dhoni had been elevated to the post of the captain and Sehwag to that of the vice-captain. By doing so, they have allowed and relieved the out of form Yuvraj to regain his lost form.\n\nHe then went on to score a further 45 against the Mumbai Indians, before being ruled out of the remainder of the tournament with a wrist injury.\nThe Supergiant management axed MS Dhoni as captain and named Smith as captain for the 2017 season. In RPS's first game against Mumbai Indians, Smith led his team to victory in style, scoring 84* and was rewarded with the Man of The Match award\n\n",
					"question": "Who is ms dhoni?",
					"return_format": "string"
				}
			]
		},
		{
			"_id": "667d31492992e2c0c450cc12",
			"chats": [
				{
					"output": "Lionel Messi is an Argentine professional footballer who plays as a forward for Inter Miami and the Argentina national team.\n\nMessi is widely considered one of the greatest players of all time. He has won six Ballon d'Or awards, the most by any player.\n\nMessi started his career at Barcelona and spent 17 years there before moving to Paris Saint-Germain in 2021. He joined Inter Miami in 2023.\n\n",
					"question": "Who is Lionel Messi?",
					"return_format": "string"
				},
				{
					"output": "Elon Musk is a business magnate and investor. He is the founder of SpaceX, Tesla Inc., and several other companies.\n\nMusk is known for his ambitious goals, including colonizing Mars and advancing sustainable energy solutions.\n\nIn 2021, Musk became the world's richest person, surpassing Jeff Bezos.\n\n",
					"question": "Who is Elon Musk?",
					"return_format": "string"
				},
				{
					"output": "Albert Einstein was a theoretical physicist who developed the theory of relativity, one of the two pillars of modern physics.\n\nEinstein was awarded the Nobel Prize in Physics in 1921 for his discovery of the photoelectric effect.\n\nHis famous equation, E=mc², describes the relationship between energy and mass.\n\n",
					"question": "Who is Albert Einstein?",
					"return_format": "string"
				}
			]
		},
		{
			"_id": "667d317f2992e2c0c450cc13",
			"chats": [
				{
					"output": "Serena Williams is an American professional tennis player and former world No. 1 in women's single tennis.\n\nWilliams has won 23 Grand Slam singles titles, the most by any player in the Open Era.\n\nShe is known for her powerful serve and aggressive playing style.\n\n",
					"question": "Who is Serena Williams?",
					"return_format": "string"
				},
				{
					"output": "Bill Gates is an American business magnate, software developer, and philanthropist. He is the co-founder of Microsoft Corporation.\n\nGates has been one of the world's wealthiest people for several decades. He is also known for his philanthropic work through the Bill & Melinda Gates Foundation.\n\n",
					"question": "Who is Bill Gates?",
					"return_format": "string"
				},
				{
					"output": "J.K. Rowling is a British author, best known for writing the Harry Potter fantasy series.\n\nThe Harry Potter books have sold more than 500 million copies worldwide, making them the best-selling book series in history.\n\nRowling has also written under the pseudonym Robert Galbraith.\n\n",
					"question": "Who is J.K. Rowling?",
					"return_format": "string"
				}
			]
		},
		{
			"_id": "667d31a62992e2c0c450cc14",
			"chats": [
				{
					"output": "Redditor123: I can’t believe how good the new Spider-Man game is! Anyone else loving it?",
					"question": "What do you think about the new Spider-Man game?",
					"return_format": "string"
				},
				{
					"output": "4chanAnon: lol, who cares about Spider-Man when you can play Cyberpunk? It’s got bugs, but it’s still epic.",
					"question": "Which game do you prefer, Spider-Man or Cyberpunk?",
					"return_format": "string"
				},
				{
					"output": "Redditor456: Just finished reading 'Dune' and it’s a masterpiece. Highly recommend it to all sci-fi fans.",
					"question": "What’s your opinion on the book 'Dune'?",
					"return_format": "string"
				}
			]
		},
		{
			"_id": "667d31c02992e2c0c450cc15",
			"chats": [
				{
					"output": "4chanUser: LMAO, did you see that meme about the dog and the cat? Funniest thing ever!",
					"question": "Have you seen the latest meme about the dog and the cat?",
					"return_format": "string"
				},
				{
					"output": "Redditor789: I’m thinking of building my own PC. Any tips for a first-timer?",
					"question": "What are some tips for building a PC?",
					"return_format": "string"
				},
				{
					"output": "4chanGuru: Forget building, just buy a pre-built. Saves time and hassle.",
					"question": "Is it better to build a PC or buy a pre-built one?",
					"return_format": "string"
				}
			]
		},
		{
			"_id": "667d31d92992e2c0c450cc16",
			"chats": [
				{
					"output": "Redditor001: The latest season of 'The Witcher' is out! Henry Cavill is awesome as Geralt.",
					"question": "What do you think of the latest season of 'The Witcher'?",
					"return_format": "string"
				},
				{
					"output": "4chanCritic: Bruh, Netflix ruined 'The Witcher'. The books are way better.",
					"question": "Is the Netflix adaptation of 'The Witcher' any good?",
					"return_format": "string"
				},
				{
					"output": "Redditor002: Tried the new vegan burger at Burger King. Surprisingly good!",
					"question": "Have you tried the new vegan burger at Burger King?",
					"return_format": "string"
				}
			]
		}
	]

	try {
		db_response = await userChats.find({})
		res.send({ response: db_response })

	}

	catch (err) {
		console.log(err)
		res.status(500).send({ message: "Error in fetching chats" })
	}



})

app.post("/api/save-chat/:chatId", async (req, res) => {
	let { chatId } = req.params
	let newChatObj = req.body.newChatObj
	try {

		console.log(`Rcvd chatid: ${chatId}`)
		console.log(newChatObj)

		let out = await UserChats.findByIdAndUpdate(
			chatId,
			{ $push: { chats: newChatObj } },
			{ new: true, useFindAndModify: false }
		)
		res.send({ response: out })
	}
	catch (err) {
		res.status(500).send({ messege: "An error occured" })
	}

})

app.post("/api/create-new-chat", async (req, res) => {

	let prev_data = await UserChats.find({})
	console.log(prev_data)
	prev_data[req.body.currentChatId]["chats"].push([])
	await UserChats.findByIdAndDelete()
	let to_save = await UserChats(prev_data).save()
	console.log(to_save[-1])

	res.send({ response: { "_id": chatId, to_save: to_save } })
})


app.get("/api/create-new-chat/:user_id", async (req, res) => {

	let { user_id } = req.params

	console.log(user_id)

	// let newChat = new Users({
	// 	"username": "bbb",
	// 	"password": "bbb",
	// })



	let newChat = new Chats({
		"title": "Title 1",
		"user_id": user_id,
		"conversations": [
			
		// 	{ question: "Q1", output: "A1", response_format: "string", "conversation_id": "conv1",},
		// 	{ question: "Q2", output: "A2", response_format: "string", "conversation_id": "conv2",},
		// 	{ question: "Q3", output: "A3", response_format: "string", "conversation_id": "conv3",}
		]
	})

	let out = await newChat.save()

	res.send(out)

})


app.post("/api/update-chat/:user_id/:chat_id", async (req, res) => {

	let { user_id, chat_id } = req.params

	let chatObj = req.body.chatObj

	let userSpecificChats = await Chats.find({user_id: user_id})
	let chatToUpdate = await Chats.find({user_id: user_id, _id: chat_id})

	chatToUpdate["conversations"].push(chatObj);

	// let out = await chatToUpdate.save()


	// console.log({...req.params, ...req.body})

	res.send({success: true, response: chatToUpdate})

})