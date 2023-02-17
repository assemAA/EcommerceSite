const jwt = require("jsonwebtoken");

const { request, response } = require("express");

module.exports=(request,response,next)=> {

    //test the token
    //console.log(request)
    //console.log(request.url)
    //console.log(request.method)

    console.log(request)

    try {
        if (request.method.toLowerCase() == 'post' && request.url.toLowerCase() == '/users') 
            next()
        else if (request.method.toLowerCase() == 'get' && request.url.toLowerCase() == '/products')
            next()
       
        else {
            const token = request.get("authorization").split(" ")[1];
            const decodedToken = jwt.verify(token,process.env.SECRETKEY);
            
            request.role=decodedToken.role;
            request.id=decodedToken.id;
             next();
        }
     
    } catch (error) {
        

        error.message ="Not Authenticated";
        error.status = 401;
        next(error);

    }

}

module.exports.checkAdmin=(request,response,next)=>{
    if (request.role=="admin")
    next();
    else{
        let error = new Error("Not Authorized");
        error.status=403;
        next(error);
    }

}


module.exports.checkUser=(request,response,next)=>{
    console.log("check user autherization ")
    if (request.role =="user")
        next();
    else{
        let error = new Error("Not Authorized");
        error.status=403;
        next(error);
    }

}

