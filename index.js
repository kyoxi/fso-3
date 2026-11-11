const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))


const url = 'mongodb+srv://jessepaajanen70_db_user:WpfR0jQVDw0LWest@kyo.na1mwto.mongodb.net/puhelinluetteloApp?retryWrites=true&w=majority&appName=kyo'

mongoose.set('strictQuery', false)
mongoose.connect(url)

// Skeema ja malli henkilölle
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})


app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'name or number missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})