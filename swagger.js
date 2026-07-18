const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Student Management API',
    description: 'API documentation for the Student Management API'
  },
  host: 'student-management-api-t4kj.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);