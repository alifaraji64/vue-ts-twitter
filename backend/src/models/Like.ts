const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    tweetId:{
        required:true,
        type:String,
        unique:true
    },
	likedUsers:[{
        type: String
    }],
	date: {
		type: Date,
		default: Date.now(),
	},
});

export default mongoose.model('like', UserSchema);
