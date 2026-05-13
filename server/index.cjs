const { setServers } = require('node:dns/promises');
setServers(['1.1.1.1', '8.8.8.8']);

require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', require('./routes/products.cjs'));


async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });

    console.log('Connected to Database!');
    app.listen(5000, () => console.log('Server running on port 5000'));
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
}

start();
