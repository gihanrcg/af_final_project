const express = require('express');
const router = express.Router();

const User = require('../../models/User');


//@route GET
//@desc get all users
//@access public
router.get('/', (req, res) => {
    console.log('find all');
    User.find()
        .sort({ date: -1 })
        .then(users => res.json(users))
});


//@route POST
//@desc add a user
//@access public
router.post('/createUser', (req, res) => {
    console.log(req.body);
    const newUser = new User({
        userType: req.body.userType,
        userId: req.body.userId,
        faculty: req.body.faculty,
        course: req.body.course,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.nic,
        nic: req.body.nic,
        date: new Date(),
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        landline: req.body.landline,
        mobile: req.body.mobile,

    })

    try {
        newUser.save().
            then(user =>
                res.status(200).send({
                    message: 'User created successfully',
                    data: user
                })
            );
    } catch (err) {
        res.status(500).send({
            message: 'Unknown server error',
            data: newUser
        });
    }


});


router.post('/isValidUser', (req, res) => {

   const em = req.body.email.toLowerCase();

    User.find({
        "email": em
    })
        .sort({ date: -1 })
        .then(users => {
            const u = users[0];
            console.log(u);

            if (u) {
                if (u.password.trim().toUpperCase() === req.body.password.trim().toUpperCase()) {
                    res.status(200).send({
                        data: true,
                        message: 'valid user'
                    })

                } else {
                    res.status(200).send({
                        data: false,
                        message: 'invalid password'
                    })
                }
            } else {
                res.status(200).send({
                    data: false,
                    message: 'invalid email'
                })
            }
        });

   


});

router.get('/:email', (req, res) => {

    console.log(req.params.email)
    User.find({
        "email": req.params.email
    })
        .sort({ date: -1 })
        .then(users => res.json(users));

});


router.put('/:email', (req, res) => {
    User.find({
        "email": req.params.email
    }).then(users => {

        if (users[0]) {
            const u = users[0];
            if (req.body.firstName) u.firstName = req.body.firstName;
            if (req.body.lastName) u.lastName = req.body.lastName;
            if (req.body.password) u.password = req.body.password;

            u.save().then(user => res.json(user));
        } else {
            res.status(404).send('No users found with ID ' + req.params.email)
        }
    })
});


module.exports = router;