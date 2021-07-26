import{Request,Response} from 'express'
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from '../models/User'
dotenv.config();
function giveError(error:any):string{
    let keyWordsForIssuedFields:string[] = Object.keys(error.keyValue)
    return 'this '+keyWordsForIssuedFields[0]+' is already in use please try another one';
}
class AuthenticationController{
    static async register(req:Request,res:Response){
        const {username, email, password} = req.body;
        let newUser = new User({username,email,password});
        try {
            await newUser.save();
            let token:string = jwt.sign({ email },process.env.JWT_SECRET_KEY as string,{expiresIn:'1h'})
            res.send({token,username:newUser.username,uid:newUser._id})
            return;
        } catch (error) {
            res.send({errorMsg:giveError(error)});
        }
    }

    static async login(req:Request,res:Response){
        const {email, password} = req.body;
        console.log(email);

        let result = await User.findOne({email,password});
        if(!result){
            res.send({errorMsg:'your email or password is wrong'});
            return;
        }
        let token:string = jwt.sign({ email },process.env.JWT_SECRET_KEY as string,{expiresIn:'1h'})
        res.send({token,username:result.username,uid:result._id})

    }
    static async logout(req:Request,res:Response){
        res.send('hello from logout')
    }
}

export{ AuthenticationController }