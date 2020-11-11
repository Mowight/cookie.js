const express = require('express')
const path = require('path')
const app = express()

app.use('/src', express.static(path.join(__dirname, 'src')))
app.use('/managment', express.static(path.join(__dirname, 'managment')))

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
}).listen(8000)