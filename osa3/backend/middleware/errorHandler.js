// middleware/errorHandler.js
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') return response.status(400).send({ error: 'malformatted id' })    // Example: handling invalid ObjectId
  if (error.name === 'ValidationError') return response.status(400).json({ error: error.message })  // Example: handling validation errors
  next(error)                                                                                       // Pass to default error handler if not handled
}

module.exports = errorHandler