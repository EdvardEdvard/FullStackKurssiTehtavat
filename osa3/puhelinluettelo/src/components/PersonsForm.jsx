// Form component for adding or updating persons
import SubmitField from './SubmitField.jsx'

const PersonsForm = ({ newPerson, setNewName, newNumber, setNewNumber, handleAddPerson, handleChange }) => { 
  return (                                                       
    <form onSubmit={handleAddPerson}>
      <SubmitField label="name" newValue={newPerson} handler={handleChange} setter={setNewName} />
      <br />
      <SubmitField label="number" newValue={newNumber} handler={handleChange} setter={setNewNumber} />
      <br />
      <button type="submit">add</button>
    </form>
  )
}

export default PersonsForm