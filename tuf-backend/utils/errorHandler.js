// errorHandler.js
const createResponse = require("./response");

function errorHandler(err, req, res, next) {
  console.error("Error:", err.message);

  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  // Send the error response using the createResponse function
  res.status(statusCode).send(
    createResponse(statusCode, "error", null, message)
  );
}

module.exports = errorHandler;
