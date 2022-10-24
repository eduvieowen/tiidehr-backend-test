
var express = require('express');
var router = express.Router();
router.use(express.json());
const {leavesController} = require('../controllers/leaves')

/* GET leaves listing. */
router.get('/', leavesController.getAll);

/* GET leaves by ID. */
router.get('/:id', leavesController.getById);

/* CREATE new leaves*/
router.post('/', leavesController.create);

/* UPDATE leaves by ID*/
router.put('/:id', leavesController.update);

/* DELETE leaves by ID*/
router.delete('/:id', leavesController.delete);


module.exports = router;
