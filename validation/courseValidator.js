const { body, validationResult } = require('express-validator');

const validateCourse = [

  body('courseCode')
    .notEmpty()
    .withMessage('Course code is required.'),

  body('courseName')
    .notEmpty()
    .withMessage('Course name is required.'),

  body('instructor')
    .notEmpty()
    .withMessage('Instructor is required.'),

  body('creditHours')
    .isInt({ min: 1 })
    .withMessage('Credit hours must be at least 1.'),

  body('semester')
    .notEmpty()
    .withMessage('Semester is required.'),

  body('department')
    .notEmpty()
    .withMessage('Department is required.'),

  body('maxStudents')
    .isInt({ min: 1 })
    .withMessage('Maximum students must be greater than 0.'),

  (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    next();

  }

];

module.exports = validateCourse;