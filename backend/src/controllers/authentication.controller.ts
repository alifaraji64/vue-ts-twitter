import{Request,Response} from 'express'

class AuthenticationController{
    static async register(req:Request,res:Response){
        res.send('hello from register')
    }

    static async login(req:Request,res:Response){
        res.send('hello from login')
    }
    static async logout(req:Request,res:Response){
        res.send('hello from logout')
    }
}

export{ AuthenticationController }