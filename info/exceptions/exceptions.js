/* https://en.wikipedia.org/wiki/List_of_HTTP_status_codes */

export class Exception extends Error {

    code = 0;
    name = 'Exception';
    message = 'Generic Exception';

    constructor(){
        super();
    }

    static new(code,name,message){
        var ex = new Exception();
        ex.code = code;
        ex.name = name;
        ex.message = message;
        return ex;
    }

}

export class RecordNotFoundException extends Exception {
    
    code = 404;
    name = "RecordNotFoundException";
    message = "The record was not found in the collection.";

    constructor(){
        super();
    }
}

export class InvalidCredentialsException extends Exception{

    code = 401; 
    name = "InvalidCredentialsException"; 
    message = "Either email or password are not correct.";

    constructor(){
        super();
    }
}

export class InvalidArgumentException extends Exception {
    
    code = 400;
    name = "InvalidArgumentException";
    message = "The data sended are not match the required by the method";

    constructor(){
        super();
    }
}

export class InvalidTokenException extends Exception {
    
    code = 401;
    name = "InvalidTokenException";
    message = "Header of http request has not a valid token, or is inexistent";

    constructor(){
        super();
    }
}

export class DatabaseErrorException extends Exception{
    
    code = 500; 
    name = "DatabaseErrorException";
    message = "An error in the database has ocurred";
    
    constructor(){
        super();
    }
}

export class MethodNotImplementedException extends Exception {
    
    code = 501;
    name = "MethodNotImplementedException";
    message = "The method requested has not implemented yet";

    constructor(){
        super();
    }
}

export class APIException extends Exception {
    
    code = 500;
    name = "APIException";
    message = "API internal error, check the log!";

    constructor(){
        super();
    }
}

export class InvalidAccessException extends Exception {
    
    code = 403;
    name = "InvalidAccessException";
    message = "You tried to access without autentication. This is not allowed.";

    constructor(){
        super();
    }
}

export class OperationFailedException extends Exception {
    
    code = 500;
    name = "OperationFailedException";
    message = "The operation has failed due a unknown reason";

    constructor(){
        super();
    }
}

export class MethodGoneException extends Exception{

    code = 410;
    name = "MethodGoneException";
    message = "This method does nothing and it will be removed in future release. Please, update your application";

    constructor(){
        super();
    }
}


export default {
    Exception,
    RecordNotFoundException,
    InvalidCredentialsException,
    InvalidArgumentException,
    DatabaseErrorException,
    InvalidAccessException,
    OperationFailedException,
    InvalidTokenException,
    MethodGoneException,
    MethodNotImplementedException,
    APIException
};