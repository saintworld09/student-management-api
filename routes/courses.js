const express = require('express');
const router = express.Router();

const coursesController = require('../controllers/courses');
const validateCourse = require('../validation/courseValidator');


// GET
router.get('/', coursesController.getAllCourses);

// GET ONE
router.get('/:id', coursesController.getSingleCourse);

// POST
router.post('/', validateCourse, coursesController.createCourse);

// PUT
router.put('/:id', validateCourse, coursesController.updateCourse);

// DELETE
router.delete('/:id', coursesController.deleteCourse);

module.exports = router;