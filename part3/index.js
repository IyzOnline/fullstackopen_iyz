const express = require('express')
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

app.get('/api/persons', (request, response) => {
  response.json(persons)
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
  persons = newPersonsList

  response.status(204).end()
})

app.use(express.json())

const generateID = () => {
  return Math.floor(Math.random() * 1000000)
}

app.post('/api/persons', (request, response) => {
  const newPersonDetails = request.body

  if (!newPersonDetails) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const newPerson = {
    id: String(generateID()),
    ...newPersonDetails,
  }

  persons = persons.concat(newPerson)

  response.json(newPerson)
})

const PORT = 3001

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))