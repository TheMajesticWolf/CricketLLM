const mongoose = require('mongoose')

let schema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},

	password: {
		type: String,
		required: true
	},
})

let userModel = new mongoose.model("UserRegister", schema)

module.exports = userModel