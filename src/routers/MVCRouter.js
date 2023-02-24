import {Router} from "express"

function transformControllerName(controllerName){
	return controllerName[0].toUpperCase()+controllerName.slice(1).toLowerCase()+"Controller" //"HomeController"
}

export default function MVCRouter({
	defaultControllerName="home",
	defaultActionName="index",
	defaultErrorControllerName = "ErrorController",
	extentionName = ".js",
	controllersPath = "../controllers/"
}={}){

	const router = Router()
	
	router.route("/:controllerName?/:action?/:param1?/:param2?/:param3?/:param4?/:param5?/:param6?")
	.all( async (req, res)=>{
		
		let controllerName = req.params.controllerName||defaultControllerName//"home"
		controllerName = transformControllerName(controllerName)
		
		try{
			const importContent = await import(`${controllersPath+controllerName+extentionName}`)
			const Controller = importContent.default
			
			const controller = new Controller	
			
			const {action} = req.params 
			const {param1,param2, param3, param4, param5, param6 } = req.params
			const params = [param1,param2, param3, param4, param5, param6]
			
			controller[action||defaultActionName]( req, res, params )//controller["index"]() -> homeController.index()	
		}
		catch(e){
			console.log(e)
			const importContent = await import(`${controllersPath+defaultErrorControllerName+extentionName}`)
			const Controller = importContent.default
			const controller = new Controller
			controller.index(req, res, e)
		}
	})
	
	return router
}

