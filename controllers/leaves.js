
const db = require('../models/db');
const leaves = db.leaves;
const { constants } = require('./constants')

exports.leavesController = {
    create: (req, res) => {
        const newLeave = req.body;
        leaves
            .create(newLeave)
            .then(data => {
                res.status(200).send(data)
            })
            .catch(err => {
                constants.handleError(err, res)
            });
    },
    getAll: (req, res) => {
        leaves
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
        leaves
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
        const leave = req.body;
        leaves
            .update(leave, {
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
        leaves
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