const express = require('express');
const { getUserById } = require('../controllers/user');
const { getClassByPublicId,createAndAssignClass,getClass ,isClassAlreadyExists,getClasses} = require('../controllers/class');
const { verifyTeacherOrAdmin } = require('../controllers/auth');
const router = express();

router.param('class' , getClassByPublicId)
router.param('userId' , getUserById)

router.post('/:userId' ,verifyTeacherOrAdmin,isClassAlreadyExists, createAndAssignClass)

router.get('/:class',getClass)
router.get('/classes/all-classes' ,getClasses)



module.exports = router;