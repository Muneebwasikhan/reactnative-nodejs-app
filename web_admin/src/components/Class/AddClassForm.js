import React, { Component } from "react";
import { Input, Select, Datalist } from "../input/input"
import "./School.css"
import Path from "../../config/path";

class SchoolForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            schools: [],
            teachers: [],
            schoolId: "",
            success: false,
            teacherId: "",
            schoolName: "",
            teacherName: "",
            studentsFetch: [],
            students: [],
            empty: false,
            adminData: JSON.parse(localStorage.getItem("AdminData")),
            errors: {
                hasError: false,
                errorsObj: {},
                serverError: ""
            }
        }




    }

    componentDidMount() {
        fetch(Path.BASE_URL + "/admin/school/getall", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                databaseToken: this.state.adminData.databaseToken
            })
        }).then(resObj => resObj.json())
            .then((res) => {
                console.log(this.state.adminData.databaseToken);

                if (!res.success) {
                    this.setState({ serverError: res.message })
                    return;
                }
                console.log(res);

                this.setState({ schools: res.data, schoolName: res.data[0].SchoolName })
                this.fetchTeachers(res.data[0]._id);

            }).catch(err => {
                console.log(err);
            })
    }


    fetchTeachers(value) {
        const { errors, schools } = this.state;
        this.setState({ students: [], studentsFetch: [] })
        var school = schools.filter((item) => {
            return (
                item.SchoolName.toLowerCase().indexOf(value.toLowerCase()) === 0
                || item._id.toLowerCase().indexOf(value.toLowerCase()) === 0
            )
        })
        if (school[0]) {
            var schoolId = school[0]._id;
            console.log(schoolId);

            this.setState({ schoolId: school[0]._id, schoolName: school[0].SchoolName })
        }
        //Fetching Teachers Data
        fetch(Path.BASE_URL + "/admin/teacher/getall", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                databaseToken: this.state.adminData.databaseToken,
                schoolId: schoolId
            })
        }).then(resObj => resObj.json())
            .then((res) => {
                if (!res.success) {
                    errors.serverError = res.message || res.error;
                    this.setState({ errors })
                    return;
                }
                console.log(res);
                if (!res.data.length) {
                    return this.setState({ teachers: [], teacherId: "", teacherName: "", empty: true })
                }
                console.log(res.data);

                this.setState({ teachers: res.data, teacherId: res.data[0].idNo, teacherName: res.data[0].userName, empty: false })
            }).catch(err => {
                console.log(err);
            });
        // Fetching Students Data
        fetch(Path.BASE_URL + "/admin/student/getall", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                databaseToken: this.state.adminData.databaseToken,
                schoolId: schoolId
            })
        }).then(resObj => resObj.json())
            .then((res) => {

                if (!res.success) {
                    errors.serverError = res.message || res.error;
                    this.setState({ errors })
                    return;
                }
                if (!res.data.length) {
                    return this.setState({ studentsFetch: [] })
                }
                if (this.props.location.state) {
                    const rest = this.props.location.state.dataToBeShow;
                    console.log(rest);

                    this.setState({
                        ...rest,
                        edit: true
                    })
                }

                this.setState({ studentsFetch: res.data })
            }).catch(err => {
                console.log(err);
            })

    }
    addStudent(index) {
        const { studentsFetch, students } = this.state;
        console.log(studentsFetch.length)
        students.push(studentsFetch[index]);
        studentsFetch.splice(index, 1);
        console.log(studentsFetch.length)
        this.setState({ students, studentsFetch });
    }
    removeStudent(index) {
        const { studentsFetch, students } = this.state;
        studentsFetch.push(students[index]);
        students.splice(index, 1);
        this.setState({ students, studentsFetch });
    }

    onSubmit = (ev) => {
        ev.preventDefault();
        const { name, schoolId, teacherId, edit, classId, students, teacherName, errors, adminData } = this.state;
        console.log(this.state);


        const studentArray = students.map(studetData => {
            return {
                studentName: studetData.name || studetData.studentName,
                studentId: studetData._id,
                idNo: studetData.idNo,
                parentId: studetData.parentId
            }
        })
        var body = edit ? {
            databaseToken: adminData.databaseToken,
            data: {
                name, teacherId, students: studentArray, teacherName
            },
            classId
        } : {
                databaseToken: adminData.databaseToken,
                data: {
                    name, schoolId, teacherId, students: studentArray
                }
            }




        fetch(Path.BASE_URL + `/admin/class/${edit ? "edit" : "add"}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(resObj => resObj.json())
            .then(res => {
                if (!res.success) {
                    errors.serverError = res.message;
                    this.setState({ errors, success: false })
                    return;
                }
                errors.serverError = "";
                this.setState({ errors, name: "", success: true, students: [] })
                window.location.pathname = "/dashboard"
                console.log(res);


            }).catch(err => {
                console.log(err);
            })

    }

    render() {
        const { name, schoolId, edit, success, empty, schools, teacherId, schoolName, teacherName, students, studentsFetch, teachers, errors } = this.state;
        console.log(studentsFetch);
        return (
            <div id="Add-School-Form-Container">

                <h3 className="normal-heading">
                    <i>Add Class</i>
                </h3>
                <form method="post" id="form" onSubmit={(ev) => this.onSubmit(ev)}>
                    {errors.serverError &&
                        <p className="error">{errors.serverError}</p>}
                    {success && <div className="success-wrapper">
                        <p className="success">
                            Submit Successful
                    </p>
                    </div>}
                    <Input
                        name="name"
                        id="ClassName"
                        iconCode='&#xf175;'

                        type="text"
                        placeholder="Enter The Class Name"
                        onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })}
                        value={name}
                        errors={errors}
                    />


                    {!edit &&
                        <Datalist
                            type="text"
                            iconCode='&#xf175;'
                            placeholder="Enter The School Name Here"
                            name="schoolName"
                            id="schoolName"
                            value={schoolName}
                            options={
                                !!schools.length ? schools.map((school) => {
                                    return {
                                        name: school.SchoolName,
                                        value: school._id
                                    }
                                }) : [{ name: "Please Wait While List Is Getting", value: "Select" }]
                            }
                            onChange={(ev) => this.fetchTeachers(ev.target.value)}
                            errors={errors}
                        />
                    }
                    <Datalist
                        type="text"
                        iconCode='&#xf175;'
                        placeholder="Enter The Class Teacher Name Here"
                        name="teacherName"
                        id="teacherName"
                        value={teacherName}
                        options={
                            !!teachers.length ? teachers.map((teacher) => {
                                return {
                                    name: teacher.SchoolName,
                                    value: teacher.idNo
                                }
                            }) : empty ? [{ name: "No Teacher Found", value: "Select" }]
                                    : [{ name: "Please Wait While List Is Getting", value: "Select" }]
                        }
                        onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })}
                        errors={errors}
                    />

                    <div className="add-student-group">
                        <ul>
                            <h3>
                                <i>Selected Students</i>
                            </h3>


                            {students.map((student, index) => {
                                return (
                                    <li key={student._id}>
                                        <center>
                                            {student.name ? student.name : student.studentName}
                                            <div>
                                                <button onClick={() => this.removeStudent(index)} className="my-table-btn">
                                                    Remove
                                            </button>
                                            </div>
                                        </center>
                                    </li>
                                )
                            })}
                        </ul>

                        <ul>
                            <h3>
                                <i>Available Students</i>
                            </h3>
                            {studentsFetch.map((student, index) => {
                                if (!student.classId) {
                                    return (
                                        <li key={student._id}>
                                            <center>
                                                {student.name || student.studentName}
                                                <div>
                                                    <button onClick={() => this.addStudent(index)} className="my-table-btn">
                                                        Add
                                            </button>
                                                </div>
                                            </center>
                                        </li>
                                    )
                                }
                            })}
                        </ul>
                    </div>
                    <button type="submit" className="my-btn-submit">Add Class</button>
                </form>
            </div >
        )
    }
}
export default SchoolForm;