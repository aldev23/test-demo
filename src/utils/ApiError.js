class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went Wrong",
        errors = [],
        stack = ""

    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.succes = false;
        this.errors = errors

        if(stack){
            this.data.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}