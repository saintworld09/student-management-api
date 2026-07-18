const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Student Management API',
    description: 'API documentation for the Student Management API'
  },
  host: 'localhost:8000',
  schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);