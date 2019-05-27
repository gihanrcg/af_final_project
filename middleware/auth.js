const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req,res,next){

    const token = req.header('af_auth_token');

    if(!token){
        res.status(401).json({
            message : 'No token found auth denided'
        });
    }

    try {
        const decoded = jwt.verify(token,config.get('jwt_secret_key'));
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({
            message : 'Token is not valid'
        })
    }
}

module.exports = auth;