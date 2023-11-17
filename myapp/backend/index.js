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
app.use('/api',require('./Router/Complainadded'));
app.use('/api',require('./Router/Displaydata'));
app.use('/api',require('./Routes/CreateUser'));
app.use('/api',require('./Routes/Loginuser'));
app.use('/api',require('./Router/Edit_menu'))
// Create a Complain model

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
