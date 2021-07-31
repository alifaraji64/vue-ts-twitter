const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    uid:{
        required:true,
        type:String,
        unique:true
    },
	savedTweets:[{
        type: String
    }],
});

export default mongoose.model('savedTweet', Schema);
