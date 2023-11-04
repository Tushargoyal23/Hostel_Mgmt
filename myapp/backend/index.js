// const express = require('express')
// const app = express()
// const port = 5000
// const mongodb = require('./db')
// mongodb();
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
const express = require('express');
const app = express();
const port = 5000;
const connectToMongoDB = require('./db');

// Connect to MongoDB
connectToMongoDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Express app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Error handling for Express
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});
