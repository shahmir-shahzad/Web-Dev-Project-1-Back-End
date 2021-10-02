const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

// router.get('/',(req,res,next)=>{
//     res.status(200).json({
//         message: "user signup api in progress"
//     })
// })

router.post('/signup',(req,res,next)=>{
    bcrypt.hash(req.body.password, 10,(err, hash) => {
        if(err)
        {
            return res.status(500).json({
                error: err
            })
        }
        else
        {
            const user = new User({
                _id: mongoose.Types.ObjectId(),
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                password: hash,
                userType: req.body.userType
            });
            
            user.save()
            .then(result=>{
                res.status(200).json({
                    new_user: result
                })
            })
            .catch(err=>{
                res.status(500).json({
                    error:err
                })
            })
        }

    });
})

router.post('/login',(req,res,next)=>{
    User.find({username: req.body.username})
    .exec()
    .then(user=>{
        if(user.length<1)
        {
            return res.status(401).json({
                message: "user does not exist"
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(!result)
            {
                return res.status(401).json({
                    message:"Password Incorrect"
                })
            }
            if(result)
            {
                //Creation of a token to be returned
                const token = jwt.sign({
                    username:user[0].username,
                    userType: user[0].userType,
                    email: user[0].email,
                    phone: user[0].phone
                },
                'my private key',
                {
                    expiresIn : "24h"
                }
                );
                
                //responding to the request by sending jwt token as a response
                res.status(200).json({
                    username : user[0].username,
                    userType: user[0].userType,
                    email : user[0].email,
                    phone : user[0].phone,
                    token : token
                })

            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router;