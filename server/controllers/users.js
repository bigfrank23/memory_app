const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

exports.signin = async(req, res) =>{
    const {email, password} = req.body

    try {
        const existingUser = await User.findOne({email})
        if(!existingUser) return res.status(404).json({message: "User does not exist"})

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid Credentials"})

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "1h"})
        res.status(200).json({result: existingUser, token})
    } catch (error) {
        res.status(500).json({ message: "Something went wrong. That's all we know"});
        console.log(error);
    }

}

exports.signup = async(req, res) =>{
    const {firstName, lastName, email, password, confirmPassword} = req.body;

    try {
        const existingUser = await User.findOne({email})
        if(existingUser) return res.status(400).json({message: "User Already Exist"})

        if(password !== confirmPassword) return res.status(400).json({message: "Password don't match"})

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`})

        const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: "1h"})

        res.status(200).json({ result , token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong. That's all we know"});
        console.log(error);
    }
}