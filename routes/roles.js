
var express = require('express');
var router = express.Router();
router.use(express.json());
const {rolesController} = require('../controllers/roles')

/* GET roles listing. */
router.get('/', rolesController.getAll);

/* GET roles by ID. */
router.get('/:id', rolesController.getById);

/* CREATE new roles*/
router.post('/', rolesController.create);

/* UPDATE roles by ID*/
router.put('/:id', rolesController.update);

/* DELETE roles by ID*/
router.delete('/:id', rolesController.delete);


module.exports = router;
