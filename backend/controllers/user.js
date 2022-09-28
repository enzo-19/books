const User = require("../models/User")
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
    const {email, password} = req.body
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
}

// signup a user
const signupUser = async (req, res) => {
    const {email, password} = req.body
    const user = await User.signup(email, password)

    // // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})

}

module.exports = { signupUser, loginUser }