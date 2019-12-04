const bcrypt = require('bcryptjs');
const db = require('../models');

//Register- Create New User
const register = (req, res) => {
    if(!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({
            status: 400, 
            message: 'Please enter your name, email, and password'
        });
    }
    //Checking the account if it exists
    db.User.findOne({ email: req.body.email }, (err, foundUser) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Woops! Please Try Again!'
        });
        if (foundUser) return res.status(400).json({
            status: 400,
            message: 'Woops! Please Try Again!'
        });

        bcrypt.genSalt(10, (err, salt) => {
            if(err) return res.status(500).json({
                status: 500,
                message: 'Whoops! Please Try Again!'
            })
        })
        //Hasing the User Password
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) return res.status(500).json({
                status: 500, 
                message: 'Woops! Please Try Again!'
            });
            const newUser = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash,
            }

            db.User.create(newUser, (err, savedUser) => {
                if (err) return res.status(500).json({
                    status: 500, 
                    message: err
                });
                res.sendStatus(201);
            });
        });
    });
};

// Login - Auth User, create session
const login = (req, res) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            status: 400,
            message: 'Please have your email and password entered in!'
        });
    }
    db.User.findOne({email: req.body.email}, (err, foundUser) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Woops! Please Try Again!'
        });
        if (!foundUser) {
            return res.status(400).json({
                status: 400,
                message: 'Email or Password is incorrect! Please Try Again!'
            });
        }
        bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
            if (err) return res.status(500).json({
                status:500, 
                message: 'Please Try Again!'
            });
            if (isMatch) {
                req.session.currentUser = { id: foundUser_.id };
                return res.status(200).json({
                    status: 200,
                    message: 'Success',
                    data: foundUser._id
                });
            } else {
                return res.status(400).json({
                    status: 400,
                    message: 'Email or Password is incorrect! Please Try Again!'
                });
            };
        });
    });
};

//Logout Session
const logout = (req, res) => {
    if(!req.session.currentUser) return res.status(401).json({
        status: 401,
        message: 'Unauthorized'
    });
    req.session.destroy(err => {
        if (err)
            return res.status(500).json({
                status: 500,
                message: 'Woops! Please Try Again!'
            });
        res.sendStatus(200);
    });
};

// Get Verified
const verify = (req, res) => {
    if(!req.session.currentUser) return res.status(401).json({
        status: 401,
        message: 'Unauthorized'
    });
    res.status(200).json({
        status: 200,
        message: `Current User Verified. User ID: ${req.session.currentUser.id}`
    });
};

//Update
const updateProfile = (req, res) => {
    db.User.findByIdAndUpdate(req.params.uid, req.body, {new: true}, (error, updatedProfile) => {
        if(error) return res.status(401).json({
            status: 401,
            message: 'Could not update, Please Try Again!'
        });
        res.status(200).json({
            status: 200,
            message: 'Show Profile',
            requestedAt: new Date().toLocaleString(),
            count: updatedProfile.length,
            data: updatedProfile
        });
    });
};

module.exports = {
    register,
    login,
    verify,
    logout,
    updateProfile,
};