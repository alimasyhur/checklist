const express = require('express')
const bodyParser = require('body-parser')
const model = require('./models/index');

const app = express()
app.use(bodyParser.json())


const port = 3000

app.get('/api/users', (req, res) => {
  model.User.findAll().then(users => res.json(users))
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
