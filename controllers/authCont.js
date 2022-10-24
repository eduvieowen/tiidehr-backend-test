
const db = require('../models/db');
const { constants } = require('./constants')
const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const users = db.users;
require('dotenv').config();
// const config = require('../config/authConfig')

exports.authController = {
    signup: (req, res) => {
        const newUser = req.body;
        newUser.hashedPassword = bcrypt.hashSync(newUser.hashedPassword, 15); // convert to hashedpassword
        users
            .create(newUser)
            .then(data => {
                res.status(200).send(data)
            })
            .catch(err => {
                constants.handleError(err, res)
            });
    },
    signin: (req, res) => {
        users
            .findOne({
                where:{username:req.body.username}
            })
            .then(user => {
                // if record is not found, return invalid username or password
                if (!user) {
                    return res.status(401).send({message:'invalid username or password'})
                }

                // compare entered password with database password
                let isValidPassword = bcrypt.compareSync(req.body.hashedPassword, user.hashedPassword);
                // if not valid, return invalid username or password
                if (!isValidPassword) {
                    return res.status(401).send({message:'invalid username or password'})
                }
                // data in payload is encrypted
                let payload = {
                    id : user.id,
                    username : user.username
                }
                let token = sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn : process.env.ACCESS_TOKEN_LIFE})

                res.status(200).send({accesToken : token});

            })
            .catch(err => {
                res.status(400).send({
                    message: err.message || 'could not fetch record'
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