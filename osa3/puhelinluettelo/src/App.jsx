import './index.css'
import { useEffect, useState } from 'react'
import personsService from './services/personsServices.jsx'
import Filter from './components/Filter.jsx'
import Contacts from './components/Contacts.jsx'
import PersonsForm from './components/PersonsForm.jsx'
import Notification from './components/Notification.jsx'    


//handlerit
// Add a new person or update an existing one (Kommentit ja refactorointi chatGPT:llä)
const handleAddPerson = async ({event, newPerson, newNumber, persons, setPersons, setNewName, setNewNumber, setConfirmMessage }) => {
  event.preventDefault()                                               // Prevent default form submission behavior          

  const existingPerson = persons.find(p => p.name === newPerson)       // Check if person already exists by name

  // -------------------------------------------------------Creating a new person------------------------------------------------------- 
  if (!existingPerson) {                                               // If person does not exist, create a new one 
    try {                                                              // Attempt to create the new person on the server
      const created = await personsService.create({                    // Create person object
        name: newPerson,  
        number: newNumber
      })

      setPersons(persons.concat(created))                              // Update state with new person            
      setConfirmMessage(`Added: ${newPerson}`)                         // Show confirmation message         
      setTimeout(() => setConfirmMessage('Awaiting actions...'), 7000) // Clear message after 7 seconds
    } catch (error) {
      console.log("Error from server:", error.response?.data)           // Log server error for debugging

      const errorMessage = error.response?.data?.error || "Unknown error occurred"   // Extract error message from server response
      setConfirmMessage(`Error: ${errorMessage}`)                                    // Show error message to user       
      setTimeout(() => setConfirmMessage('Awaiting actions...'), 7000)               // Clear message after 7 seconds
    }

    // Always clear the input fields
    setNewName('')  
    setNewNumber('')
    return 
  }

  // ----------------------------------------------- Updating existing person's number -----------------------------------------------
  if (window.confirm(`${newPerson} is already added, replace the old number?`)) {  // Confirm update with user  
    try {                                                                          // Attempt to update the person's number on the server               
      const updated = await personsService.update(existingPerson.id, {             // Update person object        
        ...existingPerson,                                                         // Keep existing details
        number: newNumber                                                          // Update number                 
      })

      setPersons(persons.map(p => p.id !== updated.id ? p : updated))              // Update state with updated person     
      setConfirmMessage(`Number updated for ${newPerson}`)                         // Show confirmation message     
      setTimeout(() => setConfirmMessage('Awaiting actions...'), 7000)             // Clear message after 7 seconds
    } catch (error) {                                                              // Handle errors during update          
      const msg = error.response?.data?.error || "Could not update person"         // Extract error message from server response    

      if (error.response?.status === 404) {                                        // If person not found on server       
        setConfirmMessage(`Error: ${newPerson} was already removed from server`)   // Show specific error message
      } else {                                                                     // Other errors             
        setConfirmMessage(`Error: ${msg}`)                                         // Show general error message      
      }

      setTimeout(() => setConfirmMessage('Awaiting actions...'), 7000)             // Clear message after 7 seconds
    }
  }

  // Always clear the input fields
  setNewName('')
  setNewNumber('')
}

// Delete a person by id with confirmation
const handleDeletePerson = (id, persons, setPersons) => {         
  const person = findPersonId(persons, id);                                     // find person by id                    

  if (!person || !window.confirm(`Delete this person? ${person.name}`)) return; // confirm deletion

  deletePerson(id, persons, setPersons);                                        // proceed with deletion               
};

const handleChange = (event, setter) => setter(event.target.value);             // Generic input change handler          

//helper functions
const deletePerson = (id, persons, setPersons) => personsService.deleteResource(id).then(() => updateFormState(persons, id, setPersons)) // Delete person and update state
const findPersonId = (persons, id) => persons.find(p => p.id === id) // Find person by id
const updateFormState = (persons, id, setPersons) => setPersons(persons.filter(p => p.id !== id)) // Update state after deletion
const getFilteredPersons = (persons, value) => persons.filter(p => p.name.toLowerCase().includes(value.toLowerCase())) // Get persons matching filter
const fetchPersonsData = (setPersons) => personsService.getAll().then(fetchedPersons => setPersons(fetchedPersons)) // Fetch all persons from server

// Main App component
const App = () => {

  // State variables
  const [persons, setPersons] = useState([])                                    // List of persons
  const [newPerson, setNewName] = useState('')                                  // New person's name
  const [newNumber, setNewNumber] = useState('')                                // New person's number
  const [filter, setFilter] = useState('')                                      // Filter value
  const [confirmMessage, setConfirmMessage] = useState('Awaiting actions...')   // Confirmation or error message

  const filteredPersons = getFilteredPersons(persons, filter)                    // Persons matching filter - derived state

  useEffect(() => {                         // Initial data fetch on component mount
    fetchPersonsData(setPersons)            // Fetch persons from server and set state
    }, [])                                  // Empty dependency array ensures this runs only once

  return (                                  // Render the main application UI
    <div>
      <h1>Phonebook</h1>
        <Notification message={confirmMessage} />
        <Filter filter={filter} handleFilterChange={(event) => handleChange(event, setFilter)} />  
      <h2>add a new</h2> 
        <PersonsForm newPerson={newPerson} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} 
            handleAddPerson={event => handleAddPerson({ event, newPerson, newNumber, persons, setPersons, setNewName, setNewNumber, setConfirmMessage })} handleChange={handleChange}
        />
      <h3>Numbers</h3>  
        <section>
          <Contacts persons={filteredPersons} handleDeletePerson={(id) => handleDeletePerson(id, persons, setPersons)} />
        </section>
    </div>
  )
}

export default App

// Quick reference of component responsibilities:
// ─────────────────────────────────────────────
// 108   → Notification     : success/error/info messages
// 109   → Filter           : live name filtering
// 111   → PersonsForm      : add new person OR update existing (name + number)
// 116   → Contacts         : display list of filtered persons + delete functionality