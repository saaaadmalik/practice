const express = require('express');
const router = express.Router();
const StudentController= require('../controllers/studentController')
const protect = require('../middleware/authMiddleware')

router.route('/').get(protect, StudentController.getAllStudents)
router.route('/addstudent').get(protect,StudentController.addStudentPage)
router.route('/addstudent').post(protect,StudentController.addStudent)
router.route('/:id').get(protect, StudentController.getStudentDetails) 

router.route('/updatestudent/:id').get(protect,StudentController.updateStudentPage)
router.route('/updatestudent/:id').put(protect,StudentController.updateStudent)
router.route('/deletestudent/:id').get(protect,StudentController.deleteStudentPage)
router.route('/deletestudent/:id').delete(protect,StudentController.deleteStudent)

module.exports = router;
