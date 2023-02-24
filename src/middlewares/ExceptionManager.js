export default function ExceptionManager(){
    return (req, res, next)=>{
        next()
        try {
        } 
        catch (e) {
            console.log(e)		
        }
    
    }
}