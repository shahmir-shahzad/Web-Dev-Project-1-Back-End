const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../model/product');
const checkAuth = require('../middleware/check-auth');

router.post('/newitem',(req,res,next)=>{
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity
    });

    //Saving the new product
    product.save()
    .then(result=>{
        res.status(200).json({
            new_product: result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    })
})

//API to return the entire list of products
router.get('/list',checkAuth,(req,res,next)=>{
    Product.find()
    .then(result=>{
        res.status(200).json({
            products: result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

module.exports = router;