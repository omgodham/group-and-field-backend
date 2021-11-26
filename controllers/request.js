const Request = require("../models/request")


exports.getRequestById = (req,res,next,id) => {
    Request.findById(id).then(data => {
        req.request = data;
        next();
     }).catch(error => res.status(400).json({error:error.message}))
}
exports.makeRequest = (req,res) => {
    const request = new Request(req.body);
    request.save().then(data => {
        res.status(200).json(data)
    }).catch(error => res.status(400).json({error:error.message}))
}

exports.deleteRequest = (req,res) => {
    Request.findByIdAndDelete(req.request._id).then(data => {
        res.status(200).json({message:'Removed Successfully'});
     }).catch(error => res.status(400).json({error:error.message}))
}

exports.getAllRequests = (req,res) => {
    Request.find().then(data => {
        res.status(200).json(data)
     }).catch(error => res.status(400).json({error:error.message}))
}