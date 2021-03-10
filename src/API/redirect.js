import express from 'express'
import Telemetery from '../models/schemas/links'
import uaParser from 'ua-parser-js'


const router = express.Router()


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


            const userAgent = uaParser(req.headers['user-agent'])


            let deviceType = 'other'
            let browserName = userAgent.browser.name.toLowerCase()
            let osName = userAgent.os.name.toLowerCase()
            if(userAgent.device.type != undefined){
                deviceType = userAgent.device.type.toLowerCase()
            }


            if(browserName != 'firefox'
                    && browserName != 'chrome' 
                    && browserName != 'edge' 
                    && browserName != 'ie' 
                    && browserName != 'safari'
                    && browserName != 'opera'){
                browserName = 'other'
            }

            if(osName != 'linux' 
                && osName != 'windows' 
                    && osName != 'mac' 
                    && osName != 'chrome' 
                    && osName != 'android' 
                    && osName != 'ios'){
                osName = 'other'
            }

            if(deviceType != 'mobile' 
                    && deviceType !=  'desktop' 
                    && deviceType != 'tablet'){
                deviceType = 'other'
            }

            let browserkey = `browserType.${browserName}`
            let oskey = `OSType.${osName}`
            let devicekey = `deviceType.${deviceType}`

            const test = await Telemetery.findOneAndUpdate(
                { link: req.params.link },
                {$inc : { [browserkey] : 1, [oskey] : 1, [devicekey] : 1 }}
              )
            
            test

            return res.redirect(link.originalLink)

        } catch (error) {
            console.log(error)
            return res.status(500).send("<h1>Internal Server Error: 500</h1>")
        }

    }
)

export {router as redirect}


