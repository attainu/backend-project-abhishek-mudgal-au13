import { body, validationResult } from "express-validator"
import auth from "../middleware/auth"
import express from 'express'
import Telemetery from '../models/schemas/links'

const router = express.Router()


router.post(
    '/shorten',
    [
        body('originalLink', 'Please enter a valid link!').isURL({
            allow_trailing_dot: false,
            require_host: true,
            allow_underscores: true
        })
    ],
    auth,
    async (req, res) =>{

        //check the link validations
        let originalLinkValidation = validationResult(req)
        if(!originalLinkValidation.isEmpty()){
            return res.status(400).json({
                data: {},
                error: originalLinkValidation.array(),
                msg: "Not a valid link"
            })
        }


        //Links is valid//shortening the link
        try {
            
            const shorten = (length=6)=>{
                return Math.random().toString(20).substr(2, length)
            }
            
            const link = shorten()


            let telemetery = new Telemetery({
                link: link,
                originalLink: req.body.originalLink,
                creator: req.user.id
            })

            telemetery.save()

            return res.status(200).json({
                data: telemetery,
                error: [],
                msg: "Link shortened successfully, Saved to DB!"
            })

        } catch (error) {
            console.log(error)
            return res.status(500).send('Internal Server Error')
        }
    }
)

export {router as dashboard}