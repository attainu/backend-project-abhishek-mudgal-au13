import express from 'express'
import * as dotenv from 'dotenv'
import { prependListener } from 'process'


dotenv.config()

const app = express()
const PORT = process.env.PORT


app.listen(PORT, ()=>{
    console.log(`Launched the server at http://localhost:${PORT}`)
})