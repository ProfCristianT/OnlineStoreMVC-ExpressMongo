import { create } from 'express-handlebars'
const hbs = create({
    extname: ".hbs",
    helpers: {
        ahora: function (){
            return (new Date).toLocaleString()
        },
        isSignin: function (session){
            if(!session?.passport){
                return '<a href="/user/signin">Sign in</a>'
            }
            else{
                return '<a href="/user/myAccount">My Account</a>' 
            }
        }

    }
});

export default hbs