import {Router} from "express"

const router = Router()

router.route("/:controllerName?/:action?/:param1?/:param2?/:param3?/:param4?/:param5?/:param6?")
	.all( async (req, res)=>{

		let controllerName = req.params.controllerName||"home"//"home"
		controllerName = controllerName[0].toUpperCase()+controllerName.slice(1).toLowerCase()+"Controller" //"HomeController"

		try{
			const Controller = (await import(`../controllers/${controllerName}.js`)).default
			
			const {action} = req.params 
			const {param1,param2, param3, param4, param5, param6 } = req.params
			const params = [param1,param2, param3, param4, param5, param6]
			console.log("router")
			const controller = new Controller( req, res, params )

			//controller[action||"index"]( req, res, params )//controller["index"]() -> homeController.index()	
		}
		catch(e){ 
			console.log(e)
			const Controller = (await import(`../controllers/ErrorController.js`)).default
			const controller = new Controller	
			controller.index(req, res, e)
		}
	}
)

export default router