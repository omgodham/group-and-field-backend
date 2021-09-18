const express = require('express');
const router = express();
const {check} = require('express-validator');
const {signUp,signIn,isEmailExists,getLoggedInUser} = require('../controllers/auth');

router.post('/signin',signIn);
router.post('/signup',
check('name').isLength({min:3}).withMessage('Name should at least 3 characters'),
check('email').isEmail().withMessage('Enter valid email'),
check('password').isLength({min:5}).withMessage('Password should at least 5 characters'),
isEmailExists,
signUp);
router.get('/loggedInUser',getLoggedInUser);

module.exports = router;