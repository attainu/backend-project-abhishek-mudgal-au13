import express, { response } from 'express'
import { body, validationResult } from 'express-validator'
import User from '../models/schemas/user'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const router = express.Router()


router.post(
    '/login',
    [
        body('email', 'Please enter is valid Email!').isEmail(),
        body('password', 'Please enter your Password')
    ],
    async (req, res) =>{

        // Validation checks for the login data
        const validationError = validationResult(req)
        if(!validationError.isEmpty()){
            return res.status(400).json({
                data: {},
                error: validationError.array(),
                msg: "Login Unsucessful!"
            })
        }


        try {

            // Searching for the user in the database, if not found, user doesn't exist
            let user = await User.findOne({email: req.body.email})
            console.log(req.body.email);
            console.log(user);
            if(!user){
                return res.status(400).json({
                    data: {},
                    error: [],
                    msg: "User doesn't exists"
                })
            }

            let isMatch = await bcrypt.compare(req.body.password, user.password)
            if(!isMatch){
                return res.status(400).json({
                    data: {},
                    error: [{
                        location: "body",
                        param: "password",
                        value: req.body.email
                    }],
                    msg: "Email or password wrong!"
                })
            }

            //Logged in successfully, token is created
            jwt.sign(
                {user: {id: user.id}},
                process.env.JWT_KEY,
                (err, token)=>{
                    if(err) throw err;
                    res.status(200).json({
                        data: {token},
                        error: [],
                        msg: "Login Success!"
                    })
                }
            )
        } catch (error) {
            console.log(error)
            return res.status(500).send("Internal Server Error!")
        }
    }
)

export {router as login}