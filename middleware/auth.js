
const {jwt, verify} = require('jsonwebtoken')
const { constants } = require('../controllers/constants')

require('dotenv').config();

verifyToken = (req, res, next) => {
    let token = req.headers['Authorization'];

    // reject request if token does not exist
    if (!token) {
        return res.status(403).send({message : 'Forbidden Access'})
    };
    // validate if token exists
    verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err){
            return res.status(401).send({message: constants.handleError(err, res) || 'Unauthorized access'})
        }
        req.userId = decoded.id
    });
}

const jwtAuth = {verifyToken}

module.exports = jwtAuth