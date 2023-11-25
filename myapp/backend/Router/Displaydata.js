const express = require('express')
const { Routes } = require('react-router-dom');
const Details = require('../models/Details')
const User = require('../models/User') 
const router = express.Router()
//calling the router
router.post('/complaindata',async (req,res)=>{
    try{
        //sending the globalized data in response so that it can be use further
        
        const complaints=await Details.find({hostel:req.body.hostel}).sort({countupvote:-1,countdownvote:1});
      
       //console.log(complaints);
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
  router.post('/userdata',async (req,res)=>{
    try{
        //sending the globalized data in response so that it can be use further
        
       const userData=await User.find({ hostel: req.body.hostel});
      
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

  router.get('/complain/:id',async (req,res)=>{
    try{
        //sending the globalized data in response so that it can be use further
        const id=req.params.id;
       const complaint=await Details.findOne({_id:id});
       console.log(complaint);
       res.status(200).send({
        success: true,
        message: "users data list",
        data: complaint,
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
  router.post("/upvote/:id", async (req, res) => {
    const id  = req.params.id;
    const  email  = req.body.email;

    try {
        const complain = await Details.findOne({ _id: id });
      
        // Check if the user has already upvoted
        const hasUpvoted = complain.votes.some(vote => vote.email === email && (vote.type === 'upvote' || vote.type === 'downvote'));
        
        if (!hasUpvoted) {
          
            // If the user hasn't upvoted yet, add an upvote
            complain.votes.push({ email, type: 'upvote' });
            complain.countupvote=complain.countupvote+1;
            await complain.save();
            return res.json({ success: true });
        } else {
           
            return res.json({ success: false, message: 'User has already upvoted.' });
        }
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'Error upvoting complaint.' });
    }
});

router.post("/downvote/:id", async (req, res) => {
    const id = req.params.id;
    const email = req.body.email;

    try {
        const complain = await Details.findOne({ _id: id });

        // Check if the user has already downvoted
        const hasDownvoted = complain.votes.some(vote => vote.email === email && (vote.type === 'downvote' || vote.type === 'upvote'));
       // const hasUpvoted = complain.votes.some(vote => vote.email === email && vote.type === 'upvote');
        if (!hasDownvoted) {
         
            // If the user hasn't downvoted yet, add a downvote
            complain.votes.push({ email, type: 'downvote' });
            complain.countdownvote=complain.countdownvote+1;
            await complain.save();
            return res.json({ success: true });
        } else {
            return res.json({ success: false, message: 'User has already downvoted.' });
        }
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'Error downvoting complaint.' });
    }
});

    

// module to export the file
module.exports = router;