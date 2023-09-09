const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRouter = require('./routes/auth')

const app = express()
const port = process.env.PORT || 5000;


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB hhh!!!');
});

app.use(cors())
app.use(express.json())

app.use('/auth',authRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });