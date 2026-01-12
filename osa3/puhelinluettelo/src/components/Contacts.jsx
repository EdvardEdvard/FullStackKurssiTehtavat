const Contacts = ({ persons, handleDeletePerson }) => (
  persons.map(details =>                                                  // Display each contact with a delete button
    <li key={details.id}>                                                 
      {details.name} {details.number} 
      <button onClick={() => handleDeletePerson(details.id)}>delete</button> 
    </li>
  )
)
// Use unique key for each list item - //  Display contact details - // Delete button calls handleDeletePerson with contact's id
export default Contacts