import CartModel from '../models/CartModel.js'
import Product from '../models/ProductModel.js'

class ProductController{
	constructor(req, res, params){
		this.req = req
		this.res = res
		this.params = params

	}  

	#matchWithCartProducts(product, req){
		const found = req.cartData.products.find( cartProduct => {
			return cartProduct._id.equals(product._id)
		})
		if(found){
			product.quantity = found.quantity
			product.inCart = true
		}
	}
 
	async #getProductsData(match, req){
		// const cartId = cookies.cartId 
        // const cart = (await CartModel.findOne({ _id: cartId }))._doc.products
        // const productsCart = req.cartData.products

		const products = 
			( await Product.find(match) )
			.map(productComplete => {
				const product = productComplete._doc

				this.#matchWithCartProducts(product, req)

				return product
			})

		return products
	}

	async index(req, res, params){
		//res.render("Product/index")	

		const products = await this.#getProductsData({},req)

		res.render("Product/viewMany", {products, title: "Productos"})
	}

	// async viewAll(req, res, params){
	// 	const products = ( await Product.find({}) )
	// 					.map(productComplete => productComplete._doc)

	// 	res.render("Product/viewMany", {products})
	// }
 

	async search(req, res, params){
		const {q} = req.query
		const regExp = new RegExp(q, "i")

		const searchArray = [{brand: regExp}, {model: regExp}, {category: regExp}]
		const products = await this.#getProductsData({$or: searchArray},req)

		const title = `Busqueda: ${q}`
		//const empty = products.length == 0
		res.render("Product/viewMany", {products, title})
	}

	async seeCategory(req, res, params){
		const categoryName = params[0]
		const category = new RegExp( categoryName , "i" )

		const products = await this.#getProductsData({category},req)

		const title = `Categoria: ${categoryName}`
		const empty = products.length == 0
		res.render("Product/viewMany", {products, title, empty})
	}

	async sale(req, res, params){
		const products = await this.#getProductsData({sale: true},req)

		const title = `¡Ofertas!`
		const empty = products.length == 0
		res.render("Product/viewMany", {products, title, empty})
	}

	async detail(req, res, params){
		const [_id] = params
		const product = ( await Product.findOne({_id}) )?._doc

		this.#matchWithCartProducts(product, req)

		res.render("Product/viewOne", {product})
	}


}

export default ProductController