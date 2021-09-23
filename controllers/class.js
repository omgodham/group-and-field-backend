const Classes = require("../models/class");
const User = require("../models/user");


exports.getClassByPublicId = (req, res, next, id) => {
  
    Classes.findOne({id:id}).then(thisClass => {
        req.thisClass = thisClass;
        next();
    }).catch(error => {
        return res.status(400).json({
            error: 'There is no class of this id'
        })
    })

}

exports.getClass = (req, res) => {
    return res.status(200).json(req.thisClass)
}

exports.createAndAssignClass = (req,res) => {
    const thisClass = new Classes(req.body);
   
    thisClass.save().then(currentClass =>{
        let tempClasses = req.profile.lectures;
        if(tempClasses.find(item => item.id === currentClass.id)){
            return res.status(400).json({
                error: 'This class is already assigned to this student'
            });
        }else{
            tempClasses = [...tempClasses ,{id:currentClass.id , due : true}]
        }
      
        User.findByIdAndUpdate(req.profile._id , 
            {$set:{lectures:tempClasses}},
            { new: true, useFindAndModify: false })
        .then(user => {
            return res.status(200).json(user);
        }).catch(error =>{
            return res.status(400).json({
                error: 'User not found for updation'
            });
        })
    })
    .catch(error => {
        return res.status(400).json({
            error: error
        });
    })
}

exports.isClassAlreadyExists = (req,res,next) => {
    Classes.findOne({id:req.body.id}).then(currentClass => {
        if (currentClass) {
          return res.status(400).json({
            error: {message:'This class is already created and assigned to someone else'}
        }); 
        }
        next();
      })
      .catch(error => {
        return res.status(400).json({
            error: error
        });
      });     
     
}
