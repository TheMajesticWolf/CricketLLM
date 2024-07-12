const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { spawn } = require('child_process')
const dotenv = require('dotenv')
const Users = require('./db_schemas/Users')
const Chats = require('./db_schemas/Chats')
const { v4: uuidv4 } = require('uuid');
const cookieParser = require('cookie-parser')
const http = require('http')
const { Server } = require('socket.io')

const chatRoutes = require("./routes/chatRoutes")
const authRoutes = require("./routes/authRoutes")
const fetchRoutes = require("./routes/fetchRoutes")

dotenv.config()


const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
	cors: {
		origin: "http://localhost:3000",
		credentials: true,
	}
})
const PORT = process.env.PORT || 6969

mongoose.connect(process.env.MONGO_URI)
	.then(() => {

		httpServer.listen(PORT, () => {
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

io.on("connection", (socket) => {
	console.log(`User connected: ${socket.id}`)
	// io.emit("from-server", {message: `${socket.id} joined the chat`, from: "Server"})

	socket.on("user-connected", (username) => {
		io.emit("from-server", {message: `${username} joined the chat`, from: "Server"})
	})
	
	socket.on("from-frontend", (obj) => {
		console.log(obj)
		if(obj["roomId"] == "") {
			socket.broadcast.emit("from-server", obj)

		}
		else {
			socket.to(obj["roomId"]).emit("from-server", obj)
			
		}
	})
	
	socket.on("join-room", (roomId) => {
		if(roomId != "") {
			socket.join(roomId)
			
		}
	})
	
	socket.on("disconnect", () => {
		console.log(`User disconnected: ${socket.id}`)
		io.emit("from-server", {message: `${socket.id} left the chat`, from: "Server"})
	})
})


app.use("/api/db", chatRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/fetch", fetchRoutes)
