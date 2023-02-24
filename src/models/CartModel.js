import mongoose, {now, ObjectId} from 'mongoose'

const Schema = mongoose.Schema
  
const CartSchema = new Schema({
  products: [
    {
      "_id": {type: ObjectId, required:true}, 
      quantity: {type: Number, default: 1},
    }
  ],
  creationDate: {type: Date, dafault: now()}
});

const CartModel = mongoose.model('Cart', CartSchema)

export default CartModel