import session from "express-session"
import mongoStore from 'connect-mongo'
import CartModel from "../models/CartModel.js"

//MONGO STORE
const store = mongoStore.create({
    mongoUrl: "mongodb://127.0.0.1:27017/proyectos",
    ttl: 1000*60*60*24* 1,
    autoRemove: "native"
} )


export default function Session(){
    return session({
        //store: new FileStore(options),
        store: store,
        secret: "asdasdasd",
        resave: false,//id, username, theme
        saveUninitialized: true,//
        cookie:{
            maxAge: 1000*60*60*24* 1,
            httpOnly: true,
            secure: false
        }
    
    })
}

export function sessionDefaultValues(){
    return async (req, res, next)=>{
        if(!req.session.cartProductList) req.session.cartProductList = []
        if(!req.session.cartId){
            req.session.cartId = (await CartModel.create({}))._id
        } 
        next()
    }
}