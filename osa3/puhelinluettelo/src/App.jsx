import './index.css'
import { useEffect, useState } from 'react'
import personsService from './services/personsServices.jsx'
import Filter from './components/Filter.jsx'
import Contacts from './components/Contacts.jsx'
import PersonsForm from './components/PersonsForm.jsx'
import Notification from './components/Notification.jsx'    


//handlerit
// Add a new person or update an existing one (Kommentit ja refactorointi chatGPT:llä)
const handleAddPerson = ({
  event,            // form submit event
  newPerson,        // name from input
  newNumber,        // number from input
  persons,          // current persons list
  setPersons,       // state setter for persons
  setNewName,       // clears name input
  setNewNumber,      // clears number input
  setConfirmMessage
}) => {
  
  event.preventDefault() // stop page reload

  const existingPerson = findPersonName(persons, newPerson) // Check if the person already exists

if (existingPerson && window.confirm(`${newPerson} is already added, replace the old number?`)) {
  updatePersonBackend(existingPerson, newNumber).then(updated => {
      updatePersonState(persons, setPersons, updated)
      setConfirmMessage(`Number is updated: ${newPerson}`)
      setTimeout(() => setConfirmMessage('Awaiting actions...'), 5000)
    })
    .catch(error => {
      setConfirmMessage(`Information of : ${newPerson} is already removed from server`)
      console.log(error)
      setTimeout(() => setConfirmMessage('Awaiting actions...'), 5000)
    })
}

    if (!existingPerson) {
      createPersonBackend({ name: newPerson, number: newNumber }).then(created => addPersonState(persons, setPersons, created));
      setConfirmMessage(`Added: ${newPerson}`);
      setTimeout(() => setConfirmMessage('Awaiting actions...'), 5000);
    }

    //clear fields
    setNewName('');
    setNewNumber('');
};

const handleDeletePerson = (id, persons, setPersons) => {
  const person = findPersonId(persons, id); // find the person

  if (!person || !window.confirm(`Delete this person? ${person.name}`)) return; // confirm deletion

  deletePerson(id, persons, setPersons); // delete person
};

const handleChange = (event, setter) => setter(event.target.value);

//funktiot (ei paras tapa tehdä asioita tuotannossa?)
const updatePersonBackend = (person, number) => personsService.update(person.id, { ...person, number });
const updatePersonState = (persons, setPersons, updatedPerson) => setPersons(persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson));
const createPersonBackend = person => personsService.create(person);
const addPersonState = (persons, setPersons, newPerson) => setPersons(persons.concat(newPerson));
const deletePerson = (id, persons, setPersons) => personsService.deleteResource(id).then(() => updateFormState(persons, id, setPersons))
const findPersonId = (persons, id) => persons.find(p => p.id === id)
const findPersonName = (persons, newName) => persons.find(p => p.name === newName)
const updateFormState = (persons, id, setPersons) => setPersons(persons.filter(p => p.id !== id))
const getFilteredPersons = (persons, value) => persons.filter(p => p.name.toLowerCase().includes(value.toLowerCase()))
const fetchPersonsData = (setPersons) => personsService.getAll().then(fetchedPersons => setPersons(fetchedPersons))

const App = () => {

  //tilat
  const [persons, setPersons] = useState([])
  const [newPerson, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('') 
  const [confirmMessage, setConfirmMessage] = useState('Awaiting actions...')
  
  
  // Derivoitu tila - suodatettu henkilölista
  const filteredPersons = getFilteredPersons(persons, filter)

  useEffect(() => {   // Fetch notes once on mount
    fetchPersonsData(setPersons)
    }, []) 

  return (
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

/*
import { useState } from 'react'

//Data
const defaultList = [
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4,  name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]

//komponentit
const MappedContacts = ({ persons }) => (
  persons.map(details => <li key={details.id}>{details.name} {details.number}</li>)
)

//handlerit
const handleAddPerson = ({ event, newPerson, persons, setPersons, setNewName, setNewNumber, newNumber }) => {
  event.preventDefault()
  if (isPersonInList(persons, newPerson)) (
    alert(`${newPerson} is already added to phonebook`)
  )
  const newId = String(persons.length + 1)
  const personObject = { id: newId, name: newPerson, number: newNumber }
  setPersons(persons.concat(personObject))
  setNewName('')
  setNewNumber('')
}

//handelrit
const handleChange = (event, setter) => setter(event.target.value);

//Apufunktiot
const isPersonInList = (persons, newPerson) => persons.some(p => p.name === newPerson) ? true : false;

const getFilteredPersons = (persons, value) => {
  const filterValue = value.toLowerCase();
  return persons.filter(p => p.name.toLowerCase().includes(filterValue));
}

const App = () => {

  //tilat
  const [persons, setPersons] = useState(defaultList)
  const [newPerson, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('') 
  
  // Derivoitu tila - suodatettu henkilölista
  const filteredPersons = getFilteredPersons(persons, filter)

  return (
    <div>
      <h1>Phonebook</h1>
        <label>
          filter shown with:{' '}
          <input value={filter} onChange={(event) => handleChange(event, setFilter)}/>
        </label>
      <h1>add a new</h1>
        <form onSubmit={(event) => handleAddPerson({ event, newPerson, newNumber, persons, setPersons, setNewName, setNewNumber })}>
          <label>
            name: <input value={newPerson} onChange={(event) => handleChange( event, setNewName )} />
          </label>
          <br />
          <label>
            number: <input value={newNumber} onChange={(event) => handleChange(event, setNewNumber )} />
          </label>
          <br />
          <button type="submit">add</button>
          <h1>Numbers</h1>
        </form>   
        <div>
        </div>  
      <section>
        <MappedContacts persons={filteredPersons} />
      </section>
    </div>
  )
}

export default App */