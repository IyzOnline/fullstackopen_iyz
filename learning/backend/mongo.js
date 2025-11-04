require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.TEST_MONGODB_URI
mongoose.set('strictQuery', false)

mongoose.connect(url)

const testNoteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const TestNote = mongoose.model('Note', testNoteSchema)

const testNote1 = new TestNote({
  content: 'HTML is easy',
  important: true,
})

const testNote2 = new TestNote({
  content: 'WAS',
  important: true,
})

Promise.all([testNote1.save(), testNote2.save()])
  .then(result => {
    console.log(result, ' \n\nSaving of notes was sucessful!')
    mongoose.connection.close()
  })
  .catch(error => {
    console.log(error)
    mongoose.connection.close()
  })