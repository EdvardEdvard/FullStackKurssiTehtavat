const Notification = ({ message }) => {   
  if (!message) return null

  const isError = message.includes('removed') || message.toLowerCase().includes('error')  // Simple check for error messages  

  return (                                                                                // Conditional styling based on message type
    <div className={`message ${isError ? 'error' : ''}`}>
      {message}
    </div>
  )
}

export default Notification
