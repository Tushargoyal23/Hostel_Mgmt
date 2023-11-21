const express = require('express');
const router = express.Router();
const Items = require('../models/ItemDeatils') 
router.post('/add-items' , async (req , res)=> {
    try {
        const name = req.body.name
        const Price = req.body.price
         
        const item = new Items({
            name:name,
            price:Price,
            hostel:req.body.hostel
        })
        await item.save();
        res.json({success: true})
        
    } catch (error) {
        
        res.json({success: false})
    }
})


router.post('/get-items' , async (req , res)=> {
    try {
        const item =await Items.find({hostel:req.body.hostel});
        res.send({
             success:true,
             data:item
        })
        
    } catch (error) {
        
        res.json({success: false})
    }
})
module.exports = router;