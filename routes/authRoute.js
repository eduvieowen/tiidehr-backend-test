
var express = require('express');
var router = express.Router();
router.use(express.json());
const {authController} = require('../controllers/authCont')

/* signup */
router.post('/signup', authController.signup);
/* signin */
router.post('/signin', authController.signin);



module.exports = router;
