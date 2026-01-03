const cors = require('cors')
const express = require('express')  // Import Express framework
const app = express()               // Create Express application
const morgan = require('morgan')    // logger something something

app.use(express.json())             // Middleware to parse JSON bodies
app.use(cors())
app.use(morgan('tiny'))             // logs all requests in tiny mode



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



let persons = [
  { id: 1, name: 'Arto Hellas', number: '040-123456' },
  { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: 3, name: 'Dan Abramov', number: '12-43-234545' },
  { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' },
  { id: 333, name: 'Oletus Testiolento', number: '+354-444-333-222' },
  { id: 111, name: 'Haisuli', number: '+354-111-111-222' }
]

//ALL PERSONS
// http://localhost:3001/api/persons
app.get('/api/persons', (request, response) => {response.json(persons)})  // GET endpoint: returns all persons as JSON ()


//INFO PAGE
// http://localhost:3001/info
app.get('/info', (request, response) => {   // GET endpoint: info about the phonebook
  const count = persons.length              // Count  persons in the phonebook 
  const date = new Date()                   // Get the current date and time  

  response.send(`Phonebook has info for ${count} people<br>${date}`)
})

//GET ONE PERSON
// http://localhost:3001/api/persons/4
app.get('/api/persons/:id', (request, response) => {   //GET endpoint for singular person:  /api/persons/:id 
  const id = Number(request.params.id)                 // Extract id from route, Convert to number
  const person = persons.find(p => p.id === id)        // find person with id match

  person //response
    ? response.json(person)         
    : response.status(404).end()    
})

//DELETE PERSON
// http://localhost:3001/api/persons/111
app.delete('/api/persons/:id', (request, response) => {   //in Postman, use delete method
  const id = Number(request.params.id)           
  const exists = persons.some(p => p.id === id)      // find if person exists

  exists
    ? (persons = persons.filter(p => p.id !== id),   // delete it
       response.status(204).end())                   // success
    : response.status(404).end()                     // not found
})

// Generate unique ID without loops
const generateId = () => {
  const id = Math.floor(Math.random() * 1000000) + 1         // number generation
  return persons.find(p => p.id === id) ? generateId() : id  // return unique id, othewise do recursive                                
}

// POST: add new person
app.post('/api/persons', (request, response) => {
  const body = request.body


  if (!body.name || !body.number)               // Check: name and number given
    return response.status(400).json({ error: 'name or number missing' })

 
  if (persons.some(p => p.name === body.name))   //Check is name unique       
    return response.status(400).json({ error: 'name must be unique' })

  const person = { 
    name: body.name,
    number: body.number,
    id: generateId() // Unique ID
  }

  persons = persons.concat(person) //add person to database yay!

  response.json(person)// Return added person as JSON
})


const PORT = process.env.PORT || 3001 // turn on server on port 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
