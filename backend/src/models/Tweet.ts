const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    text:{
        required:true,
        type:String,
    },
	username: {
		required: true,
		type: String,
	},
    profileImage:{
        type:String
    },
	uid: {
		required: true,
		type: String,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

export default mongoose.model('tweet', UserSchema);
