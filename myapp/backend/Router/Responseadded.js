const express = require('express');
const router = express.Router()
const Details = require('../models/Details') 
const { body , validationResult } = require('express-validator');
const authenticateUser = require('../Malware');
// Save data to local storage

// Retrieve data from local storage

router.post(`/response`, async (req , res) =>{
    try{
        const complain = await Details.findOne({ _id: req.body.id });
        console.log(complain)
        if(!complain){
            return res.json({  Success: false });
        }
        
       complain.Response=req.body.response;
       complain.isResponse=true;
      await  complain.save();
        res.json({Success:true});
    }catch (error){
        console.log(error);
        res.json({Success:false});
    }
})
module.exports = router;