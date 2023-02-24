import mongoose, {now, ObjectId} from 'mongoose'


const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: 	{type:String, required:true, match: /^[\w\s]{2,60}$/ },
  email: 	{
    type: String, 
    required:true, 
    unique: true,
    dropDups: true,
    match: /^[\w\-\_\.]{2,60}@[\w\-\_]{2,60}(\.[\w\-\_]{2,60}){1,3}$/,
  },
  birth: 	Date,
  fechaCreacion : {type: Date, dafault: now()},
  ultimaModificacion: {type: Date, dafault: now ()},
  password: {
    type:String, 
    required:true, 
    match: /^[\w\-\_\.]{6,20}$/ 
  },
  username: {
    type:String, 
    required:true, 
    unique: true,
    dropDups: true,

  },
  active: {type: Boolean, default: false},
  cart: [
    {"_id": ObjectId, quantity: Number }
  ]
}); 

const UserModel = mongoose.model('User', UserSchema)

export default UserModel