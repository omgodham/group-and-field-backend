const Classes = require("../models/class");
const User = require ("../models/user");
const _ = require("lodash")

exports.getUserById = (req, res, next, id) => {


    
    User.findById(id).then(user => {
        req.profile = user;
        next();
    }).catch(error => {
        return res.status(400).json({
            error: 'There is no user of this id'
        })
    })

}

exports.getUser = (req, res) => {
 
    return res.status(200).json(req.profile)
}

exports.updateUser = (req, res) => {
    let id = req.query.student ? req.query.student : req.profile._id;
    User.findByIdAndUpdate(id,
        { $set: req.body },
        { new: true, useFindAndModify: false })
        .then(user => {
            return res.status(200).json(user);
        }).catch(error =>{
            return res.status(400).json({
                error: 'User not found for updation'
            });
        })
    
}

exports.deleteUser = (req, res) => {
    let id = req.query.student ? req.query.student : req.profile._id ;
    User.findByIdAndDelete(id)
        .then(user => {
            return res.status(200).json({
                message: 'User deleted successfully'
            });
        }).catch(error =>{
            return res.status(400).json({
                error: 'User not found for deletion'
            });
        })
    
}

exports.getAllUsersWithSameStd = (req, res,) => {
    User.find({std:req.params.usersStd , _id: { $ne: req.profile._id}}).then(users => {
        return res.status(200).json(users);
    }).catch(error => {
        return res.status(400).json({
            error: 'there are no users for this std'
        })
    })

}

exports.getAllStudents = (req,res) => {
    User.find({role:'ROLE_STUDENT'}).then(users => {
        return res.json(users)
    }).catch(err => res.json(err)) 
}

exports.getAllTeachers = (req,res) => {
    User.find({role:'ROLE_TEACHER'}).then(users => {
        return res.json(users)
    }).catch(err => res.json(err)) 
}


exports.getAvailableChilds = async (req,res) => {
    try {
       let users = await User.find({role:'ROLE_STUDENT'});
       let parents = await User.find({role:'ROLE_PARENT'});
       let availableChilds = [];
       for(const user of users){    
           let flag = false;
           for(const parent of parents){
               if(!flag){
                if(!parent.childs.find(childId => {
                   return _.isEqual(childId, user._id)
                })){
                    flag = false;
                }else{
                    flag = true;
                }
               }
           }
           if(!flag)
           availableChilds.push(user)
       }

       res.status(200).json(availableChilds);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}


exports.updateLectures = (req, res) => {
    // console.log(req.body)

    let newLectures = [];
     req.profile.lectures.forEach(item => {
        if(req.body.lectureIds.some(id => id == item.id))
        newLectures.push({id:item.id,due:false})
        else newLectures.push(item)
    })
    console.log(newLectures , req.profile._id);
    User.findOneAndUpdate({_id:req.profile._id},
        { $set: {lectures:newLectures} },
        { new: true, useFindAndModify: false })
        .then(user => {
            return res.status(200).json(user);
        }).catch(error =>{
            return res.status(400).json({
                error: 'User not found for updation'
            });
        })
    
}
exports.getAllStudentsUnderTeacher = (req,res) => {
    let students = [];
    User.find({_id:req.params.studentId}).then(data => {
        console.log(data)
                data.lectures.forEach(lecture => {
                    Classes.findOne({id:lecture.id,teacher:req.profile._id}).then(thisClass => {
                        if(thisClass) return students.push(data._id)
                    }).catch(error => res.status(400).json({error:error.message}))
                })
                console.log(students)
                return res.status(200).json(students);
    }).catch(error => res.status(400).json({error:error.message}))
}