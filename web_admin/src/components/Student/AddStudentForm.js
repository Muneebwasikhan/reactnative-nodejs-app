import React, { Component } from "react";
import { Input, Datalist } from "../input/input"
import Path from "../../config/path";
import { validateForm } from "./helper";

class SchoolForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adminData: JSON.parse(localStorage.getItem("AdminData")),
            name: "",
            dob: "",
            gender: "",
            schools: [],
            parents: [],
            schoolId: "",
            parentName: "",
            schoolName: "",
            parentId: "",
            errors: {
                hasError: false,
                errorsObj: {},
                serverError: ""
            },
            success: false
        }

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

                if (!res.success) {
                    this.setState({ serverError: res.message })
                    return;
                }
                console.log(res);

                this.setState({ schools: res.data, schoolId: res.data[0]._id })
            }).catch(err => {
                console.log(err);
            })

        fetch(Path.BASE_URL + "/admin/parent/getall", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                databaseToken: this.state.adminData.databaseToken
            })
        }).then(resObj => resObj.json())
            .then((res) => {

                if (!res.success) {
                    this.setState({ serverError: res.message })
                    return;
                }
                console.log(res);

                this.setState({ parents: res.data })
            }).catch(err => {
                console.log(err);
            })
    }

    onSubmit = (ev) => {
        ev.preventDefault();
        const { name, dob, schoolId, parentId, gender, errors, edit, _id, parents, parentName, schools, schoolName } = this.state;
        var validate = validateForm({
            schoolName,
            parentName,
            name,
            dob,
            gender,
        });
        if (validate.hasError) {
            window.scrollTo(0, 0)
            this.setState({ errors: validate });
            return
        }
        console.log(name, dob, schoolId, parentId, gender);
        var body = edit ? {
            data: {
                name,
                dob,
                gender
            },
            _id,
            databaseToken: this.state.adminData.databaseToken,
        } : {
                data: {

                    name,
                    dob,
                    schoolId,
                    parentId,
                    gender
                },
                databaseToken: this.state.adminData.databaseToken
            }
        if (!edit) {
            var parent = parents.filter((item) => {
                return item.userName.toLowerCase().indexOf(parentName.toLowerCase()) === 0;
            })
            var school = schools.filter((item) => {
                return item.SchoolName.toLowerCase().indexOf(schoolName.toLowerCase()) === 0;
            })
            if (parent[0] && school[0]) {
                body.data.parentId = parent[0].idNo;
                body.data.studentId = school[0]._id;
            }
            

        }

        fetch(Path.BASE_URL + `/admin/student/${edit ? "edit" : "add"}`, {
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
                this.setState({ errors: { hasError: false, errorsObj: {}, serverError: "" }, success: true, name: "", dob: "", parentId: "", parentName: "", schoolName: "", gender: "" });
                document.getElementById("form").reset();
                this.props.history.push("/add-class");
                console.log(res);
            }).catch(err => {
                console.log(err);
            })

    }

    componentWillMount() {
        console.log("componentWillMount");
        if (this.props.location.state) {

            const { student } = this.props.location.state;
            var { errors } = this.state;
            if (this.props.location.state.student) {
                fetch(Path.BASE_URL + "/admin/student/getstudent", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        idNo: student.idNo,
                        databaseToken: this.state.adminData.databaseToken
                    })
                }).then(data => data.json())
                    .then(res => {
                        console.log(res)
                        if (!res.success) {
                            errors.serverError = res.message||res.error;
                            this.setState({ errors, success: false })
                            return;
                        }
                        errors.serverError = "";
                        console.log(res.data);

                        this.setState({
                            name: res.data.name,
                            dob: res.data.dob,
                            gender: res.data.gender,
                            edit: true,
                            _id: res.data._id
                        })
                        console.log(res);
                    }).catch(err => {
                        console.log(err);
                    })



            }
        }
    }

    render() {
        const { name, schoolName, gender, schools, dob, parentId, parents, parentName,
            errors, success, edit } = this.state;
        console.log(parents);

        return (
            <div id="Add-School-Form-Container">

                <h3 className="normal-heading"><i>Add Student</i></h3>
                <form method="post" id="form" onSubmit={(ev) => this.onSubmit(ev)}>
                    {errors.serverError &&
                        <p className="error">{errors.serverError}</p>
                    }
                    {success && <div className="success-wrapper">
                        <p className="success">
                            Submit Successful
                        </p>
                    </div>}
                    <Input
                        name="name"
                        id="name"
                        iconCode='&#xf203;'
                        type="text"
                        placeholder="Enter The Student's Name Here"
                        onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })}
                        value={name}
                        errors={errors}
                    />
                    {!edit && <div>
                        <Datalist
                            type="text"
                            iconCode='&#xf200;'
                            placeholder="Enter The Parent Name Here"
                            name="parentName"
                            id="parentName"
                            value={parentName}
                            options={
                                parents.length ? parents.map((parent) => {
                                    return {
                                        name: parent.userName,
                                        value: parent._id
                                    }
                                }) : [{ name: "Please Wait While List Is Getting", value: "Select" }]
                            }
                            onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })}
                            errors={errors}
                        />
                        <Datalist
                            type="text"
                            iconCode='&#xf175;'
                            placeholder="Enter The School Name Here"
                            name="schoolName"
                            id="schoolName"
                            value={schoolName}
                            options={
                                schools.length ? schools.map((school) => {
                                    return {
                                        name: school.SchoolName,
                                        value: school._id
                                    }
                                }) : [{ name: "Please Wait While List Is Getting", value: "Select" }]
                            }
                            onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })}
                            errors={errors}
                        />
                    </div>
                    }

                    <Input
                        name="dob"
                        id="dob"
                        iconCode='&#xf32e;'
                        type="date"
                        onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })}
                        value={dob}
                        errors={errors}
                    />
                    <div id="Gender-Wrapper">
                        <strong>Gender</strong>
                        {errors.errorsObj["gender"] ?
                            <p className="error text-left" >{errors.errorsObj["gender"].message}</p> : <br />
                        }
                        <input
                            type="radio"
                            name="gender"
                            onClick={(ev) => this.setState({ [ev.target.name]: ev.target.id })}
                            id="male" />
                        <label htmlFor="male">
                            Male</label>
                        <input
                            type="radio"
                            name="gender"
                            onClick={(ev) => this.setState({ [ev.target.name]: ev.target.id })}
                            id="female" />
                        <label htmlFor="female">Female</label>
                    </div>
                    <button type="submit" className="my-btn-submit">{edit ? "Edit Student" : "Add Student"}</button>
                </form>
            </div>



        )
    }
}
export default SchoolForm;