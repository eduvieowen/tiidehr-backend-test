
const db = require('../models/db');
const staff = db.staff;
const { constants } = require('./constants')

exports.staffController = {
    create: (req, res) => {
        const newStaff = req.body;
        staff
            .create(newStaff)
            .then(data => {
                res.status(200).send(data)
            })
            .catch(err => {
                constants.handleError(err, res)
            });
    },
    getAll: (req, res) => {
        staff
            .findAll({include: db.users})
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
        staff
            .findOne({
                where: { id: req.params.id },
                include: db.users
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
        const staff = req.body;
        staff
            .update(staff, {
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
        staff
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