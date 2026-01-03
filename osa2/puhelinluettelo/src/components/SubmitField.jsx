const SubmitField = ({ label, newValue, handler, setter }) => (
  <> {label}: <input value={newValue} onChange={(event) => handler(event, setter)} /> </>
)

export default SubmitField