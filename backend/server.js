require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

const locationSchema = new mongoose.Schema({
    location: String,
    pincode: String,
    state: String,
    district: String
});

const Location = mongoose.model('Location', locationSchema, 'pincodes'); 

app.get('/api/search', async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: 'Search query is required' });

  try {
    const isNumeric = /^\d+$/.test(query);
    let results = [];
    
    if (isNumeric) {
      results = await Location.find({ pincode: { $regex: query } }).limit(20);
    } else {
      results = await Location.find({ location: { $regex: query, $options: 'i' } }).limit(20);
    }
    
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));