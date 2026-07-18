const { body, validationResult } = require('express-validator');

const validateStudent = [

  body('studentId')
    .notEmpty()
    .withMessage('Student ID is required.'),

  body('firstName')
    .notEmpty()
    .withMessage('First name is required.'),

  body('lastName')
    .notEmpty()
    .withMessage('Last name is required.'),

  body('email')
    .isEmail()
    .withMessage('Please provide a valid email.'),

  body('course')
    .notEmpty()
    .withMessage('Course is required.'),

  body('level')
    .notEmpty()
    .withMessage('Level is required.'),

  body('gpa')
    .isFloat({ min: 0, max: 5 })
    .withMessage('GPA must be between 0 and 5.'),

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

module.exports = validateStudent;