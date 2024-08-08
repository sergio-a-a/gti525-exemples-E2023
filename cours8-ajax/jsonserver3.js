const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 8090;

const images = ["one.jpg", "two.jpg", "three.jpg", "four.jpg", "five.jpg"];
const imgCount = 50;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for AJAX requests
app.get('/ajax', (req, res) => {
  let count = Math.floor(Math.random() * 30) + 1;
  let obj = {};
  
  for (let i = 0; i < count; i++) {
    let key = Math.floor(Math.random() * 30);
    let value = images[Math.floor(Math.random() * images.length)];
    obj[key] = "images/" + value;
  }

  console.log(obj);
  res.json(obj);
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}/`);
});