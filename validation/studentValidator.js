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

  body('gender')
    .notEmpty()
    .withMessage('Gender is required.'),

  body('email')
    .isEmail()
    .withMessage('Please provide a valid email.'),

  body('phone')
    .notEmpty()
    .withMessage('Phone number is required.'),

  body('department')
    .notEmpty()
    .withMessage('Department is required.'),

  body('level')
    .notEmpty()
    .withMessage('Level is required.'),

  body('dateOfBirth')
    .notEmpty()
    .withMessage('Date of birth is required.'),

  body('address')
    .notEmpty()
    .withMessage('Address is required.'),

  body('enrollmentDate')
    .notEmpty()
    .withMessage('Enrollment date is required.'),

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