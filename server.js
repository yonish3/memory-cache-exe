const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const request = require('request')

var cache = require('memory-cache');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname,'node_modules')))
app.use(express.static(path.join(__dirname, 'dist')))



app.get('/getWisdom/', function (req, res) {

    //***add if else statement here to check cash

        request.get(`https://api.chucknorris.io/jokes/random`, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                phrase = JSON.parse(body)

    //***add cashing process here

                res.send(phrase.value)
            }
        })
    })


const port = 3000
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})