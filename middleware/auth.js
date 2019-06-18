const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req,res,next){


    const token = req.headers.jwt_token;

    if(!token){
        res.status(401).json({
            message : 'No token found auth denided'
        });
    }

    try {


        res.user = jwt.verify(token, config.get('jwt_secret_key'));
        next();
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message : 'Token is not valid'
        })
    }
}

module.exports = auth;
