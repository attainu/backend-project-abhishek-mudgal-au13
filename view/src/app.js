const express = require('express');
const path = require('path');
const app = express()
const port = process.env.PORT || 3000 ;


const static_path = path.join(__dirname, "../public");

app.use(express.static(static_path));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about', (req, res) => {
    res.send('Hello about')
})

app.get('/login', (req, res) => {
  res.send('Hello Login!')
})

app.get('/reg', (req, res) => {
    res.send('Hello Resister!')
})

app.get('*', (req, res) => {
    res.send('404 Error!')
})  


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})