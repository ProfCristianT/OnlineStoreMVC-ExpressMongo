import cookie from "cookie"
import CartModel from "../models/CartModel.js"

export function Cookie(){
    return function(req, res, next){
        const cookies = cookie.parse( req.headers.cookie || "")
        req.cookies = cookies
        next()
    }
}

export function cookieDefaultValues(){
    return async function(req, res, next){
        if(!req.cookies.cartId){
            const cartId = (await CartModel.create({}))._id

            res.setHeader("Set-Cookie", cookie.serialize(
                "cartId", 
                cartId, 
                {httpOnly:false, maxAge: 60*60*24*30}
            ))

        }


        next()
    }
}