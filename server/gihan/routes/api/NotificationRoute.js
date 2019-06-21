const express = require('express');
const router = express.Router();

const Notification = require('../../models/Notification');
const auth = require('../../../../middleware/auth');



router.post('/createNotification', auth, (req, res) => {

    const notifi = new Notification({
        notificationType: req.body.notificationType,
        audience: req.body.audience,
        title: req.body.title,
        message: req.body.message,
    });

    try {
        notifi.save()
            .then(notification => {
                res.status(200).send({
                    notification: notification
                })
            });
    } catch (error) {
        res.status(500).send({
            message: 'Unknown server error..!'
        })
    }

})

router.get('/getNotifications/:userType',auth,(req,res)=>{

        let notificationArr = [];

        Notification.find().then(notifications => {

        })
})