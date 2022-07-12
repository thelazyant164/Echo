const unknownEndpoint = (error, request, response, next) => {
  response.status(404).send({ error: 'unknown endpoint' });

  next(error);
};

module.exports = unknownEndpoint;
