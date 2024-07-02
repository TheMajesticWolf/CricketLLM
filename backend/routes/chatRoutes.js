const express = require('express')
const Users = require('../db_schemas/Users')
const Chats = require('../db_schemas/Chats')

const router = express.Router()

// Creates a new chat in which a user can have multiple conversations where each conversation is a question and its answer (output)
router.get("/create-new-chat/:user_id", async (req, res) => {

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
router.post("/update-chat/:user_id/:chat_id", async (req, res) => {

	let { user_id, chat_id } = req.params

	let newConversationObj = req.body.newConversationObj

	let userSpecificChats = await Chats.find({ user_id: user_id })
	let chatToUpdate = await Chats.findOne({ user_id: user_id, _id: chat_id })


	chatToUpdate["conversations"].push(newConversationObj);

	let out = await chatToUpdate.save()

	res.send({ success: true, response: out })

})

// Deletes the chat with given chat_id
router.delete("/delete-chat/:user_id/:chat_id", async (req, res) => {
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
router.get("/fetch-chat-ids/:user_id", async (req, res) => {
	let { user_id } = req.params



	let out = await Chats.find({user_id: user_id}).select(["_id", "title"])


	res.send({ success: true, response: out })
})

// Fetches all the conversations of a chat given the chat_id
router.get("/fetch-chat/:chat_id", async (req, res) => {
	let { chat_id } = req.params


	// let out = await Chats.aggregate([
		// { $match: { _id: new mongoose.Types.ObjectId(chat_id) } },
		// { $unwind: "$conversations" },
		// { $project: { "conversations": 1, _id: 0 } }
	//   ])

	let out = await Chats.findById(chat_id)


	res.send({ success: true, response: out })
})

module.exports = router