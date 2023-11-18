// Import required modules
const express = require('express');
const router = express.Router()
const Menu = require('../models/Menu');
const User = require('../models/User');
const userhostel = User.hostel;
// Express route to get menu details for the week
router.get('/get-menu-for-week', async (req, res) => {
  try {
    // Retrieve menu details for the week
    const menusForWeek = await Menu.find({hostel:userhostel});

    res.status(200).json(menusForWeek);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// POST route to update the menu for a specific day
router.post('/update-menu/:day', async (req, res) => {
  try {
    console.log("updating menu");
    const dayToUpdate = req.params.day;
    const updatedMenu = req.body;

    // Validate that the provided day is a valid day of the week
    if (!(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].includes(dayToUpdate))) {
      console.log("egekg");
      return res.status(400).json({ error: 'Invalid day' });
    }

    // Try to find the menu for the specified day
    let result = await Menu.findOne({ day: dayToUpdate,hostel:userhostel});
    console.log(result.meals);
    // If the menu for the day does not exist, create a new entry
    if (!result) {
      const newMenu = new Menu({
        day: dayToUpdate,
        meals: updatedMenu
      });
      console.log(newMenu);
      let result = await newMenu.save();
      return res.status(201).json({ message: 'New menu entry created', updatedMenu: result });
    }
    if (typeof updatedMenu.meals.breakfast == "string")
      updatedMenu.meals.breakfast = updatedMenu.meals.breakfast.split(',');
    if (typeof updatedMenu.meals.lunch == "string")
      updatedMenu.meals.lunch = updatedMenu.meals.lunch.split(',');
    if (typeof updatedMenu.meals.dinner == "string")
      updatedMenu.meals.dinner = updatedMenu.meals.dinner.split(',');
    if (typeof updatedMenu.meals.evening == "string")
      updatedMenu.meals.evening = updatedMenu.meals.evening.split(',');
    // Update the menu in the database
    // console.log(dayToUpdate, updatedMenu);
    result = await Menu.findOneAndUpdate({ day: dayToUpdate }, { meals: updatedMenu.meals }, { new: true });
    res.status(200).json({ message: 'Menu updated successfully', updatedMenu: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// module to export the file
module.exports = router;