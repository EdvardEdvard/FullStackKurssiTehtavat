// comments by AI

const mongoose = require('mongoose')      // Import the mongoose library to manage MongoDB connection

mongoose.set('strictQuery', false)        // Disable strict query mode for flexibility in queries

const url = process.env.MONGODB_URI       // Get the MongoDB connection URL from the environment variable

console.log('connecting to', url)         // Log which database we are connecting to
console.log('MongoDB URI is set:', !!url) // Check if the environment variable is set

mongoose.connect(url, { family: 4 })                           // Connect to MongoDB (force IPv4)
  .then(() => {
    console.log('connected to MongoDB')                        // Log successful connection
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message) // Log error message if connection fails
  })

const personSchema = new mongoose.Schema({                     // Define a schema for the Person model
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function(v) {                            // Custom validator for phone number format
        return /^(\d{2}|\d{3})-\d{5,}$/.test(v)           // Validate phone number format XX-XXXXXX or XXX-XXXXXX
      },
      message: props => `${props.value} Is not a valid phone number! It should be in the format XX-XXXXXX or XXX-XXXXXX.`
    }
  }
})

console.log('Person schema defined')                      // Log that the schema has been defined

personSchema.set('toJSON', {                              // Customize JSON representation of documents
  transform: (document, returnedObject) => {              // Transform function to modify the output
    returnedObject.id = returnedObject._id.toString()     // Convert _id to string and assign to id
    delete returnedObject._id                             // Remove the _id field
    delete returnedObject.__v                             // Remove the __v field
    console.log('Transforming document:', returnedObject) // Log the transformed document
  }
})

module.exports = mongoose.model('Person', personSchema)   // Export the Person model based on the defined schema

console.log('Person model exported')                      // Log that the model has been exported
