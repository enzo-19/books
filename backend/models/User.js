const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

// Schema

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  }
})

// static signup method
userSchema.statics.signup = async function(email, password) {

    // validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    if (!validator.isStrongPassword(password, {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0})) {
        throw Error('Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter and one number.')
    }

    const exists = await this.findOne({email})

    if(exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt()
    const hashedPass = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hashedPass})

    return user
}

// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  if (!validator.isEmail(email)) {
    throw Error('Email is not valid')
  }

  const user = await this.findOne({ email })

  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

const User = mongoose.model('User', userSchema)

module.exports = User