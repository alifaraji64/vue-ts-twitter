import{Request,Response} from 'express'
import Like from '../models/Like';
import Tweet from '../models/Tweet';
import Comment from '../models/Comment';

class TweetController{
    static async createTweet(req:Request, res:Response){
        const {username,uid,text} = req.body;
        let newTweet = new Tweet({username,uid,text});
        let newLike = new Like({tweetId:newTweet._id,likedUsers:[]})
        try {
            //saving to 'tweets' collection
            await newTweet.save();
            res.send({code:200});
            //saving to 'likes' collection
            await newLike.save();
            //saving to 'comments' collection
            //await

        } catch (error) {
            res.send({code:400})
        }


    }

    static async getTweets(req:Request, res:Response){
        let tweets = await Tweet.find({});
        res.send(tweets);
    }

    static async getLikes(req:Request, res:Response){
        let likes = await Like.find({});
        res.send(likes);
    }

    static async addLike(req:Request, res:Response){
        const {tweetId,myId} = req.body;
        try {
            await Like.findOneAndUpdate({ tweetId }, { $addToSet: { likedUsers: myId } });
            res.send({code:200})
        } catch (error) {
            console.log(error);

        }

    }
}

export{TweetController}