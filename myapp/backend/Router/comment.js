const express = require('express');
const router = express.Router();
const Details = require('../models/Details');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

router.post("/add-comments/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const complain = await Details.findOne({ _id: id });

    if (!complain) {
      return res.status(404).json({ success: false, message: "Complain not found" });
    }

    // Assuming comments is an array field in your Details model
    const comments = complain.comments || [];
    const newComment = {
      text: req.body.text,
      email: req.body.email,
      name: req.body.name,
      date:Date.now()
    };
    comments.push(newComment);

    // Assuming you have a comments field in your Details model
    complain.comments = comments;

    await complain.save();
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
