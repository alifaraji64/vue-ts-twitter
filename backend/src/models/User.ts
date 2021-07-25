const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username:{
        required:true,
        type:String,
        unique:true
    },
	email: {
		required: true,
		type: String,
		unique: true,
	},
	password: {
		required: true,
		type: String,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

export default mongoose.model('user', UserSchema);
