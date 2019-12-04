const db = require('../models');


// Add user
const addUser = (req, res) => {
    db.User.create(req.body, (err, createdUser) => {
        if(err) return console.log(err);
        res.json({
            status: 201,
            data: createdUser
        });
    });
};

//Show one user
const showUser = (req, res) => {
    if (!req.session.currentUser) return res.status(401).json({
        status: 401,
        message: 'Unauthorized'
    });

    db.User.findById(req.session.currentUser.id, (err, foundUser) => {
        if (err) return res.status(500).json({
            status: 500,
            message: err
        });
        res.status(200).json({
            status: 200,
            data: {user: foundUser}
        });
    });
}

//show all users
const showAllUsers = (req, res) => {
    db.User.find({}, (err, showedAllUsers) => {
        if(err) return res.status(500).json({
            status: 500,
            message: err
        });
        res.status(200).json({
            status: 200,
            count: showedAllUsers.length,
            data: showedAllUsers
        });
    });
}

//Update One Current User
const updateUser = (req, res) => {
    if(!req.session.currentUser) return res.status(401).json({
        status: 401,
        message: 'Pleast Try Again!'
    });
    db.User.findByIdAndUpdate(req.session.currentUser.id, (err, foundUser) => {
        if(err) return res.status(401).json({
            status: 401,
            message: 'Pleast Try Again!'
        });
        if(req.body.email) {
            foundUser.email = req.body.email;
        };
        foundUser.save((err, updatedUser) => {
            if(err) console.log(err);
        })
        res.json({
            status: 201,
            message: foundUser
        });
    });
};

//Delete Current User
const deleteUser = (req, res) => {
    db.User.deleteOne({ User: req.params.user }, (err) => {
        if(err) return console.log(err);
        res.json({
            status: 200,
            message: 'Being Processed'
        });
    });
};

module.exports = {
    addUser,
    showUser,
    showAllUsers,
    updateUser,
    deleteUser,
}