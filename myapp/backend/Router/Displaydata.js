const express = require('express')
const { Routes } = require('react-router-dom');
const router = express.Router()
//calling the router
router.post('/complaindata',(req,res)=>{
    try{
        //sending the globalized data in response so that it can be use further
        res.send([global.userData,global.ComplainData]);
    }catch{
        res.send("server error");
    }
})

// module to export the file
module.exports = router;