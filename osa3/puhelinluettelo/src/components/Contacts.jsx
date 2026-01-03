const Contacts = ({ persons, handleDeletePerson }) => (
  persons.map(details => 
    <li key={details.id}>
      {details.name} {details.number} 
      <button onClick={() => handleDeletePerson(details.id)}>delete</button>
    </li>
  )
)

export default Contacts