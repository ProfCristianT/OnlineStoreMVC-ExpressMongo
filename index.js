import express from 'express'
import multer from 'multer'
import "./src/utils/dbConnection.js"
import hbs from "./src/utils/hbs.js"
import ExceptionManager from './src/middlewares/ExceptionManager.js'
import Session,{sessionDefaultValues} from './src/middlewares/Session.js'
import { passport } from './src/middlewares/Passport.js'
import { SetResRenderDafaultValues } from './src/middlewares/SetResRenderDefaultValues.js'
import MVCRouter from "./src/routers/MVCRouter.js"
import { Cookie, cookieDefaultValues } from './src/middlewares/Cookies.js'
import CartGlobalData from './src/middlewares/CartGlobalData.js'

 
//SERVER ON --------------------------------------------
const app = express()

//HANDLEBARS -------------------------------------------
app.engine('hbs', hbs.engine )
app.set('view engine', 'hbs')
app.set('views', './src/views')

//MIDLEWARES -------------------------------------------

//Exception Manager
app.use( ExceptionManager() )

//Estaticos
app.use(  express.static("./public")  )

//Session + default values (cart=[])
//app.use( Session(), sessionDefaultValues() )
app.use( Session() )

//Cookies
app.use( Cookie() )
app.use( cookieDefaultValues() )

//Passport
app.use( passport.initialize() )
app.use( passport.session() )

//Rewrite res.render with default values
app.use( SetResRenderDafaultValues() ) 

//Load data of cart in req object
app.use( CartGlobalData() )

//Form URLEncoded
app.use( express.urlencoded( {extended:true} ) )

// test 
app.use( (req, res, next) => {
	///req.session.ejemplo = "asdasd"
	console.log(req.cartData)
	next()
} )

//ROUTER ----------------------------------------------
app.use("/", MVCRouter())

//LISTEN -------------------------------------------------

app.listen(8080, (err)=>{
	if(err) throw err

	console.log('Server OK')
})
