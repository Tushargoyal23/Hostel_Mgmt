const express = require('express');
const router = express.Router();
const user = require('../models/User');

router.post('/createuser', async (req, res) => {
  try {
    await user.create({
      name: 'Tushar goyal',
      hostel: 'Tilak',
      registration_no: '20214193',
      password: '123456',
    });
    res.json({ success: true });
  } catch (error) {
    console.error(error); // Log the actual error
    res.json({ success: false });
  }
});

module.exports = router;
