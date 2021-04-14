/*
    Author: Tomas Gerzicak
    Version: 1.0
    Description:
*/
let express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
let app = express()

// create application/json parser
var jsonParser = bodyParser.json()

const Db = require('./Db.js')

let db = new Db()

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.get('/', ((req, res) => {
  res.send('Hello')
}))

app.get('/words', ((req, res) => {
  res.json(db.getWords())
}))

app.get('/paied', (req, res) => {
  res.json(db.getPaidPrice())
})

app.put('/word', jsonParser, ((req, res) => {
  db.addPoint(req.body.word)
  res.sendStatus(200)
}))

app.post('/word', jsonParser, ((req, res) => {
  db.addWord(req.body.word, req.body.price)
  res.sendStatus(200)
}))

app.put('/paied', jsonParser, (req, res) => {
  db.addPaidAmount(req.body.price)
  res.sendStatus(200)
})

app.listen(4000)
