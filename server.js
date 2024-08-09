const express = require('express');
const fs = require('fs');
const marked = require('marked');
const app = express();

const port = process.env.PORT || 3000; // Use the PORT environment variable or default to 3000

app.get('/', (req, res) => {
  fs.readFile('./README.md', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading README.md');
    } else {
      var rawMarkup = marked.parse(data);

      res.send(`${rawMarkup}`);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});