const express = require('express');
const { verifyTeacher ,isSignedIn ,verifyTeacherOrAdmin} = require('../controllers/auth');
const router = express.Router();
const {getUserById,getUser,updateUser,deleteUser,getAllUsersWithSameStd,getAllStudents} = require('../controllers/user');

router.param('userId',getUserById);

router.get('/:userId',getUser);

router.put('/:userId' ,verifyTeacherOrAdmin, updateUser)
router.delete('/:userId' ,verifyTeacherOrAdmin,deleteUser)

router.get('/students/all-students'  , getAllStudents)
router.get('/users/:userId/:usersStd',verifyTeacherOrAdmin,getAllUsersWithSameStd)



module.exports = router;