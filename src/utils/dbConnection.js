import mongoose from 'mongoose';
mongoose.set('strictQuery', false)
await mongoose.connect('mongodb://127.0.0.1/proyectos', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    //useCreateIndex: true, //make this true
    autoIndex: true, //make this also true
}); 