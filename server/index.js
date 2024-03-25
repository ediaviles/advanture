const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors')

app.use(cors());
app.use(express.json())
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Advanture");
console.log(mongoose.connection.readyState)

const User = require("./Models/User")
const Island = require("./Models/Island")

// GET islands by username
app.get('/islands/:username', async (req, res) => {
  try {
      // First, find the user by username to get the userId
      const user = await User.findOne({ username: req.params.username });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      
      // Next, find the islands associated with this userId
      const islands = await Island.find({ owner_id: user.userId });
      
      // Respond with the found islands
      res.json(islands);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});

// TODO: GET islands from list of tags
app.get('/islands-by-tags', async (req, res) => {
    try {
        const tags = req.query.tags ? req.query.tags.split(',') : [];
        console.log(tags)
        const islands = await Island.find({
            tags: { $in: tags }
        })
        console.log(islands)
        res.json(islands);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
})

// TODO: GET user information

// POST new user
app.post('/create-user', async (req, res) => {
  try {
      // Check if the user already exists
      console.log(req.body)
      const existingUser = await User.findOne({ userName: req.body.username });
      if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
      }

      // Create a new user with the request body data
      const newUser = new User(req.body);

      // Save the new user to the database
      const savedUser = await newUser.save();

      // Respond with the saved user data
      res.status(201).json(savedUser);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create the user' });
  }
});

// POST new island
app.post('/save_island', async (req, res) => {
  try {
      // Create a new island using the request body data
      console.log(req.body.island)
      const newIsland = new Island(req.body.island);
      console.log(newIsland)

      // Save the new island to the database
      const savedIsland = await newIsland.save();

      // Respond with the saved island data
      res.status(201).json(savedIsland);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to save the island' });
  }
});