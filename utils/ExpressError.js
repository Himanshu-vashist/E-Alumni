class ExpressError extends Error{
    constructor(statusCode,message){
        super();
        this.statusCode=this.statusCode;
        this.message=message;
    }
}
module.exports=ExpressError;