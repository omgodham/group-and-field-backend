const express = require('express');
const { verifyTeacher ,isSignedIn ,verifyTeacherOrAdmin} = require('../controllers/auth');
const router = express.Router();
const {getUserById,getUser,updateUser,deleteUser,getAvailableChilds,getAllUsersWithSameStd,getAllStudentsUnderTeacher,updateLectures,getAllStudents,getAllTeachers} = require('../controllers/user');

router.param('userId',getUserById);

router.get('/:userId',getUser);

router.put('/:userId' ,verifyTeacherOrAdmin, updateUser)
router.delete('/:userId' ,verifyTeacherOrAdmin,deleteUser)

router.get('/students/all-students'  , getAllStudents)
router.get('/users/:userId/:usersStd',verifyTeacherOrAdmin,getAllUsersWithSameStd)
router.get('/teachers/all-teachers' ,getAllTeachers)
router.put('/lectures/update-lectures/:userId',updateLectures)
router.get('/students/teacher/:userId/:studentId',verifyTeacherOrAdmin,getAllStudentsUnderTeacher)
router.get('/childs/available-childs',verifyTeacherOrAdmin,getAvailableChilds)

module.exports = router;