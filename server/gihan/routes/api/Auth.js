const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');

const User = require('../../models/User');





//@route POST
//@desc add a user
//@access public
router.post('/getauth', (req, res) => {
   
    User.findOne({
        email: req.body.email
    }).then(user => {
        const u = user;
        if (!user) {
            return res.status(400).send({
                message: 'User does not exsists'
            });
        }
       
        bcrypt.compare(req.body.password, user.password)
            .then(isMatch => {
                if (!isMatch) {
                    return res.status(400).send({
                        message: 'Invalid Credentials'
                    });
                }
               
                jwt.sign({
                    email: u.email,
                    userId: u.userId,
                    userType: u.userType,
                    id: u._id
                }, config.get('jwt_secret_key'), {
                        expiresIn: 30
                    }, (err, token) => {

                        if (err) throw err
                        console.log('here');
                        return res.status(200).send({
                            data: true,
                            message: 'valid user',
                            token: token
                        })
                    });
            })


    })
});

module.exports = router;