const express = require('express');
const router = express.Router()
const Details = require('../models/Details') 
const { body , validationResult } = require('express-validator');
router.post('/addcomplain',[

    body('email').isEmail(),
    body('name').isLength({min: 3}),
    body('title').isLength({min: 3}),
    
] , async (req , res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    try{
        await Details.create({
            name:req.body.name,
            title:req.body.title,
            email:req.body.email,
            description:req.body.description
        })
        res.json({Success:true});
    }catch (error){
        console.log(error);
        res.json({Success:false});
    }
})

module.exports = router;