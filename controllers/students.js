const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// ==========================================
// GET ALL STUDENTS
// ==========================================
const getAllStudents = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db('StudentManagementDB')
      .collection('students')
      .find();

    const students = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// ==========================================
// GET SINGLE STUDENT
// ==========================================
const getSingleStudent = async (req, res) => {
  try {
    const studentId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .db('StudentManagementDB')
      .collection('students')
      .find({ _id: studentId });

    const student = await result.toArray();

    if (student.length === 0) {
      return res.status(404).json({
        message: 'Student not found.'
      });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(student[0]);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// ==========================================
// CREATE A NEW STUDENT
// ==========================================
const createStudent = async (req, res) => {
  try {

    const student = {
      studentId: req.body.studentId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      email: req.body.email,
      phone: req.body.phone,
      department: req.body.department,
      level: req.body.level,
      dateOfBirth: req.body.dateOfBirth,
      address: req.body.address,
      enrollmentDate: req.body.enrollmentDate
    };

    // Validate required fields
    if (
      !student.studentId ||
      !student.firstName ||
      !student.lastName ||
      !student.gender ||
      !student.email ||
      !student.phone ||
      !student.department ||
      !student.level ||
      !student.dateOfBirth ||
      !student.address ||
      !student.enrollmentDate
    ) {
      return res.status(400).json({
        message: 'All fields are required.'
      });
    }

    const response = await mongodb
      .getDb()
      .db('StudentManagementDB')
      .collection('students')
      .insertOne(student);

    if (response.acknowledged) {
      res.status(201).json({
        message: 'Student created successfully.',
        id: response.insertedId
      });
    } else {
      res.status(500).json({
        message: 'Unable to create student.'
      });
    }

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


// ==========================================
// UPDATE STUDENT
// ==========================================
const updateStudent = async (req, res) => {
  try {

    const studentId = req.params.id;

    const student = {
      studentId: req.body.studentId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      email: req.body.email,
      phone: req.body.phone,
      department: req.body.department,
      level: req.body.level,
      dateOfBirth: req.body.dateOfBirth,
      address: req.body.address,
      enrollmentDate: req.body.enrollmentDate
    };

    // Validate all fields
    if (
      !student.studentId ||
      !student.firstName ||
      !student.lastName ||
      !student.gender ||
      !student.email ||
      !student.phone ||
      !student.department ||
      !student.level ||
      !student.dateOfBirth ||
      !student.address ||
      !student.enrollmentDate
    ) {
      return res.status(400).json({
        message: 'All fields are required.'
      });
    }

    const response = await mongodb
      .getDb()
      .db('StudentManagementDB')
      .collection('students')
      .replaceOne(
        { studentId: studentId },
        student
      );

    if (response.modifiedCount > 0) {
      return res.status(204).send();
    }

    res.status(404).json({
      message: 'Student not found.'
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};



// ==========================================
// DELETE STUDENT
// ==========================================
const deleteStudent = async (req, res) => {
  try {

    const studentId = req.params.id;

    const response = await mongodb
      .getDb()
      .db('StudentManagementDB')
      .collection('students')
      .deleteOne({
        studentId: studentId
      });

    if (response.deletedCount > 0) {
      return res.status(200).json({
        message: 'Student deleted successfully.'
      });
    }

    res.status(404).json({
      message: 'Student not found.'
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


module.exports = {
  getAllStudents,
  getSingleStudent,
  createStudent,
  updateStudent,
  deleteStudent
};