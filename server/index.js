const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors')

app.use(cors());
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/local");
console.log(mongoose.connection.readyState)

// TODO: GET islands by user

// TODO: GET islands by tags

// TODO: GET user information

// TODO: POST new user

// TODO: POST new island