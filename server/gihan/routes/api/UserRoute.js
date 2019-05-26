const express = require('express');
const router = express.Router();

const User = require('../../models/User');


//@route GET
//@desc get all users
//@access public
router.get('/', (req, res) => {
    console.log('find all');
    User.find()
        .sort({date: -1})
        .then(users => res.json(users))
});


//@route POST
//@desc add a user
//@access public
router.post('/', (req, res) => {
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    })

    newUser.save().then(user => res.json(user));
});

router.get('/:email', (req, res) => {

    console.log(req.params.email)
    User.find({
        "email": req.params.email
    })
        .sort({date: -1})
        .then(users => res.json(users))

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