const StudentService = require('../services/studentService')


const getAllStudents = async (req, res, next) => {
    try {
        const students = await StudentService.QueryGetAllStudents()
        res.render('student', { students: students })
    } catch (error) {
        console.log(error);
        res.status(500)
        next(error)

    }

}
const getStudentDetails = async (req, res, next) => {
    try {
        const studentId = req.params.id
        const student = await StudentService.QueryGetStudentDetails(studentId)
        res.json({
            success: true,
            student: student
        })
    } catch (error) {
        console.log(error);
        res.status(500)
        next(error)

    }

}
const addStudentPage = async (req, res) => {
    res.render('addstudent')

}
const addStudent = async (req, res, next) => {
    try {
        const student = await StudentService.QueryAddStudent(req.body)
        res.json({
            success: true,
            message: "Student saved!"
        })
    } catch (error) {
        console.log(error);
        res.status(500)
        next(error)


    }

}
const updateStudentPage = async (req, res, next) => {
    try {
        const student = await StudentService.QueryGetStudentDetails(req.params.id)
        if (!student) {
            const error = new Error('Student not found')
            error.status = 404
            throw error
        }
        res.render('updatestudent', { student: student })
    } catch (error) {
        console.log(error);
        res.status(500)
        next(error)

    }


}
const updateStudent = async (req, res,next) => {
    try {
        const updatedStudent = await StudentService.QueryUpdateStudent(req.params.id, req.body)
        res.json({
            success: true,
            message: "Student updated!"
        })
    } catch (error) {
        console.log(error);
        res.status(500)
        next(error)

    }


}
const deleteStudentPage = async (req, res,next) => {
    try {
        const student = await StudentService.QueryGetStudentDetails(req.params.id)
        if (!student) {
            const error = new Error('Student not found')
            error.status = 404
            throw error
        }
        res.render('deletestudent', { student: student })
    } catch (error) {
        console.log(error);
        res.status(500)
        next(error)
    }

}
const deleteStudent = async (req, res,next) => {
    try {
        const { success, message } = await StudentService.QueryDeleteStudent(req.params.id)
        res.json({
            success: success,
            message: message
        })
    } catch (error) {
        console.log(error);
        res.status(500)
        next(error)
    }


}

module.exports = {
    getAllStudents,
    getStudentDetails,
    addStudentPage,
    addStudent,
    updateStudentPage,
    updateStudent,
    deleteStudentPage,
    deleteStudent
}