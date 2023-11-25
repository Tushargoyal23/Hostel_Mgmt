const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu'); // Adjust the path accordingly

// POST route to add a rating for a specific meal
router.post('/addRating/:day/:mealType', async (req, res) => {
  try {
    const day = req.params.day;
    console.log(day)
    const mealType = req.params.mealType;
    const email = req.body.email; // Assuming you have a user object in the request after authentication

    const existingReview = await Menu.findOne({
      day: day,
      hostel: req.body.hostel,
      [`ratings.${mealType.toLowerCase()}`]: { $elemMatch: { email: email } }
    });

    if (existingReview) {
      return res.status(400).json({ error: 'You have already submitted a review for this day and meal type.' });
    }

    const rating = req.body.rating;

    // Validate rating value
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Invalid rating value. Must be between 1 and 5.' });
    }

    // Update the corresponding ratings array in the database
    const updateField = `ratings.${mealType.toLowerCase()}`;

    const updatedMenu = await Menu.findOneAndUpdate(
      { day: day, hostel: req.body.hostel },
      { $push: { [updateField]: { value: rating, email: email } } },
      { new: true }
    );

    console.log(updatedMenu);

    if (!updatedMenu) {
      return res.status(404).json({ error: 'Menu not found.',success:false });
    }

    res.json({ message: 'Rating added successfully', updatedMenu ,success:true});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to get average rating for a specific mealtime day-wise
router.post('/average-rating/:day/:mealType', async (req, res) => {
  try {
    const day = req.params.day;
    const mealType = req.params.mealType.toLowerCase();
    const hostel = req.body.hostel; // Assuming you pass hostel as a query parameter

    // Validate mealType
    if (!['breakfast', 'lunch', 'dinner', 'evening'].includes(mealType)) {
      return res.status(400).json({ error: 'Invalid mealType. Must be breakfast, lunch, dinner, or evening.' });
    }

    // Fetch all ratings for the specified day, mealType, and hostel
    const menus = await Menu.find({ day, hostel })
      .select(`ratings.${mealType}`);
    console.log(menus);
    // Extract all ratings for the specified mealType
    const ratingsArray = menus
      .map(menu => menu.ratings[mealType].map(rating => rating.value))
      .flat();

    // Calculate average rating
    const averageRating = calculateAverageRating(ratingsArray);

    res.json({ day, mealType, averageRating });
  } catch (error) {
    console.error('Error fetching average rating:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Function to calculate the average rating
function calculateAverageRating(ratings) {
  if (ratings.length === 0) {
    return null; // Or any default value for no ratings
  }

  const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
  console.log(totalRating,ratings.length);
  return totalRating / ratings.length;
}

module.exports = router;