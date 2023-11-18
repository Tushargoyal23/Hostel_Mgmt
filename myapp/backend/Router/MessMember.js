const express = require('express');
const router = express.Router();
const Member = require('../models/Messmember'); 

// Create a new mess member
router.post('/add-mess-member', async (req, res) => {
    const { name, post, hostel} = req.body;
  
    try {
      // Create a new member
      const newMember = new Member({
        name,
        post,
        hostel
      });
  
      // Saving the new member to the database
      const savedMember = await newMember.save();
  
      res.status(201).json(savedMember); // Return the created member
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


// Update a mess member by ID
router.put('/update-mess-member/:id', async (req, res) => {
  const memberId = req.params.id;
  const { name, post} = req.body;

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
router.get('/mess-members', async (req, res) => {
    try {
        const members = await Member.find();
        res.json(members);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
});

module.exports = router;
