const express = require('express');
const { getUserById } = require('../controllers/user');
const { getClassByPublicId,createAndAssignClass,getClass ,isClassAlreadyExists} = require('../controllers/class');
const { verifyTeacherOrAdmin } = require('../controllers/auth');
const router = express();

router.param('class' , getClassByPublicId)
router.param('userId' , getUserById)

router.post('/:userId' ,verifyTeacherOrAdmin,isClassAlreadyExists, createAndAssignClass)

router.get('/:class',getClass)


module.exports = router;