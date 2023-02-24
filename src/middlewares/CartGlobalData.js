import CartModel from "../models/CartModel.js"

export default function CartGlobalData(){
    return async (req, res, next)=>{
        const { cartId } = req.cookies
        req.cartData = (await CartModel.findOne({ _id: cartId }))._doc
        next()
    }
} 
