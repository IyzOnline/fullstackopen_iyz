require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

let persons = 
[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (request) => JSON.stringify(request.body))

const postMorganHandler = morgan(':method :url :status : res[content-length] - :response-time ms :body')
const defaultMorganHandler = morgan(':method :url :status : res[content-length] - :response-time ms')

app.use((request, response, next) => {
  if (request.method === "POST") {
    postMorganHandler(request, response, next)
  } else {
    defaultMorganHandler(request, response, next)
  }
})
  
app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons => {
      if (!persons) {
        response.status(404).end()
      } 
      response.json(persons)
    })
    .catch(error => {
      console.log('Failed to obtain data from database: ', error.message)
      response.status(500).end()
    })
})

app.get('/info', (request, response) => {
  const firstLine = `<p>Phonebook has info for ${persons.length} people</p>`
  const presentDate = new Date()
  const secondLine = `<p>${presentDate}</p>`
  response.send(firstLine + secondLine)
})

app.get('/api/persons/:id', (request, response) => {
  const person = persons.find(person => person.id === request.params.id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const newPersonsList = persons.filter(person => person.id !== request.params.id)
  console.log(newPersonsList)
  persons = newPersonsList

  response.status(204).end()
})

const generateID = () => {
  return Math.floor(Math.random() * 1000000)
}

app.post('/api/persons', (request, response) => {
  const newPersonDetails = request.body

  if (!newPersonDetails.name || !newPersonDetails.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  Person
    .findOne({ name: newPersonDetails.name })
    .then(person => {
      if (person) {
        return response.status(409).json({
          error: 'This name is already in use.'
        })
      } else {
        const newPerson = new Person({
          name: newPersonDetails.name,
          number: newPersonDetails.number,
        })

        newPerson.save().then(savedPerson => {
          console.log(savedPerson)
          response.status(200).end()
        })
      }
    })
    .catch(error => {
      console.log("Something went wrong: ", error.message)
      response.status(500).end()
    })
})

const PORT = 3001

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))
