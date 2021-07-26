const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    tweetId:{
        required:true,
        type:String,
    },
	comment:{
        type:String
    },
    username:{type:String,required:true},
    profileImage:{type:String},
	date: {
		type: Date,
		default: Date.now(),
	},
});

export default mongoose.model('comment', Schema);
