const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors')

var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

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
      // Next, find the islands associated with this userId
      const islands = await Island.find({ owner_id: req.params.username });
      
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
        const username = req.query.username
        console.log(tags)
        const islands = await Island.find({
            tags: { $in: tags },
            owner_id: { $ne: username }
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
      const existingUser = await User.findOne({ username: req.body.username });
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

app.get('/get-user/:username/:password', async (req, res) => {
    try {
        console.log(req.params.username, req.params.password)
        const user = await User.findOne({ username: req.params.username, password: req.params.password })
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({message: 'User not found'})
        }
    } catch (error) {
        res.status(500).json({message: 'Failed to find user'})
    }
})

app.put('/update-following', async (req, res) => {
    const username = req.body.username
    const temp_following = req.body.following
    console.log(temp_following)
    const following = temp_following ? temp_following.split(',') : [];
    console.log('following:', following)
    try {
        const updatedUser = await User.findOneAndUpdate(
        { username },
        { $set: { following } },
        { new: true } // returns the updated document
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.get('/unique-usernames/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log("userId is", userId)
        const user = await User.findOne({username: userId});
        console.log(user)

        if (!user) {
            return res.status(404).send('User not found');
        }

        const uniqueUsernames = await getUniqueUsernames(user.following);
        res.json(uniqueUsernames);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.get('/usernames', async (req, res) => {
    try {
        const users = await User.find({}).select('username -_id'); // Select only the username field, exclude the _id
        const usernames = users.map(user => user.username);
        res.json(usernames);
    } catch (error) {
        res.status(500).send('Server error: ' + error.message);
    }
});

async function getUniqueUsernames(islandIds) {
    const islands = await Island.find({ _id: { $in: islandIds } }).select('owner_id');
    const ownerIds = islands.map(island => island.owner_id);
    const uniqueOwnerIds = [...new Set(ownerIds)]; // Removes duplicates
    const owners = await User.find({ username: { $in: uniqueOwnerIds } }).select('username');
    return owners.map(owner => owner.username);
}