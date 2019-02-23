class Path {
    static BASE_URL = "http://localhost:3001"
    static GET_SCHOOLS = Path.BASE_URL + '/admin/school/getall'
    static GET_CLASSES = Path.BASE_URL + '/admin/class/getall'
    static GET_TEACHERS = Path.BASE_URL + '/admin/teacher/getall'
    static GET_STUDENTS = Path.BASE_URL + '/admin/student/getall'

}
export default Path;