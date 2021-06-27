const mongoose = require('mongoose')

if(process.argv.length < 3) {
    console.log('Please, insert your password as the third argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://kd:${password}@fullstackopen2021.wjiuo.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })


const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3) {
    return Person
                .find({})
                .then(result => {
                    result.map(person => console.log(person))
                    process.exit(1)
                })
}

const newPerson = new Person({
    name: process.argv[3],
    number: process.argv[4]
})

newPerson.save().then(result => {
    console.log(`${process.argv[3]} ${process.argv[4]} added`)
    mongoose.connection.close()
})