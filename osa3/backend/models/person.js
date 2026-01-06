// comments by AI
// Import the mongoose library to manage MongoDB connection
const mongoose = require('mongoose')

// Set mongoose to use a looser query syntax (doesn't enforce all fields in the schema)
mongoose.set('strictQuery', false)

// Get the MongoDB connection URL from the environment variable
const url = process.env.MONGODB_URI

// Log which database we are connecting to
console.log('connecting to', url)

// Check if the environment variable is set
console.log('MongoDB URI is set:', !!url)

// Connect to MongoDB (force IPv4)
mongoose.connect(url, { family: 4 })
  // Log success message when connected
  .then(() => {
    console.log('connected to MongoDB')
  })
  // Log error message if connection fails
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

// Define the schema for "Person" documents
const personSchema = new mongoose.Schema({
  
  name: String,
  number: String,
})

// Log schema creation
console.log('Person schema defined')

// Customize JSON output when a document is converted
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // Convert _id to string and rename to 'id'
    returnedObject.id = returnedObject._id.toString()
    // Remove the original _id
    delete returnedObject._id
    // Remove the Mongoose version key
    delete returnedObject.__v
    // Log the transformed document
    console.log('Transforming document:', returnedObject)
  }
})

// Export the model so it can be used elsewhere
module.exports = mongoose.model('Person', personSchema)

// Log that the model has been exported
console.log('Person model exported')
