const mongoose = require('mongoose')

if (process.argv.length < 5 && process.argv.length !== 3) {
  console.log('Need more arguments')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://johnisaacbarbosanaga_db_user:${password}@cluster0.0koozst.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = new mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person
    .find({})
    .then((response) => {
      console.log('phonebook:')
      response.map(person => console.log(`${person.name} ${person.number}`))
      mongoose.connection.close()
    })
} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(() => {
    console.log(`${person.name} ${person.number}`)
    mongoose.connection.close()
  })
}
