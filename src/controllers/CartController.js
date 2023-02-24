import CartModel from "../models/CartModel.js"
import ProductModel from "../models/ProductModel.js"
import UserModel from "../models/UserModel.js"
 
class CartController {

    async index(req, res) {
        // const { cartId } = req.cookies
        // const cart = (await CartModel.findOne({ _id: cartId }))._doc
        const cart = req.cartData

        // const ids = cartProductList.map(cartProductItem=>cartProductItem._id)
        // const products = await ProductModel.find({_id: {$in:ids} })

        const productsPromise = cart.products.map(
            async ({ _id, quantity }) => {
                const product = (await ProductModel.findOne({ _id }))._doc
                product.quantity = quantity
                product.subtotal = product.price * quantity
                return product
            }
        )

        const products = await Promise.all(productsPromise)

        res.render("Cart/index", {
            products, 
            helpers: {
                total: function (array) {
                    return array.reduce((acc, cur) => {
                        return acc + cur.subtotal
                    }, 0)
                }
            }
        })
    }
 

    /* Add Product to Cart --------------------------------------------- */

    async addProduct(req, res, params) {
        const { cartId } = req.cookies

        const productId = params[0]

        const addResult = await CartModel.updateOne(
            { _id: cartId, 'products._id': { '$ne': productId } },
            { $addToSet: { products: { _id: productId } } }
        )

        const incResult = addResult.modifiedCount ||
                            (await CartModel.updateOne(
                                { _id: cartId, "products._id": productId },
                                { $inc: { "products.$.quantity": 1 } })
                            )

        res.redirect( req.header("Referer") )
    }

    // async addProduct0(req, res, params) {
    //     const { cartProductList } = req.session

    //     const _id = params[0]

    //     const findResult = cartProductList.find(cartProductItem => _id === cartProductItem._id)
    //     if (findResult) {
    //         cartProductList.forEach(cartProductItem => {
    //             if (_id === cartProductItem._id) {
    //                 cartProductItem.quantity++
    //             }
    //         })
    //     }
    //     else {
    //         req.session.cartProductList.push({ _id, quantity: 1 })
    //     }

    //     this.updateUserCart(req, cartProductList)
    //     res.redirect(req.header("Referer"))
    // }

    /* Subtract Product from Cart --------------------------------------------- */

    async subtractProduct(req, res, params) {
        const { cartId } = req.cookies
        const productId = params[0]

        

        const subtractResult = await CartModel.updateOne(
            { _id: cartId, "products._id": productId, 'products.quantity': {$gt: 1} },
            { $inc: { "products.$.quantity": -1 } })
        
        if(subtractResult.matchedCount == 0){
            const deleteResult = await CartModel.updateOne(
                { _id: cartId },
                { $pull:{ products: {_id: productId} } }
            )
        }

        //this.updateUserCart(req, cartProductList)
        res.redirect(req.header("Referer"))
    }

    async deleteProduct(req, res, params) {
        const { cartId } = req.cookies
        const productId = params[0]

        const deleteResult = await CartModel.updateOne(
            { _id: cartId },
            { $pull:{ products: {_id: productId} } }
        )

        res.redirect(req.header("Referer"))
    }



    async updateUserCart(req, newCart) {
        if (req.session?.passport?.user?.userId) {
            const _id = req.session.passport.user.userId
            const response = await UserModel.updateOne({ _id }, { cart: newCart })
        }
    }
}

export default CartController 