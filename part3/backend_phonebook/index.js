require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const person = require('./models/person')

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
    .then(personsFound => {
      if (!personsFound) {
        response.status(404).end()
      } 
      response.status(200).json(personsFound)
    })
    .catch(error => {
      console.log('Failed to obtain data from database: ', error.message)
      response.status(500).end()
    })
})

app.get('/info', (request, response, next) => {
  Person.find({})
    .then(personsFound => {
      const firstLine = `<p>Phonebook has info for ${persons.length ? persons.length : 0} people </p>`
      const presentDate = new Date()
      const secondLine = `<p>${presentDate}</p>`
      response.status(200).send(firstLine + secondLine)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(personFound => {
      if (!personFound) {
        response.status(404).end()
      }

      response.status(200).json(personFound)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
  const personID = request.params.id
  Person.findOneAndDelete({ _id: personID })
    .then(person => {
      if (person) {
        console.log(`Deletion successful of ${person.name} was successful.`)
        response.status(204).end()
      } else {
        console.log("No person found for deletion.")
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
  const newPersonDetails = request.body
  console.log(newPersonDetails)

  if (!newPersonDetails.name || !newPersonDetails.number) {
    const error = new Error('Person name or number is missing');
    error.status = 400;
    error.name = 'ValidationError';

    return next(error)
  }

  const newPerson = new Person({
    name: newPersonDetails.name,
    number: newPersonDetails.number,
  })

  newPerson.save().then(savedPerson => {
    console.log(savedPerson)
    response.status(200).end()
  })

})

app.put('/api/persons/:id', (request, response, next) => {
  const { number } = request.body
  
  Person
    .findByIdAndUpdate(
      request.params.id,
      { number },
      {
        new: true, runValidators: true, context: 'query'
      }
    )
    .then(personFound => {
      if (personFound) {
        response.status(200).json(personFound)
      } else {
        response.status(404).json({ error: 'Person not found' })
      }
    })
    .catch(error => next(error))

    /*
  Method two:
  Person
    .find({ _id: request.params.id })
    .then(person => {
      if (!person) {
        response.status(404).json({ error: 'Person not found'} )
      }
      
      person.number = number
      return person.save()
    })
    .then(savedPerson => {
      if (savedPerson) {
        response.status(200).json(savedPerson)
      }
    })
    .catch(error => next(error))
  */
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: 'malformed id '})
  } 
  
  if (error.name === "ValidationError") {
    return response.status(error.status).json({ error: error.message })
  }

  return response.status(500).json({ error: 'something went wrong' })
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))
