const Notification = ({ message }) => {
  if (!message) return null

  const isError = message.includes('removed') // only error messages
  return (
    <div className={`message ${isError ? 'error' : ''}`}>
      {message}
    </div>
  )
}

export default Notification