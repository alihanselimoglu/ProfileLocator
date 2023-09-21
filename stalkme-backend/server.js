const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./db');
connectDB();
dotenv.config();

const {
  searchInstagramProfiles,
  searchLinkedinProfiles,
} = require('./scriptProfiles');

const app = express();

dotenv.config();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/search/in/:name', async (req, res) => {
  const name = req.params.name;
  const instagramProfiles = await searchInstagramProfiles(name);
  res.json(instagramProfiles);
});

app.get('/search/li/:name', async (req, res) => {
  const name = req.params.name;
  const linkedinProfiles = await searchLinkedinProfiles(name);
  res.json(linkedinProfiles);
});


app.listen(4000, () => {
  console.log(`Server running on port 4000`);
});
