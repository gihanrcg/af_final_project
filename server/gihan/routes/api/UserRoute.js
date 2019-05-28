const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const multer = require('multer');

const x = multer

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/users/profilePic');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(':','-') + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {c
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

const User = require('../../models/User');
const auth = require('../../../../middleware/auth');


//@route GET
//@desc get all users
//@access public
router.get('/', auth, (req, res) => {
    console.log('find all');
    User.find()
        .sort({ date: -1 })
        .then(users => res.json(users))
});


//@route POST
//@desc add a user
//@access public
router.post('/createUser', upload.single('profilePic'), (req, res) => {

    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return res.status(400).send({
                message: 'User already exsists'
            });
        }

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
            profilePic : req.file.path,
        })

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) console.log(err);
                newUser.password = hash;
                console.log(hash);
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
            })
        })
    })
});


// router.post('/isValidUser', (req, res) => {

//     const em = req.body.email.toLowerCase();

//     User.findOne({
//         "email": em
//     })
//         .sort({ date: -1 })
//         .then(users => {
//             const u = users;
//             console.log(u);

//             if (u) {
//                 if (u.password.trim().toUpperCase() === req.body.password.trim().toUpperCase()) {

//                     jwt.sign({
//                         email: u.email,
//                         userId: u.userId,
//                         userType: u.userType,
//                         id: u._id
//                     }, config.get('jwt_secret_key'), {
//                             expiresIn: 30
//                         }, (err, token) => {

//                             if (err) throw err

//                             res.status(200).send({
//                                 data: true,
//                                 message: 'valid user',
//                                 token: jwtToken
//                             })
//                         });



//                 } else {
//                     res.status(200).send({
//                         data: false,
//                         message: 'invalid password'
//                     })
//                 }
//             } else {
//                 res.status(200).send({
//                     data: false,
//                     message: 'invalid email'
//                 })
//             }
//         });




//});





module.exports = router;