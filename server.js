const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const request = require('request')

var cache = require('memory-cache');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, './', 'dist')))
app.use(express.static(path.join(__dirname,'./','node_modules')))


app.get('/getWisdom/', function (req, res) {

    if(cache.get('phrase')){
        res.send(phrase.value)
    }else{
        request.get(`https://api.chucknorris.io/jokes/random`, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                phrase = JSON.parse(body)

                cache.put( 'phrase', phrase.value, 7000, function(key, value) {
                    console.log('Phrase is old so was deleted \n');
                })
                res.send(phrase.value)
            }
        })
    }
})

const port = 3000
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})