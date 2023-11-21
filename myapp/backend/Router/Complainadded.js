const express = require('express');
const router = express.Router()
const Details = require('../models/Details') 
const { body , validationResult } = require('express-validator');
const authenticateUser = require('../Malware');
var cloudinary = require('cloudinary').v2;
// Save data to local storage

// cloudinary configuration

cloudinary.config({ 
    cloud_name: 'dq2s0016c', 
    api_key: '689377988929618', 
    api_secret: 'TZQsdQ8wH5roM2Xlf3xrQ4Kj0Mo',
    secure: true
  });
// Retrieve data from local storage

router.post('/addcomplain',[
    
    body('email').isEmail(),
    body('name').isLength({min: 3}),
    body('title').isLength({min: 3}),
    
] , async (req , res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        // console.log("errrrrrrr");
        return res.status(400).json({errors : errors.array()});
    }
    console.log(req.body);
    const file = req.files.img;

    cloudinary.uploader.upload(file.tempFilePath,async (err , result)=>{
        // console.log(result);
        try{
            const user = await Details.findOne({ email: req.body.email });
            if(!user){
                return res.json({  Success: false });
            }
            
            await Details.create({
                name:req.body.name,
                title:req.body.title,
                email:req.body.email,
                description:req.body.description,
                hostel:req.body.hostel,
                imageurl:result.url
            })
            
            
            res.json({Success:true});
        }catch (error){
            console.log("error");
            res.json({Success:false});
        }
    })
    
})
router.post('/imgtest' , (req , res, next)=>{
    console.log(req.body);
    const file = req.files.img;
    cloudinary.uploader.upload(file.tempFilePath,(err , result)=>{
        console.log(result);
    })
    res.json({Success:true});
})

// router.delete(`/delete/:id`,async(req , res)=>{
//     const id = req.params.id;
//     const filter = { _id:id };

//     // Delete the document that matches the condition
//     await Details.deleteOne(filter, (err, result) => {
//       if (err) {
//         console.error('Error deleting document:', err);
//       } else {
//         console.log('Document deleted successfully:', result);
//       }
// } )
// module.exports = router;
// const Details = require('../models/Details'); // Import your Mongoose model

router.delete(`/delete/:id`, async (req, res) => {
  const id = req.params.id;

  try {
    // Use findByIdAndDelete to delete by _id
    const result = await Details.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ error: 'Document not found' });
    }

    console.log('Document deleted successfully:', result);
    res.json({ deletedCount: 1 });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

  