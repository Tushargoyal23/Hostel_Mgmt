const express = require('express');
const router = express.Router();
const Member = require('../models/Messcommitee'); 
const User = require('../models/User') 
// Create a new mess member
router.post('/add-commitee-member', async (req, res) => {
    const { name, post, hostel,email} = req.body;
    
    try {
      // Create a new member
      const newMember = new Member({
        name,
        post,
        hostel,
        email
      });
      const user=await User.findOne({email:req.body.email});
      user.role="1";
 await  user.save();
      // Saving the new member to the database
      
      const savedMember = await newMember.save();
      
      res.status(201).json({savedMember,success:true}); // Return the created member
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' ,success:false});
    }
  });


// Update a mess member by ID
router.put('/update-commitee-member/:id', async (req, res) => {
  const memberId = req.params.id;
  console.log(memberId)
  const user=await Member.findOne({_id:memberId});
  console.log(user.email)
    const user2=await User.findOne({email:user.email});
    if(!user2){
      return res.json({success:false})
    }
user2.role="0"; 
  const { name, post,email} = req.body;
  const user1=await User.findOne({email:email});
  console.log(user1)
      user1.role="1";
      await user1.save();
      await user2.save();
  // console.log(name,post);
  try {
    // Find the member by ID
    const member = await Member.findByIdAndUpdate(
      memberId,
      {
        $set: {
          name,
          post
        }
      },
      { new: true }
    );

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.json(member); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all mess members
router.get('/commitee-members', async (req, res) => {
    try {
        const members = await Member.find();
        res.json(members);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
});

router.delete('/delete-commitee-member/:id',async (req,res)=>{
  const memberid=req.params.id;
  console.log(memberid);
  try {
    const x = await User.findById(memberid);
    x.role="0";
    const id = await Member.findOne({email:x.email}); 
    const result = await Member.findByIdAndDelete(id); 
    await x.save();
    if (!result) {
      return res.status(404).json({ error: 'Commitee member not found' });
    }

    console.log('Commitee member deleted successfully:', result);
    res.json({ deletedCount: 1 ,success:true});

  } catch (error) {
    res.json({sucess:false})
  }
})

module.exports = router;
