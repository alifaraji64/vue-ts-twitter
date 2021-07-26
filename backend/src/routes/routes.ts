import Router from 'express';
import { AuthenticationController } from '../controllers/authentication.controller';
import { TweetController } from '../controllers/tweet.controller';

const router = Router();
router.post('/register',AuthenticationController.register);
router.post('/login',AuthenticationController.login);
router.post('/create-tweet',TweetController.createTweet);
router.get('/get-tweets',TweetController.getTweets);
router.get('/get-likes',TweetController.getLikes);
router.post('/add-like',TweetController.addLike);

export{router}