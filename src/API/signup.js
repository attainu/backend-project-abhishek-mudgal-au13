import express from 'express'
import {body, validationResult} from 'express-validator'
import User from '../models/schemas/user'
import bcrypt from 'bcryptjs'

const router = express.Router()

// Signup page!

router.post(
    '/signup',
    [
        body('name', 'Please enter your name').not().isEmpty(),
        body('email', 'Please enter a valid email').isEmail(),
        body('password', 'Password should be of Minimum 6 and Maximum 15 in length!').isLength({min: 6, max: 15})
    ],
    async (req, res) => {

        //Signup form validation
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                data: {},
                error: errors.array(),
                msg: "Unable to create user!"
            })
        }

        // Checking if user exists or not
        try {
            let user = await User.findOne({email: req.body.email})

            if(user){
                return res.status(400).json({
                    data: {},
                    error: [{
                        location: "body",
                        param: "email",
                        value: req.body.email
                    }],
                    msg: "User already exists!"
                })
            }

            // If the above block is not executed, below signup action will be executed
            user = new User({
                name: req.body.name,
                email: req.body.email,
                joinDate: Date.now()
            })
            const salt = await bcrypt.genSalt(15)
            user.password = await bcrypt.hash(req.body.password, salt)
            await user.save()

            return res.status(200).json({
                data: user,
                error: [],
                msg: "Signed Up successfully!!"
            })

        } catch (error) {
            console.log(error)
            res.status(500).send("Internal Server Error!")
        }

    }
)

export {router as signup}