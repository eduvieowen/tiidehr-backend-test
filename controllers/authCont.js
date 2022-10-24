
const db = require('../models/db');
const { constants } = require('./constants')
const users = db.users;

const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const sendMail = require('../middleware/mailSender');

require('dotenv').config();

exports.authController = {
    signup: (req, res) => {
        const newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password, 15); // converts to password
        users
            .create(newUser)
            .then((user) => {
                sendMail('tiidehr@info.com', req.body.email, 'Welcome to TIIDEHR', "Your TiiderHr Verification Code: 992-965", "Your TiiderHr Verification Code: <h1 style='color:red'>992-965</h1>")
                res.status(200).send({
                    firstName : user.firstName,
                    lastName : user.lastName,
                    username : user.username,
                    email : user.email})
            })
            .catch(err => {
                res.status(400).send({
                    message: err.message || 'could not signup'
                })
            });
    },
    signin: (req, res) => {
        users
            .findOne({
                where :
                {
                    username : req.body.username,
                    email : req.body.email
                }
            })
            .then(user => {
                // if record is not found, return invalid username or password
                if (!user) {
                    return res.status(401).send({message:'invalid username or password'})
                }

                // compare entered password with database password
                let isValidPassword = bcrypt.compareSync(req.body.password, user.password);
                // if not valid, return invalid username or password
                if (!isValidPassword) {
                    return res.status(401).send({message:'invalid username or password'})
                }
                // data in payload is encrypted
                let payload = 
                {
                    id : user.id,
                    username : user.username,
                    email : user.email
                }
                let token = sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn : process.env.ACCESS_TOKEN_LIFE})

                res.status(200).send({accesToken : token});

            })
            .catch(err => {
                res.status(400).send({
                    message: err.message || 'could not signin'
                })
            });
    },
    forgotPassword: (req, res) => {
        const newUser = req.body;
        users
            .create(newUser)
            .then(data => {
                res.status(200).send(data)
            })
            .catch(err => {
                constants.handleError(err, res)
            });
    },
}