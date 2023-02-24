import {localAuthenticate, passport} from "../middlewares/Passport.js"
import UserModel from "../models/UserModel.js"
 
class UserController{
	signinWithForm = localAuthenticate
	constructor(){}

	signin(req, res, params){
		const {errMsg, successMsg} = req.query
		res.render("User/signin", {errMsg, successMsg})
	}
	
	signout(req, res, params){
		req.session.destroy()
		res.redirect("/user/signin?successMsg=Sign out successful!")

	} 


	async createAccount(req, res, params){
		if(req.method === "GET"){
			res.render("User/createAccount")
		}
		else{
			//res.json(req.body)	
			const usernameExist = await UserModel.findOne({username: req.body.username}).count()
			const usernameErrMsg = usernameExist && "This username already exists"

			const emailExist = await UserModel.findOne({email: req.body.email}).count()
			const emailErrMsg = emailExist && "This email already exists"

			const {password, confirmpassword} = req.body
			const confirmpasswordErrMsg = (password !== confirmpassword) && "The passwords are not the same"

			if(usernameErrMsg||emailErrMsg||confirmpasswordErrMsg){
				res.render("User/createAccount", {data: req.body, emailErrMsg, usernameErrMsg, confirmpasswordErrMsg})

			}
			else{
				const user = await UserModel.create(req.body)
				res.redirect("/user/signin?successMsg=Account created! Please, check your email for validate account")
			}
		}
	}
}

export default UserController