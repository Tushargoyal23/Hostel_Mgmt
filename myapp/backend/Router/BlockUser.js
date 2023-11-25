const express = require('express');
const router = express.Router()
const Details = require('../models/Details')  
const { body , validationResult } = require('express-validator');
const User = require('../models/User') 
router.post('/blockuser/:id',async (req,res)=>{
    try{
        //sending the globalized data in response so that it can be use further
        const id=req.params.id;
       const userData=await User.findOne({_id:id})
      
       userData.isBlock=!userData.isBlock;
       await userData.save();
       console.log(userData)
       //console.log(complaints);
       res.status(200).send({
        success: true,
        message: "users data list",
        data: userData,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "erorr while fetching users",
        error,
      });
    }
  })
module.exports = router;