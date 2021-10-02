//NOT BEING USED IN THIS ASSIGNMENT - CREATED FOR THE PURPOSE OF LEARNING

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Student = require('../model/student');
const checkAuth = require('../middleware/check-auth');

router.get('/',checkAuth,(req,res,next)=> {
    Student.find()
    .then(result => {
        res.status(200).json({
            studentData:result
        })
    })

    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

router.get('/:id',(req,res,next)=>{
    Student.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            student:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

router.post('/',(req,res,next)=> {
    // console.log(req.body);
    // res.status(200).json({
    //     message : "This is a student post request"
    // })

    //creating a new student object/record
    const student = new Student({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        phone:req.body.phone
    })

    //Saving the new record
    student.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            newStudent : result
        })
    })

    //if not successfully saved
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    })

})

router.delete('/:id',(req,res,next)=>{
    Student.remove({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            message:"student deleted",
            result: result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

// Put Request - Updating Data
router.put('/:id',(req,res,next)=>{
    Student.findOneAndUpdate({_id:req.params.id},{
        "name": "alex",
        "email": "alex@gmail.com",
        "phone": 3001234567,
        "gender": "male",
        "__v": 0
    })
    .then(result=>{
        res.status(200).json({
            updatedStudent: result
        })
    })
    .catch(err=>{
        error:err
    })
})

module.exports = router; 