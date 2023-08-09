const Student = require('../models/Student')

const QueryGetAllStudents = async () =>{
    const students = await Student.find({})
    return students
    
}
const QueryGetStudentDetails = async (studentId) =>{

    const student = await Student.findById(studentId)
    return student

}
const QueryAddStudent = async (data) =>{
    const student = new Student({
        name:data.name,
        email:data.email,
        class:data.class,
        semester:data.semester
    })
    await student.save()
    return student

}
// const QueryUpdateStudentPage = async () =>{

// }
const QueryUpdateStudent = async (studentId,data) =>{
    const student = await Student.findById(studentId)
    if(!student){
        const error = new Error('Student not found')
        error.status = 404
        throw error
    }
    data.name ? student.name = data.name : null
    data.email ? student.email = data.email : null
    data.class ? student.class = data.class : null
    data.semester ? student.semester = data.semester : null
    const updateStudent = await student.save()
    return updateStudent

}
// const QueryDeleteStudentPage = async () =>{

// }
const QueryDeleteStudent = async (studentId) =>{
    // const student = await Student.findById(studentId)
    // if(!student){
    //     const error = new Error('Student not found')
    //     error.status = 404
    //     throw error
    // }
    // await student.remove((err)=>{
    //     if(err){
    //         return{
    //             success:false,
    //             message:err
    //         }
    //     }else{
    //         return{
    //             success:true,
    //             message:"Student deleted!"
    //         }
    //     }
    // })
    const student = await Student.findByIdAndDelete(studentId)
    if(student){
        return{
            success:true,
            message:"Student deleted!"
        }
    }else{
        return{
            success:false,
            message:"Student not found"
        }
    }



}

module.exports ={
    QueryGetAllStudents,
    QueryGetStudentDetails,
    QueryAddStudent,
    // QueryUpdateStudentPage,
    QueryUpdateStudent,
    // QueryDeleteStudentPage,
    QueryDeleteStudent
}