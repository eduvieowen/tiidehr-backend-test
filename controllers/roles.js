
const db = require('../models/db');
const { constants } = require('./constants')
const roles = db.roles;

exports.rolesController = {
    create: (req, res) => {
        const newRole = req.body;
        roles
            .create(newRole)
            .then(data => {
                res.status(200).send(data)
            })
            .catch(err => {
                constants.handleError(err, res)
            });
    },
    getAll: (req, res) => {
        roles
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
        roles
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
            })
    },
    update: (req, res) => {
        const user = req.body;
        roles
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
                constants.handleError(err, res)
            });
    },
    delete: (req, res) => {
        roles
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
                    message: err.message || 'could not be deleted'
                })
            })
    },

}