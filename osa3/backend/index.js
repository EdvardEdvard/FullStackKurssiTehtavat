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
app.get('/info', (request, response, next) => {            // Info route to show count of persons and current date/time
  Person.countDocuments({})                                // Count number of Person documents in MongoDB
    .then(count => {                                       // Handle the result
      const now = new Date()                               // Get current date and time - And below prepare HTML response
      const html = `                                             
        <p>Phonebook has info for ${count} people</p>
        <p>${now.toString()}</p>
      `
      response.send(html)                                   // Send HTML response with count and date/time
    })
    .catch(error => {                                       // Catch any errors during count operation
      console.error('Error counting persons in /info route:', error.message)
      next(error)
    })
})

// GET PERSON BY ID - from database
app.get('/api/persons/:id', (request, response, next) => {        // Route to get a person by ID from the database
  Person.findById(request.params.id)                              // Find person by ID from MongoDB
    .then(person => {                                             // Handle the result
      if (person) {                                               // If person found
        response.json(person)                                     // Respond with person data as JSON
      } else {                                                    // If no person found with that ID
        response.status(404).json({ error: 'person not found' })  // Respond with 404 Not Found

      }
    })
    .catch(error => {                                             // Catch errors (e.g., invalid ID format)
      console.error(`Error fetching person with id ${request.params.id}:`, error.message)
      next(error)
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

// POST /api/persons - add new person to database - or update existing person's number
app.post('/api/persons', async (req, res, next) => {                    // Use async/await for cleaner async code
  const { name, number } = req.body                                     // Extract name and number from request body

  if (!name || !number) {                                               // Validate presence of name and number
    return res.status(400).json({ error: 'name/number missing' })      // Respond with 400 Bad Request if missing
  }

  try {                                                                 // Try to add or update person in the database
    const existing = await Person.findOne({ name })                     // Check if person with same name already exists

    if (existing) {                                                     // If person exists, update their number

      existing.number = number
      const updated = await existing.save()
      return res.json(updated)
    }

    const person = new Person({ name, number })                        // Create new Person instance
    const saved = await person.save()                                  // Save new person to database
    res.status(201).json(saved)                                        // Respond with 201 Created and saved person data as JSON
  } catch (error) {                                                    // Catch validation or database errors
    console.error('POST /api/persons error:', error.message)           // Debug: log error message
    next(error)                                                        // Pass error to error handling middleware
  }
})

// PUT /api/persons/:id - update person's number by ID in database
app.put('/api/persons/:id', async (request, response, next) => {        // Use async/await for cleaner async code
  const { number } = request.body                                       // Extract number from request body

  if (!number) {                                                        // Validate presence of number
    return response.status(400).json({ error: 'number missing' })       // Respond with 400 Bad Request if missing
  }

  try {                                                                 // Try to update the person's number in the database
    const updatedPerson = await Person.findByIdAndUpdate(               // Find person by ID and update
      request.params.id,                                                // ID from request parameters
      { number },                                                       // New number to set
      {
        new: true,
        runValidators: true,
        context: 'query'
      }
    )

    if (!updatedPerson) {                                               // If no person found with that ID
      return response.status(404).json({ error: 'person not found' })   // Respond with 404 Not Found
    }

    response.json(updatedPerson)                                     // Respond with updated person data as JSON
  } catch (error) {                                                  // Catch validation or database errors
    console.error(`PUT /api/persons/${request.params.id} error:`, error.message)  // Debug: log error message
    next(error)                                                     // Pass error to error handling middleware
  }
})

app.use(errorHandler)  // Custom error handling middleware, needs to be after routes

// Start the server
const PORT = process.env.PORT || 3001                            // Use port from environment or default to 3001
app.listen(PORT, () => {                                         // Start server and listen on specified port
  console.log(`Server running on port ${PORT}`)                  // Log message when server is running
  console.log('Backend ready and connected to MongoDB!')         // Debug: confirm backend is ready
})
