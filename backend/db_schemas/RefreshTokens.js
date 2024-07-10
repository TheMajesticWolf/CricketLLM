const mongoose = require('mongoose')

const RefreshTokenSchema = new Schema({
	user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	refreshToken: { type: String, required: true },
	 

}, { timestamps: true });

const Chat = mongoose.model('RefreshToken', RefreshTokenSchema);
module.exports = Chat