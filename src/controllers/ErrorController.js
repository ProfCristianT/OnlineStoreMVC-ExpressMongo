class ErrorController{
	constructor(){}

	index(req, res, e){
		res.render("error")
	}
}


export default ErrorController