const express = require('express');
const fs = require('fs').promises;
const marked = require('marked');
const app = express();

const port = process.env.PORT || 3000; // Use the PORT environment variable or default to 3000

// Function to generate HTML response
const generateHtmlResponse = (cssData, rawMarkup) => `
  <html>
    <head>
      <title>Example Node App on Adobe Commerce Cloud</title>
      <style>${cssData}</style>
    </head>
    <body>
      ${rawMarkup}
    </body>
  </html>
`;

app.get('/', async (req, res) => {
  try {
    // Read README.md file
    const data = await fs.readFile('./README.md', 'utf8');
    const rawMarkup = marked.parse(data);

    // Read server.css file
    const cssData = await fs.readFile('./server.css', 'utf8');

    // Send HTML response
    res.set('Content-Type', 'text/html');
    res.send(generateHtmlResponse(cssData, rawMarkup));
  } catch (err) {
    console.error(err);
    res.status(500).send('Error reading files');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});