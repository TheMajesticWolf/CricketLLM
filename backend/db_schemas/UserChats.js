const mongoose = require('mongoose')

let schema = new mongoose.Schema({
	// username: {
	// 	type: String,
	// 	required: true
	// },

	chats: {
		type: Array,
		required: true
	},
})

let userChats = new mongoose.model("UserChat", schema)

module.exports = userChats