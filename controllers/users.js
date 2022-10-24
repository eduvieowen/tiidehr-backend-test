
const db = require('../models/db');
const { constants } = require('./constants')
const users = db.users;

exports.userController = {
    create: (req, res) => {
        const newUser = req.body;
        users
            .create(newUser)
            .then(data => {
                res.status(200).send(data)
            })
            .catch(err => {
                res.status(400).send({
                    message: err.message || 'could not create record'
                })
            });
    },
    getAll: (req, res) => {
        users
            .findAll()
            .then(data => {
                res.status(200).send(data)
            })
            .catch(err => {
                res.status(400).send({
                    message: err.message || 'could not fetch record'
                })
            });
    },
    getById: (req, res) => {
        users
            .findOne({
                where: { id: req.params.id }
            })
            .then(data => {
                if (data == undefined) {
                    res.status(404).send({
                        message: 'no existing record'
                    })
                }
                res.status(200).send(data)
            })
            .catch(err => {
                res.status(400).send({
                    message: err.message || 'could not fetch record'
                })
            });
    },
    update: (req, res) => {
        const user = req.body;
        users
            .update(user, {
                where: { id: req.params.id }
            })
            .then(data => {
                if (data[0] !== 1) {
                    res.status(404).send({
                        message: err.message || 'could not find record'
                    })
                }
                res.status(200).send({
                    message: 'record updated'
                })
            })
            .catch(err => {
                res.status(400).send({
                    message: err.message || 'could not update record'
                })
            });
    },
    delete: (req, res) => {
        users
            .destroy({
                where: { id: req.params.id }
            })
            .then(data => {
                if (data !== 1) {
                    res.status(404).send({
                        message: 'record not found'
                    })
                }
                res.status(200).send({
                    message: 'record deleted'
                })
            })
            .catch(err => {
                res.status(400).send({
                    message: err.message || 'could not be delted'
                })
            })
    },

}