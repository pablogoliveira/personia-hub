
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  const status = err.statusCode || 500;
  const message = err.message || 'Erro interno do servidor';
  
  res.status(status).json({
    status,
    error: status === 500 ? 'Internal Server Error' : 'Bad Request',
    message,
    details: err.details || [],
    timestamp: new Date().toISOString()
  });
};

module.exports = errorHandler;
