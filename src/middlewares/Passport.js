import passport from "passport"
import {Strategy as PassportLocal} from "passport-local"
import UserModel from "../models/UserModel.js"



passport.use( new PassportLocal(async (username, password, done)=>{
    const user = await UserModel.findOne({username, password}, {"_id":1})
    
    if(user && user._id){
        done(null, user._id)
    }
	else{
        done(null, false)
    }
} ) )

passport.serializeUser( async (userId, done)=>{
    done(null, {userId})
} )

passport.deserializeUser( async ({userId}, done) => {
    const user = await UserModel.findOne({_id:userId}, {_id:0, password:0})
    done(null, user)
})


export {passport} 


export const localAuthenticate = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/user/signin?errMsg=Wrong username or password"
} )