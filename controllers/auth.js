let User = require('../models/userModel');
let bcrypt = require('bcrypt');
let mongoose = require('mongoose');
let Jwt = require('jsonwebtoken');
require('dotenv').config();


exports.signup = async function (req, res) {
    try {
        let { firstName, lastName, email, password} = req.body;
        if (!firstName) {
            throw new Error(`Please fill the first name`);
        }
        if (!lastName) {
            throw new Error(`Please fill the last name`);
        }
        if (!email) {
            throw new Error(`Please fill email`);
        }
        if (!password || password.length < 6) {
            throw new Error('Length of password must be more than 6');
        }

        if (await User.findOne({ email })) {
            return res.status(409).json({
                success: false,
                message: `Email ${email} already registered`,
            })
        }
        // password ko encrypt krna
        let hashedPassword = await bcrypt.hash(password, 10);
        let approved = "";
        approved === "Admin" ? (approved = false) : (approved = true);
        let user = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            approved: approved,
            role: "Student"

                
        })

        return res.status(201).json({
            success: true,
            message: `Its not a good practice  but for now ${user}`,
        })


    }
    catch (err) {
        console.log(err);
    }
}

exports.login = async function (req, res) {
    try {
        let { email, password } = req.body;
        if (!email) {
            throw new Error('Please enter Email');
        }
        if (password.length <= 6) {
            throw new Error('Length of password must be greate than 6')
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `Email id : ${email} is not registered`,
            })
        }
        
        
        let password_check= await bcrypt.compare(password, user.password)
        if (!password_check) {
            return res.status(401).json({
                success: false,
                message: `The password is wrong`
            })
        }

        let payload = {
            id: user._id,
            email: user.email,
            role: user.role,
        }

        let token = Jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '60m',
        });

        user.token = token;
        user.password = undefined;
        const options = {
            expires: new Date(Date.now() + 60* 60 * 1000),
            httpOnly: true,
        }

        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: 'Loged in Successfully',
        })
    }
    catch (error) {
        console.log(error);
    }
}