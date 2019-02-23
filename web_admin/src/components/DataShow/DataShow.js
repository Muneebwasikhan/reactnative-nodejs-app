
import React, { Component } from 'react';
import { connect } from "react-redux";
import Path from "../../config/path"
import { Collapse } from "react-bootstrap"
import { Input } from '../input/input';
class DataShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: "",
            success: "",
            teachers: [],
            errors: {
                hasError: false,
                errorsObj: {}
            },
            searchTeacher: "",
            searchStudent: "",
            hideTeachers: true,
            hideSchools: true,
            hideStudents: true,
        }

    }

    componentWillReceiveProps() {
        if (this.props.location.state) {
            const { dataToBeShow, edit } = this.props.location.state;
            console.log(dataToBeShow);

            this.setState({  dataToBeShow, edit })
            const { errorMsg } = this.state;
            const user = JSON.parse(localStorage.getItem("AdminData"))
            if (edit === "school") {
                console.log(Path.GET_TEACHERS);

                fetch(Path.GET_TEACHERS, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        databaseToken: user.databaseToken,
                        schoolId: dataToBeShow._id
                    })
                }).then(resObj => resObj.json())

                    .then((res) => {
                        console.log(res);
                        if (!res.success) {
                            errorMsg = res.message;
                            this.setState({ errorMsg })
                            return;
                        }
                        this.setState({ teachers: res.data })
                    }).catch((err) => {
                        console.log(err);
                        errorMsg = "Something Went Wrong";
                        this.setState({ errorMsg })
                    })
            }

        }
    }
    editDataRoute = (wte, index) => {
        const { dataToBeShow, edit } = this.props.location.state;
        switch (wte) {
            case "school":
                console.log('school')
                this.props.history.push({ pathname: "/add-school", state: { data: dataToBeShow }, edit })
                break;
            case "student":
                var { students } = this.props.location.state.dataToBeShow;
                this.props.history.push({ pathname: "/add-student", state: { student: students[index], studentClass: this.props.location.state.dataToBeShow }, edit })
                break;
            case "teacher":
                var { teacherId } = this.props.location.state.dataToBeShow;
                this.props.history.push({ pathname: "/add-teacher", state: { teacherId }, edit })
                break;
            case "class":
                this.props.history.push({ pathname: "/add-class", state: { dataToBeShow }, edit })
                break;
            case "parent":
                this.props.history.push({ pathname: "/add-parent", state: { parentId: index }, edit: "parent" })
            default:
                break;
        }
    }
    delete = (wtd, id) => {
        var adminData = JSON.parse(localStorage.getItem("AdminData"));
        const { dataToBeShow, edit } = this.props.location.state;
        let { errorMsg } = this.state;
        var body = {
            databaseToken: adminData.databaseToken
        }
        switch (wtd) {
            case "school":
                body.schoolId = id
                break;
            case "teacher":
                body.idNo = id
                break;
            case "class":
                body.classId = id
                break;
            case "student":
                console.log("idNo", id);

                body.idNo = id
                break;
            default:
                break;
        }
        fetch(Path.BASE_URL + `/admin/${wtd}/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(resObj => resObj.json())
            .then((res => {
                console.log(res);

                if (!res.success) {
                    console.log(res);
                    errorMsg = res.message;
                    this.setState({ errorMsg })
                    return;
                }
                errorMsg = "";
                this.setState({ errorMsg, success: "Submitted Succesfully", dataToBeShow: {} });
                window.location.pathname = "/dashboard";

            }))
    }
    searchTeacher = (ev) => {
        const { teachers } = this.state;
        let searchTeachers = teachers ? teachers.filter((item) => {
            return item.name.toLowerCase().indexOf(ev.target.value.toLowerCase()) !== -1
        }) : []
        this.setState({
            searchTeachers,
            searchTeacher: ev.target.value
        })
    }
    searchStudent = (ev) => {
        const { dataToBeShow, edit } = this.state;
        let searchStudents = dataToBeShow && edit === "students" ? dataToBeShow.filter((item) => {
            return (
                item.name.toLowerCase().indexOf(ev.target.value.toLowerCase()) !== -1
                || item.parentName.toLowerCase().indexOf(ev.target.value.toLowerCase()) !== -1
            )
        }) : []
        this.setState({
            searchStudents,
            searchStudent: ev.target.value
        })
    }
    render() {
        if (this.props.location.state) {
            var { dataToBeShow, edit } = this.props.location.state;
        }
        const { errorMsg, success, teachers, searchTeacher, searchTeachers, searchStudent, searchStudents } = this.state;
        const finalTeachers = searchTeacher ? searchTeachers : teachers;
        const finalStudents = searchStudent ? searchStudents : dataToBeShow;
        console.log(finalStudents);



        return (<div>
            {errorMsg && <div className="error-wrapper">
                <p className="error">{errorMsg}</p>
            </div>}
            {success && <div className="success-wrapper">
                <p className="success">
                    Submit Successful
                        </p>
            </div>}
            {
                edit === "school" && dataToBeShow && <div className="mt-2" >

                    <section className="panel">
                        <header className="panel-heading">
                            <div className="panel-actions">
                                <a href="" onClick={(ev) => { ev.preventDefault(); this.setState({ hideSchools: !this.state.hideSchools }) }} className="fa fa-caret-down"></a>
                            </div>
                            <h2 className="panel-title">{dataToBeShow.SchoolName}</h2>
                        </header>
                        <Collapse in={this.state.hideSchools} >
                            <div className="panel-body">
                                <div className="table-responsive">
                                    <table className="table table-striped mb-none">
                                        <tbody>
                                            <tr>
                                                <th>Email</th>
                                                <td>{dataToBeShow.email}</td>
                                                <th>School Address</th>
                                                <td>{dataToBeShow.address}</td>
                                            </tr>
                                            <tr>
                                                <th>School Website</th>
                                                <td>{dataToBeShow.schoolWebsite}</td>
                                                <th>Phone Number</th>
                                                <td>{dataToBeShow.phoneNumber}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Collapse>
                    </section>
                    {
                        !!teachers.length &&
                        <div>
                            <section className="panel">
                                <header className="panel-heading">
                                    <div className="panel-actions">
                                        <a href="" onClick={(ev) => { ev.preventDefault(); this.setState({ hideTeachers: !this.state.hideTeachers }) }} className="fa fa-caret-down"></a>
                                    </div>
                                    <h2 className="panel-title">Teachers</h2>
                                </header>
                                <Collapse in={this.state.hideTeachers}>
                                    <div className="panel-body  ">
                                        <div className="col-sm-12 search-teacher" >
                                            <i className="fa fa-search"></i>
                                            <input
                                                type="text"
                                                onChange={(ev) => this.searchTeacher(ev)}
                                                value={searchTeacher}
                                                name="searchTeacher"
                                                id="searchTeacher"
                                                placeholder="Search Teacher" />
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-striped mb-none">
                                                <tbody>
                                                    {finalTeachers.map(((teacher, index) => {
                                                        return (
                                                            <tr key={index} className="teachers-row">
                                                                <th className="my-table-border"><center className="teacher-name">{teacher.userName}</center></th>
                                                                <th className="my-table-border">
                                                                    <center className="my-table-span" >
                                                                        <button className="my-table-btn" onClick={() => this.delete("teacher", teacher.idNo)} >Delete</button>
                                                                    </center>
                                                                </th>
                                                            </tr>
                                                        )
                                                    }))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </Collapse>
                            </section>
                        </div>
                    }
                    <center>
                        <button className="my-table-btn school-btn" onClick={() => this.editDataRoute("school", dataToBeShow["_id"])} >Edit School</button>
                        <button className="my-table-btn school-btn" onClick={() => this.delete("school", dataToBeShow["_id"])} >Delete School</button>
                    </center>
                </div>


            }
            {
                edit === "class" && dataToBeShow && <div>
                    <table className="table">
                        <tbody>
                            <tr><th className="th-heading">Class Name</th><td>{dataToBeShow.name}</td></tr>
                            <tr><th className="th-heading">School Name</th><td>{dataToBeShow.schoolName}</td></tr>
                            <tr><th className="th-heading">Teacher Name</th><td>{dataToBeShow.teacherName}</td></tr>
                            <tr><th className="th-heading">Class ID</th><td>{dataToBeShow.classId}</td></tr>
                            <tr><th className="th-heading">Students</th><td></td></tr>
                            {dataToBeShow.students.map((student, studentIndex) => {
                                return <tr key={studentIndex}>
                                    <th className="th-heading">{student.studentName}</th>
                                    <td> <button onClick={() => this.editDataRoute("student", studentIndex)} >Edit</button>
                                        <button onClick={() => this.delete("student", student.idNo)} >Delete</button></td>
                                </tr>

                            })}
                        </tbody>
                    </table>
                    <button onClick={() => this.editDataRoute("teacher", dataToBeShow["teacherId"])} >Edit Teacher</button>
                    <button onClick={() => this.editDataRoute("class", dataToBeShow["classId"])} >Edit Class</button>
                    <br />
                    <button onClick={() => this.delete("class", dataToBeShow["classId"])} >Delete Class</button>
                </div>
            }
            {
                edit === "students" && dataToBeShow &&
                <div className="my-3" >
                    <section className="panel">
                        <header className="panel-heading">
                            <div className="panel-actions">
                                <a href="" onClick={(ev) => { ev.preventDefault(); this.setState({ hideStudents: !this.state.hideStudents }) }} className="fa fa-caret-down"></a>
                            </div>
                            <h2 className="panel-title">Students</h2>
                        </header>
                        <Collapse in={this.state.hideStudents} >
                            <div className="panel-body">
                                <div className="col-sm-12 search-teacher" >
                                    <i className="fa fa-search"></i>
                                    <input
                                        type="text"
                                        onChange={(ev) => this.searchStudent(ev)}
                                        value={searchStudent}
                                        name="searchStudent"
                                        id="searchStudent"
                                        placeholder="Search Student or Parent" />
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-striped mb-none">
                                        <tbody>
                                            <tr><th>Student Name</th><th>Parent Name</th><th>Class Id</th><th>Delete</th><th>Edit Parent</th></tr>
                                            {finalStudents.map((student, index) => {
                                                return <tr key={index}>
                                                    <td>{student.name}</td>
                                                    <td>{student.parentName}</td>
                                                    <td>{student.classId}</td>
                                                    <th>
                                                        <button className="my-table-btn" onClick={() => this.delete("student", student["idNo"])} >Delete</button>
                                                    </th>
                                                    <th>
                                                        <button className="my-table-btn" onClick={() => this.editDataRoute("parent", student["parentId"])} >Edit Parent</button>
                                                    </th>
                                                </tr>

                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Collapse>
                    </section>
                </div>
            }
        </div>);
    }
}
function mapStateToProps(state) {
    return {
        isLoading: state.DataFetchReducer.isLoading,
        dataToBeShow: state.DataFetchReducer.dataToBeShow
    }
}

export default connect(mapStateToProps, null)(DataShow);