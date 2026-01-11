require('dotenv').config()          //Load environment variables first

const express = require('express')          // Import Express framework
const app = express()                       // Create Express application
const cors = require('cors')
const morgan = require('morgan')            // HTTP request logger middleware
const Person = require('./models/person')   // Import the Mongoose Person model - THIS IS KEY FOR DB
const errorHandler = require('./middleware/errorHandler')

app.use(express.static('dist'))     // Serve frontend build 
app.use(express.json())             // Middleware to parse JSON bodies from requests
app.use(morgan('tiny'))             // Log all requests in tiny format (basic info)
app.use(cors())                     // Enable CORS so frontend can communicate with backend


morgan.token('body', (req) => req.method === 'POST' ? JSON.stringify(req.body) : '')   // Define custom token to log request body for POST requests
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body')) // Log detailed info including body for POST requests

// GET ALL PERSONS - from database
app.get('/api/persons', (request, response, next) => {                        
  console.log('Fetching all persons from database...')    //debug
  Person.find({})                                         // Searching from database: Person.find({})
    .then(persons => {                                    // Handle the result            
      console.log('Found persons:', persons.length)       //debug 
      response.json(persons)                              // Respond with JSON array of persons 
    })
    .catch(error => {                                      // Catch any errors during database operation       
      console.log('Error fetching persons from database')  //debug
      next(error)                                          // Pass error to error handling middleware
    })
})

// INFO PAGE - count from database
app.get('/info', (request, response, next) => {
  Person.countDocuments({}).then(count => {                            // Count documents in MongoDB collection
    const date = new Date()                                            // Current date and time
    console.log(`Info page requested - current count: ${count}`)       //debug
    response.send(`Phonebook has info for ${count} people<br>${date}`) // Send HTML response
  }).catch(error => {                                                  // Catch any errors during counting                   
    console.log('Error counting documents')                            //debug
    next(error)                                                        // Pass error to error handling middleware                 
  })
})

// GET PERSON BY ID - from database
app.get('/api/persons/:id', (request, response, next) => {     
  Person.findById(request.params.id)                                  // Find person by ID in MongoDB   
    .then(person => {                                                 // Handle the result
      if (person) {                                                   // If person found                
        console.log('Found person:', person.name)                     // Debug: show found person 
        response.json(person)                                         // Respond with person data as JSON        
      } else {                                                        // If no person found with that ID           
        console.log('Person not found with id:', request.params.id)   // Debug: not found
        response.status(404).end()                                    // Respond with 404 Not Found
      }
    })
    .catch(error => {                                                 // Catch errors (e.g., invalid ID format)     
      console.log('Invalid ID format:', request.params.id)            // Debug: invalid ID
      next(error)                                                     // Pass error to error handling middleware              
    })
})

// DELETE PERSON BY ID - from database
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)                             // Find person by ID and delete from MongoDB  
    .then(deletedPerson => {                                              // Handle the result 
      if (deletedPerson) {                                                // If person was found and deleted   
        console.log('Deleted person:', deletedPerson.name)                // Debug: show deleted person
        response.status(204).end()                                        // Respond with 204 No Content     
      } else {                                                            // If no person found with that ID            
        console.log('Person not found for deletion:', request.params.id)  // Debug: not found
        response.status(404).end()                                        // Respond with 404 Not Found           
      }
    })
    .catch(error => {                                                     // Catch errors (e.g., invalid ID format)              
      console.log('Invalid ID for delete:', request.params.id)            // Debug: invalid ID  
      next(error)                                                         // Error handling middleware will process this instead of handling here
    }) 
})

// POST /api/persons - add new person to database 
app.post('/api/persons', async (request, response, next) => {
  const body = request.body                                             // Extract data from request body
  console.log('POST request received with body:', body)                 // Debug: show incoming data

  if (!body.name || !body.number) {                                     // Validate presence of name and number     
    console.log('Validation failed: missing name or number')            // Debug: validation error
    return response.status(400).json({error: 'name or number missing'}) // Respond with 400 Bad Request
  }
  try {
    const existingPerson = await Person.findOne({ name: body.name })    // Check for duplicate name in database
    
    if (existingPerson) {                                               // Duplicate name found
      console.log('Duplicate name detected:', body.name)                // Debug: duplicate attempt
      return response.status(400).json({error: 'name must be unique'})  // Respond with 400 Bad Request for duplicate name
    }

    const person = new Person({                                         // Create new Person document                 
      name: body.name,                                                  // Set name from request body      
      number: body.number,                                              // Set number from request body            
    })

    const savedPerson = await person.save()                             // Save document to MongoDB
    console.log('New person saved:', savedPerson.name)                  // Debug: saved person
    response.json(savedPerson)                                          // Respond with saved person as JSON

  } catch (error) {                                                     // Catch any errors during save operation          
    console.log('Error while saving person')                            // Debug: save error
    next(error)                                                         // Pass error to middleware
  }
})

app.use(errorHandler)  // Custom error handling middleware, needs to be after routes
                                
// Start the server 
const PORT = process.env.PORT || 3001                            // Use port from environment or default to 3001             
app.listen(PORT, () => {                                         // Start server and listen on specified port      
  console.log(`Server running on port ${PORT}`)                  // Log message when server is running     
  console.log('Backend ready and connected to MongoDB!')         // Debug: confirm backend is ready
})

//Deprecated things below:

/* Generate unique ID without loops - NOT NEEDED WITH MONGODB
const generateId = () => {
  const id = Math.floor(Math.random() * 1000000) + 1         // number generation
  return persons.find(p => p.id === id) ? generateId() : id  // return unique id, othewise do recursive                                
}*/

