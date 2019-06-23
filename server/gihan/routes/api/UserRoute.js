const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const multer = require('multer');
const nodeMailer = require('nodemailer');

const x = multer

//Definig multer storage to file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/users/profilePic');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(':', '-') + file.originalname);
    }
});

//Defining a filter to upload files
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        c
        cb(null, false);
    }
};

//Initialize multer object
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

//Initializing model user
const User = require('../../models/User');

//Initializing auth middleware function to be used to authorize users
const auth = require('../../../../middleware/auth');

//Initializr nodeMailer
const transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
        user: config.get('email'),
        pass: config.get('password')
    }
});

//@route GET
//@desc get all users
//@access private
router.get('/', auth, (req, res) => {
    console.log('find all');
    User.find()
        .sort({ date: -1 })
        .then(users => res.json(users))
});



//@route GET
//@desc get all lecturers
//@access private
router.get('/lecturers', auth, (req, res) => {

    User.find({
        userType: 'Lecturer'
    })
        .sort({ date: -1 })
        .then(users => {
            res.status(200).send({
                lecturers: users
            })
        })
});


//@route GET
//@desc get all students
//@access public
router.get('/students', auth, (req, res) => {

    User.find({
        userType: 'Student'
    })
        .sort({ date: -1 })
        .then(users => {
            res.status(200).send({
                students: users
            })
        })
});

//@route GET
//@desc get all admnins
//@access public
router.get('/admins', auth, (req, res) => {

    User.find({
        userType: 'Admin'
    })
        .sort({ date: -1 })
        .then(users => res.json(users))
});

//@route GET
//@desc get all students
//@access public
router.get('/students', auth, (req, res) => {

    User.find({
        userType: 'Student'
    })
        .sort({ date: -1 })
        .then(users => {
            res.status(200).send({
                students: users
            })
        })
});

//@route GET
//@desc get all admnins
//@access public
router.get('/admins', auth, (req, res) => {

    User.find({
        userType: 'Admin'
    })
        .sort({ date: -1 })
        .then(users => res.json(users))
});

//@route GET
//@desc confirm sign up email
//@access public
router.get('/confirm/:token', (req, res) => {

    try {
        const decoded = jwt.verify(req.params.token, config.get('email_secret_key'));
        console.log('email', decoded.email)

        User.findOneAndUpdate({ email: decoded.email }, { $set:{confirm: true} }, (err, doc) => {

            if (err) {
                return res.status(400).send({
                    message: err
                });
            } else {
                return res.redirect('/');
            }
        })
    } catch (err) {
        return res.status(401).send({
            message: 'invalid token'
        });
    }

})


//@route POST
//@desc add a user
//@access private
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
            profilePic: req.file.path,
        })

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) console.log(err);
                newUser.password = hash;
                try {
                    newUser.save().
                        then(user => {
                            jwt.sign(
                                {
                                    email: user.email,
                                },
                                config.get('email_secret_key'),
                                {
                                    expiresIn: 3600
                                }, (err, token) => {
                                    console.log('token', token)
                                    if (err) {
                                        console.log(err)
                                        throw err
                                    }
                                    else {
                                        const url = 'https://sms-af.herokuapp.com/api/users/confirm/' + token;
                                        
                                        transporter.sendMail({
                                            to: user.email,
                                            subject: 'Email Confirmation',
                                            html: '<b>Thank you</b> for joining with our School Management System <br/>'+
                                            'Please click this url to confirm your email address : <a href="' + url + '">' + url + '</a>'
                                        });
                                        return res.status(200).send({
                                            data: true,
                                            message: 'valid user',
                                            token: token,
                                            userId: u.userId,
                                            userType: u.userType
                                        })
                                    }
                                })

                            return res.status(200).send({
                                data: true,
                                message: 'valid user',                              
                                userId: u.userId,
                                userType: u.userType
                            })
                        });

                } catch (err) {
                    console.log(err)
                    res.status(500).send({
                        message: 'Unknown server error',
                        data: newUser
                    });
                }
            })
        })
    })
});


//@route PUT
//@desc change password
//@access admin
router.put('/changePassword', (req, res) => {
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) console.log(err);
                    user.password = hash;
                    try {
                        user.save().
                            then(user =>
                                res.status(200).send({
                                    message: 'User password updated successfully',
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

        } else {
            res.status(400).send({
                message: 'Invalid user',
            });
        }
    })
})


//@route PUT
//@desc update a user
//@access public
router.put('/updateUser', upload.single('profilePic'), (req, res) => {

    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {

            User.findByIdAndUpdate({ _id: user._id }, req.body, (err, doc) => {

                if (err) {
                    return res.status(400).send({
                        message: err
                    });
                } else {
                    return res.status(200).send({
                        message: 'updated'
                    });
                }


            })


        } else {
            return res.status(400).send({
                message: 'Invalid user'
            });
        }

    })
});

//@route GET
//@desc match and compare encrypted text
//@access public
router.post('/checkPasswords', (req, res) => {

    bcrypt.compare(req.body.newPassword, req.body.currentPassword)
        .then(isMatch => {
            res.status(200).send({
                passwordMatch: isMatch
            })
        })
});

module.exports = router;
