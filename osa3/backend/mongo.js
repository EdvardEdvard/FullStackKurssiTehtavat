// comments by AI !!
// Import mongoose library for MongoDB object modeling
const mongoose = require('mongoose')

// Check that a password argument is provided
if (process.argv.length < 3) {
  console.log('No password provided!')
  console.log('Usage:')
  console.log('  node mongo.js <password>            -> list all')
  console.log('  node mongo.js <password> "Name" 040-1234567  -> add new')
  process.exit(1)
}

// Read MongoDB password from command-line arguments
const password = process.argv[2]
console.log('Password received from arguments.')

// Build MongoDB connection URL using the provided password
const url =
  `mongodb+srv://database_user:${password}@cluster0.kl2iy3w.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

console.log('MongoDB connection URL constructed.')

// Disable strict query filtering (Mongoose setting)
mongoose.set('strictQuery', false)
console.log('Mongoose strictQuery set to false.')

// Connect to MongoDB (family: 4 forces IPv4)
mongoose.connect(url, { family: 4 })
console.log('Attempting to connect to MongoDB...')

// Define schema for a person document
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
console.log('Person schema defined.')

// Create Person model based on the schema
const Person = mongoose.model('Person', personSchema)
console.log('Person model created.')

// Get additional command-line arguments for name and number
const args = process.argv.slice(3)

if (args.length === 0) {
  // List all persons if only password is given
  console.log('No name/number provided. Fetching all persons from phonebook...')
  Person.find({}).then(persons => {
    console.log('phonebook:')
    persons.forEach(p => console.log(p.name, p.number))
    // Close database connection after query
    mongoose.connection.close()
    console.log('Database connection closed after fetching data.')
  })
} else if (args.length === 2) {
  // Create a new person using command-line arguments
  const person = new Person({
    name: args[0],
    number: args[1],
  })
  console.log(`Creating new person: ${person.name} with number ${person.number}`)

  // Save the new person to the database
  person.save().then(() => {
    console.log(`Added ${person.name} number ${person.number} to phonebook.`)
    // Close database connection after save
    mongoose.connection.close()
    console.log('Database connection closed after saving new person.')
  })
} else {
  console.log('Invalid arguments. Usage:')
  console.log('  node mongo.js <password>            -> list all')
  console.log('  node mongo.js <password> "Name" 040-1234567  -> add new')
  mongoose.connection.close()
}
