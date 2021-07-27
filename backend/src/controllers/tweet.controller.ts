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

            let likes_v1  = await Like.findOneAndUpdate({ tweetId }, { $addToSet: { likedUsers: myId } });
            let likes_v2 = await Like.findOne({tweetId});
            //if the likesUsers is the same in both queries this means that the user is already liked the post so we can unlike it
            //nothing in db changed(already liked)
            if(likes_v1.likedUsers.length==likes_v2.likedUsers.length){
                await Like.findOneAndUpdate({ tweetId }, { $pull: { likedUsers:myId } })
                res.json({code:200,msg:'tweet_unliked'});
                return;
            }
            res.json({code:200,msg:'tweet_liked'})
        } catch (error) {
            console.log(error);

        }

    }
}

export{TweetController}