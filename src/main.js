import express from 'express'
import {InitMongo} from './models/configs/mongo-config'
import bodyParser, { urlencoded } from 'body-parser'
import expressip from "express-ip";

// Importing API
import {signup} from './API/signup'
import {login} from './API/login'
import {dashboard} from './API/dashboard'
import {redirect} from './API/redirect'


InitMongo()

const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.set('trust proxy', true)
app.use(expressip().getIpInfoMiddleware)

// app.use(useragent.express())

app.use('/api', signup)
app.use('/api', login)
app.use('/api', dashboard)
app.use('/', redirect)

app.listen(PORT, ()=>{
    console.log(`Launched the server at http://localhost:${PORT}`)
})
