const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Remove leading/trailing whitespaces
        minlength: 3, // Minimum length of the username
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        // Basic email validation using a regular expression
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      },
      password: {
        type: String,
        required: true,
        minlength: 6, // Minimum length of the password
      },
})

// Hash the user's password before saving it to the database
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
  
    const saltRounds = 10;
    const hash = await bcrypt.hash(user.password, saltRounds);
    user.password = hash;
    next();
  });

module.exports = mongoose.model('User',userSchema)