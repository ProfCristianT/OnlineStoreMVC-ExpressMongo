import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ProductSchema = new Schema({
  brand: String,
  model: String,
  price: Number,
  technical: {},
  category: String,
  description: String,
  sale: Boolean,
  imgs: [String]
});

const ProductModel = mongoose.model('Product', ProductSchema)

export default ProductModel