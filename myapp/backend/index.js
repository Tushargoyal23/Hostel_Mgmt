const express = require('express')
const cors = require('cors');
const app = express()
const port = 5000
const mongoDB = require('./db')
app.use(cors());
mongoDB();
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json())
// app.use('/api',require('./Router/Complainadded'));


app.use('/api',require('./Router/Edit_menu'));

// Create a Complain model
const Complain = require('./models/Details');

// API endpoint to get complaints
app.get('/api/complaints', async (req, res) => {
  try {
    const complaints = await Complain.find();
    res.json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})