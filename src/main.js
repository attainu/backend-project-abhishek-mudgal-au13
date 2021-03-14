import express from 'express'
import {InitMongo} from './models/configs/mongo-config'
import bodyParser, { urlencoded } from 'body-parser'
import expressip from "express-ip"
import path from 'path'
import exphbs from 'express-handlebars'


// Importing API
import {signup} from './API/signup'
import {login} from './API/login'
import {dashboard} from './API/dashboard'
import {redirect} from './API/redirect'


InitMongo()
exphbs()

const app = express()
const PORT = process.env.PORT || 5000

const layoutsDir = path.join(__dirname, "views/layouts")
const partialsDir = path.join(__dirname, "views/partials")
app.set('views', path.join(__dirname, 'views'))
app.set('trust proxy', true)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(expressip().getIpInfoMiddleware)

app.engine('hbs', exphbs({
    extname: '.hbs',
    defaultLayout: "main",
    layoutsDir: layoutsDir,
    partialsDir: partialsDir,
}))

app.set('view engine', 'hbs');


// app.use(useragent.express())

app.use('/api', signup)
app.use('/api', login)
app.use('/api', dashboard)
app.use('/', redirect)
app.get('/', (req, res) => {
    res.render('index')
})

app.listen(PORT, ()=>{
    console.log(`Launched the server at http://localhost:${PORT}`)
})
