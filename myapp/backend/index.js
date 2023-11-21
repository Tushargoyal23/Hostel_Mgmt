const express = require('express')
const cors = require('cors');
const app = express()
const port = 5000
const mongoDB = require('./db')
const fileupload = require('express-fileupload')
app.use(cors());
mongoDB();
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(fileupload({
  useTempFiles:true
}))
app.use(express.json())
app.use('/api',require('./Router/Complainadded'));
// for Block user
app.use('/api',require('./Router/BlockUser'));
//  for items 
app.use('/api',require('./Router/Account'));

app.use('/api',require('./Router/MessMember'));

app.use('/api',require('./Router/Edit_menu'));

app.use('/api',require('./Router/MessCommitee'));

app.use('/api',require('./Router/Displaydata'));
app.use('/api',require('./Routes/CreateUser'));
app.use('/api',require('./Routes/Loginuser'));
app.use('/api',require('./Router/Edit_menu'))
app.use('/api',require('./Router/Responseadded'))
// Create a Complain model

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
