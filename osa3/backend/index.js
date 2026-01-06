require('dotenv').config()          //Load environment variables first

const cors = require('cors')
const express = require('express')          // Import Express framework
const app = express()                       // Create Express application
const morgan = require('morgan')            // HTTP request logger middleware
const Person = require('./models/person')   // Import the Mongoose Person model - THIS IS KEY FOR DB

app.use(express.static('dist'))     // Serve frontend build 
app.use(express.json())             // Middleware to parse JSON bodies from requests
app.use(cors())                     // Enable CORS so frontend can communicate with backend
app.use(morgan('tiny'))             // Log all requests in tiny format (basic info)


// Custom token for logging POST body
morgan.token('body', (req) => {                                   // Step 1: We tell Morgan "hey, here’s a new thing you can log called 'body'"
  return req.method === 'POST' ? JSON.stringify(req.body) : ''    // Step 2: If someone is doing a POST request, grab the data they sent (req.body)
                                                                  // and turn it into text (JSON.stringify). If not POST, leave it empty.
})

// Step 3: We tell Morgan "use this format for logging in the console" --- Logs: HTTP METHOD, URL, STATUS CODE, RESPONSE SIZE, TIME IT TOOK, and if POST, the body data
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))  

// Client sends request --> Express server receives it
//            |
//            v
//        Morgan logger checks:
//            |
//            +--> What HTTP method? (GET, POST, etc.)
//            |
//            +--> If POST --> take the body data and convert to JSON text
//            |
//            +--> Log everything in format:
//                  METHOD | URL | STATUS | CONTENT-LENGTH | TIME ms | BODY



// GET all persons – data now comes from MongoDB, returns all persons as JSON ()
app.get('/api/persons', (request, response) => {
  console.log('Fetching all persons from database...')  //debug
  Person.find({}).then(persons => {                     // Searching from database: Person.find({})
    console.log('Found persons:', persons.length)       //debug
    response.json(persons)
  })
})


// INFO PAGE - count from database
app.get('/info', (request, response) => {
  Person.countDocuments({}).then(count => {           // Count now from MongoDB
    const date = new Date()
    console.log(`Info page requested - current count: ${count}`)  //debug
    response.send(`Phonebook has info for ${count} people<br>${date}`)
  })
})

// GET ONE PERSON BY ID
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        console.log('Found person:', person.name)   
        response.json(person)
      } else {
        console.log('Person not found with id:', request.params.id)
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log('Invalid ID format:', request.params.id)
      response.status(400).json({ error: 'malformatted id' })
    })
})


// DELETE PERSON BY ID 

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(deletedPerson => {
      if (deletedPerson) {
        console.log('Deleted person:', deletedPerson.name)  // Debug: inline example
        response.status(204).end()
      } else {
        console.log('Person not found for deletion:', request.params.id)
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log('Invalid ID for delete:', request.params.id)
      response.status(400).json({ error: 'malformatted id' })
    })
})

// Generate unique ID without loops
const generateId = () => {
  const id = Math.floor(Math.random() * 1000000) + 1         // number generation
  return persons.find(p => p.id === id) ? generateId() : id  // return unique id, othewise do recursive                                
}

// POST /api/persons - add new person to database 
app.post('/api/persons', async (request, response) => {
  const body = request.body                                          // Extract data from request body
  console.log('POST request received with body:', body)              // Debug: show incoming data

  // Validate that name and number are provided
  if (!body.name || !body.number) {
    console.log('Validation failed: missing name or number')         // Debug: validation error
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }

  try {
    // Check if a person with the same name already exists
    const existingPerson = await Person.findOne({ name: body.name })
    
    if (existingPerson) {                                            // Duplicate name found
      console.log('Duplicate name detected:', body.name)             // Debug: duplicate attempt
      return response.status(400).json({ 
        error: 'name must be unique' 
      })
    }

    // Create new Person document
    const person = new Person({
      name: body.name,
      number: body.number,
    })

    // Save to MongoDB
    const savedPerson = await person.save()
    console.log('New person successfully saved:', savedPerson.name, savedPerson.id)// Debug: success

    // Respond with 201 Created and the saved object
    response.status(201).json(savedPerson)

  } catch (error) {                                                  // Unexpected error during save
    console.log('Error saving to database:', error.message)          // Debug: log full error
    response.status(500).json({ error: 'internal server error' })   // 500 Internal Server Error
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log('Backend ready and connected to MongoDB!')
})