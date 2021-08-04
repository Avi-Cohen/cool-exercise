const express = require('express')
const cors = require('cors')
const app = express()
const path = require("path");
const mongoose = require("mongoose");



const PORT =  5000

app.use(cors())
app.use(express.json())

const publicDirectory = path.join(__dirname, "client/build");
app.use(express.static(publicDirectory));

app.get('/', (req, res) => {
    res.send({name:'avi'}) 
})
app.post('/form', (req, res) => {
    console.log(req.body)
    const {value} = req.body
    res.send(value)
})
app.listen(PORT, () => console.log('optional: running on ' +PORT))