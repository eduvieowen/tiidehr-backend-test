
var express = require('express');
var router = express.Router();
router.use(express.json());
const {staffController} = require('../controllers/staff')

/* GET staff listing. */
router.get('/', staffController.getAll);

/* GET staff by ID. */
router.get('/:id', staffController.getById);

/* CREATE new staff*/
router.post('/', staffController.create);

/* UPDATE staff by ID*/
router.put('/:id', staffController.update);

/* DELETE staff by ID*/
router.delete('/:id', staffController.delete);


module.exports = router;
