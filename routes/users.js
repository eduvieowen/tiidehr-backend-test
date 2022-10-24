
var express = require('express');
var router = express.Router();
router.use(express.json());
const {userController} = require('../controllers/users')

/* GET user listing. */
router.get('/', userController.getAll);

/* GET user by ID. */
router.get('/:id', userController.getById);

/* CREATE new user*/
router.post('/', userController.create);

/* UPDATE user by ID*/
router.put('/:id', userController.update);

/* DELETE user by ID*/
router.delete('/:id', userController.delete);


module.exports = router;
