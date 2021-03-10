import express from 'express'
import Telemetery from '../models/schemas/links'
import uaParser from 'ua-parser-js'

const router = express.Router()


// function findOS(rawData) {
//      // According to the data fetched from the useragent dep, 29th key-value pair is OS
//     for(i in rawData){
//         if(rawData[i]==true){
//             console.log(`${i}: ${rawData[i]}`)
//         }
//     }
// }


router.get(
    '/:link',
    // agent,
    async (req, res) => {


        let link = await Telemetery.findOne({ link: req.params.link })

        //checking if link has ever been created in the db
        if(link == null){
            return res.send('<h1>ERROR 404: Page not found! Please create the link first!</h1>')
        }

        try {


            // const ua = parser()
            const userAgent = uaParser(req.headers['user-agent'])

            // const updated = {
            //     { browserType : {[userAgent.browser.name]: 1}}
            // }
            // await Telemetery.updateOne({link: req.params.link}, 
            //     { "$inc": { browserType : {[userAgent.browser.name]: 1}}},
            //     {new: true}
            //     )

            // condition = 
            // update = 
            // console.log(telemetery);
            // telemetery = new Telemetery({
            //     browserType: {
            //         "$inc": {[userAgent.browser.name]: 1}
            //     }
            // })

            // console.log(Telemetery)
            // telemetery.save()

            return res.redirect(link.originalLink)
        } catch (error) {
            console.log(error)
            return res.status(500).send("<h1>Internal Server Error: 500</h1>")
        }

        
    }
)

export {router as redirect}