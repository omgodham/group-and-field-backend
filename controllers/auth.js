const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {body,validationResult} = require('express-validator');

const verifyToken = (req, res) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({
      error: "Authorization token not found",
    });
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
  if (!decodedToken) {
    return res.status(401).json({
      error: "Not authenticated",
    });
  }
  return decodedToken.userId;
};

exports.isSignedIn = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({
      error: "Authorization token not found",
    });
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
    next();
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
  if (!decodedToken) {
    return res.status(401).json({
      error: "Not authenticated",
    });
  }
};

exports.getLoggedInUser = (req,res) => {
  const userId = verifyToken(req, res);
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          error: "User not found",
        });
      }
      return res.status(200).json(user);
    })
      .catch(error =>{ 
        return res.status(400).json({
        error: error.message,
      });
    })
}

exports.verifyAdmin = (req, res, next) => {
  const userId = verifyToken(req, res);
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          error: "User not found",
        });
      }
      if (user.role !== 'ROLE_ADMIN') {
        return res.status(400).json({
          error: "Not have access",
        });
      }
      req.loggedInUserId = userId;
      req.loggedInUserEmail = user.email;
      next();
    })
    .catch((error) => {
      return res.status(400).json({
        error: error.message,
      });
    });
};

exports.verifyParent = (req, res, next) => {
  const userId = verifyToken(req, res);
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          error: "User not found",
        });
      }
      if (user.role !== 'ROLE_PARENT') {
        return res.status(400).json({
          error: "Not have access",
        });
      }
      req.loggedInUserId = userId;
      req.loggedInUserEmail = user.email;
      next();
    })
    .catch((error) => {
      return res.status(400).json({
        error: error.message,
      });
    });
};

exports.verifyTeacher = (req, res, next) => {
  const userId = verifyToken(req, res);
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          error: "User not found",
        });
      }
      if (user.role !== 'ROLE_TEACHER') {
        return res.status(400).json({
          error: "Not have access",
        });
      }
      req.loggedInUserId = userId;
      req.loggedInUserEmail = user.email;
      next();
    })
    .catch((error) => {
      return res.status(400).json({
        error: error.message,
      });
    });
};

exports.verifyTeacherOrAdmin = (req, res, next) => {
  const userId = verifyToken(req, res);
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          error: "User not found",
        });
      }
      if (user.role !== 'ROLE_TEACHER' && user.role !== 'ROLE_ADMIN' ) {
        return res.status(400).json({
          error: "Not have access",
        });
      }
      req.loggedInUserId = userId;
      req.loggedInUserEmail = user.email;
      next();
    })
    .catch((error) => {
      return res.status(400).json({
        error: error.message,
      });
    });
};


exports.signUp = (req, res) => {
  const user = new User(req.body);
  const { errors } = validationResult(req);

  if (!errors.length == 0) {
    return res.status(400).json({
      error: errors[0].msg,
    });
  }
  user.save((error, user) => {
    if (error) {
      if (error.keyValue.email) {
        return res.status(400).json({
          error: "Email already exists",
        });
      }
      return res.status(400).json({
        error: "cannot save user in db",
      });
    }
    res.status(200).json(user);
  });
};


exports.signIn = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "Email does not found",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Please enter the correct password",
      });
    }
    var token = jwt.sign({ userId: user._id.toString() }, process.env.SECRET, {
      expiresIn: "10h",
    });
    res.status(200).json({
      token,
      user,
    });
  });
};

exports.isEmailExists = (req,res,next) => {
    body('email').custom(email => { //express custom validator
        return User.findUserByEmail(email).then(user => {
            if (user) {
              return Promise.reject(); //this will give error while saving data to db if email matches
            }
          });     
    });
   next();
}

