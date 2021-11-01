const User = require ("../models/user");

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


// exports.Checkout = (req, res) => {
//     // console.log(req.body)
    
// }