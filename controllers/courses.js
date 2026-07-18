const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// ==========================================
// GET ALL COURSES
// ==========================================
const getAllCourses = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db('StudentManagementDB')
      .collection('courses')
      .find();

    const courses = await result.toArray();

    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// ==========================================
// GET SINGLE COURSE
// ==========================================
const getSingleCourse = async (req, res) => {
  try {
    const courseId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .db('StudentManagementDB')
      .collection('courses')
      .find({ _id: courseId });

    const course = await result.toArray();

    if (course.length === 0) {
      return res.status(404).json({
        message: 'Course not found.'
      });
    }

    res.status(200).json(course[0]);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// ==========================================
// CREATE COURSE
// ==========================================
const createCourse = async (req, res) => {

  const course = {
    courseCode: req.body.courseCode,
    courseName: req.body.courseName,
    instructor: req.body.instructor,
    creditHours: req.body.creditHours,
    semester: req.body.semester,
    department: req.body.department,
    maxStudents: req.body.maxStudents
  };

  // Validate all fields
  if (
    !course.courseCode ||
    !course.courseName ||
    !course.instructor ||
    !course.creditHours ||
    !course.semester ||
    !course.department ||
    !course.maxStudents
  ) {
    return res.status(400).json({
      message: 'All fields are required.'
    });
  }

  try {
    const response = await mongodb
      .getDb()
      .db('StudentManagementDB')
      .collection('courses')
      .insertOne(course);

    if (response.acknowledged) {
      res.status(201).json({
        id: response.insertedId
      });
    } else {
      res.status(500).json({
        message: 'Course could not be created.'
      });
    }

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


// ==========================================
// UPDATE COURSE
// ==========================================
const updateCourse = async (req, res) => {

  const courseCode = req.params.id;

  const course = {
    courseCode: req.body.courseCode,
    courseName: req.body.courseName,
    instructor: req.body.instructor,
    creditHours: req.body.creditHours,
    semester: req.body.semester,
    department: req.body.department,
    maxStudents: req.body.maxStudents
  };

  // Validate all fields
  if (
    !course.courseCode ||
    !course.courseName ||
    !course.instructor ||
    !course.creditHours ||
    !course.semester ||
    !course.department ||
    !course.maxStudents
  ) {
    return res.status(400).json({
      message: 'All fields are required.'
    });
  }

  try {

    const response = await mongodb
      .getDb()
      .db('StudentManagementDB')
      .collection('courses')
      .replaceOne(
        { courseCode: courseCode },
        course
      );

    if (response.modifiedCount > 0) {
      return res.status(204).send();
    }

    res.status(404).json({
      message: 'Course not found.'
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


// ==========================================
// DELETE COURSE
// ==========================================
const deleteCourse = async (req, res) => {

  try {

    const courseCode = req.params.id;

    const response = await mongodb
      .getDb()
      .db('StudentManagementDB')
      .collection('courses')
      .deleteOne({
        courseCode: courseCode
      });

    if (response.deletedCount > 0) {
      return res.status(200).json({
        message: 'Course deleted successfully.'
      });
    }

    res.status(404).json({
      message: 'Course not found.'
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }

};

module.exports = {
  getAllCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse
};