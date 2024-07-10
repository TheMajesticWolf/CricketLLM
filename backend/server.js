const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { spawn } = require('child_process')
const dotenv = require('dotenv')
const Users = require('./db_schemas/Users')
const Chats = require('./db_schemas/Chats')
const { v4: uuidv4 } = require('uuid');
const cookieParser = require('cookie-parser')

const chatRoutes = require("./routes/chatRoutes")
const authRoutes = require("./routes/authRoutes")
const fetchRoutes = require("./routes/fetchRoutes")

dotenv.config()


const app = express()
const PORT = process.env.PORT || 6969

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
app.use(cors({
	origin: ["http://localhost:3000"],
	credentials: true
}))
app.use(cookieParser())

app.use("/api/db", chatRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/fetch", fetchRoutes)
