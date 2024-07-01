const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
	title: { type: String },
	user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	conversations: [{
		conversation_id: { type: String, required: true },
		question: { type: String, required: true },
		output: { type: String, required: true },
		response_format: { type: String, required: true }
	}]
});

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat