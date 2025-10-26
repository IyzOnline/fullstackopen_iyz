const mongoose = require('mongoose')

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then(response => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB: ', error.message)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, requiredObject) => {
        requiredObject.id = requiredObject._id.toString()
        delete requiredObject._id
        delete requiredObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)