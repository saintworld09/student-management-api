const express = require('express');
const router = express.Router();

const studentsController = require('../controllers/students');
const validateStudent = require('../validation/studentValidator');

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student Management
 */

/**
 * #swagger.tags = ['Students']
 * #swagger.description = 'Retrieve all students'
 */
router.get('/', studentsController.getAllStudents);

/**
 * #swagger.tags = ['Students']
 * #swagger.description = 'Retrieve one student by MongoDB ID'
 */
router.get('/:id', studentsController.getSingleStudent);

/**
 * #swagger.tags = ['Students']
 * #swagger.description = 'Create a new student'
 * #swagger.parameters['body'] = {
 *    in: 'body',
 *    required: true,
 *    schema: {
 *      studentId: 'STU001',
 *      firstName: 'Babatunde',
 *      lastName: 'Adekola',
 *      email: 'babatunde@gmail.com',
 *      course: 'Computer Science',
 *      level: '300',
 *      gpa: 4.2
 *    }
 * }
 */
router.post('/', validateStudent, studentsController.createStudent);

/**
 * #swagger.tags = ['Students']
 * #swagger.description = 'Update an existing student'
 * #swagger.parameters['id'] = {
 *    in: 'path',
 *    description: 'MongoDB Student ID',
 *    required: true,
 *    type: 'string'
 * }
 * #swagger.parameters['body'] = {
 *    in: 'body',
 *    required: true,
 *    schema: {
 *      studentId: 'STU001',
 *      firstName: 'Babatunde',
 *      lastName: 'Adekola',
 *      email: 'updated@gmail.com',
 *      course: 'Computer Science',
 *      level: '400',
 *      gpa: 4.8
 *    }
 * }
 */
router.put('/:id', validateStudent, studentsController.updateStudent);

/**
 * #swagger.tags = ['Students']
 * #swagger.description = 'Delete a student'
 * #swagger.parameters['id'] = {
 *    in: 'path',
 *    description: 'MongoDB Student ID',
 *    required: true,
 *    type: 'string'
 * }
 */
router.delete('/:id', studentsController.deleteStudent);

module.exports = router;