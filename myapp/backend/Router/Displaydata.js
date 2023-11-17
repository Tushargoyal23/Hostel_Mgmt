const express = require('express')
const { Routes } = require('react-router-dom');
const Details = require('../models/Details') 
const router = express.Router()
//calling the router
router.get('/complaindata',async (req,res)=>{
    try{
        //sending the globalized data in response so that it can be use further
       const complaints=await Details.find({});
       res.status(200).send({
        success: true,
        message: "users data list",
        data: complaints,
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
  
    

// module to export the file
module.exports = router;