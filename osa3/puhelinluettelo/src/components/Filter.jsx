// Filter component for filtering contacts by name
const Filter = ({ filter, handleFilterChange }) => (  
  <> filter shown with: <input value={filter} onChange={handleFilterChange} /> </> 
)

export default Filter