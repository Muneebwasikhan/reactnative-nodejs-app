import React, { Component } from "react";
import { Input, Datalist } from "../input/input"
import Path from "../../config/path";
import { validateForm } from "./helper";

class TeacherForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adminData: JSON.parse(localStorage.getItem("AdminData")),
            name: "Irfan Ali",
            address: "fx 151 block x",
            email: "irfanali.17899@gmail.com",
            phoneNumber: "03471674062",
            dob: "",
            gender: "male",
            emergencyNumber: "03471674062",
            schoolName: "my school",
            userName: "IrfanAli17899",
            password: "123456",
            schools: [],
            schoolId: "",
            success: false,
            errors: {
                hasError: false,
                errorsObj: {},
                serverError: ""
            }
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
                console.log(this.state.adminData.databaseToken);

                if (!res.success) {
                    this.setState({ serverError: res.message })
                    return;
                }
                console.log(res);

                this.setState({ schools: res.data, schoolId: res.data[0]._id })
            }).catch(err => {
                console.log(err);
            })
    }

    componentWillMount() {
        if (this.props.location.state) {

            const { teacherId } = this.props.location.state;
            var { errors } = this.state;
            if (this.props.location.state.teacherId) {
                fetch(Path.BASE_URL + "/admin/teacher/getteacher", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        idNo: teacherId,
                        databaseToken: this.state.adminData.databaseToken
                    })
                }).then(data => data.json())
                    .then(res => {
                        console.log(res)
                        if (!res.success) {
                            errors.serverError = res.message;
                            this.setState({ errors, success: false })
                            return;
                        }
                        errors.serverError = "";
                        console.log(res.data);

                        this.setState({
                            ...res.data,
                            password: "",
                            edit: true
                        })
                        console.log(res);
                    }).catch(err => {
                        console.log(err);
                    })



            }
        }
    }


    onSubmit = (ev) => {
        ev.preventDefault();
        const { edit, errors, name, userName, password, schools, address, email, schoolName, gender, phoneNumber, emergencyNumber, dob, adminData, _id } = this.state;

        var validate = validateForm({
            name,
            userName,
            password: !edit ? password : password || "123456",
            address,
            email,
            schoolName,
            gender,
            phoneNumber,
            emergencyNumber,
            dob
        });
        if (validate.hasError) {
            window.scrollTo(0, 0)
            this.setState({ errors: validate });
            return
        }
        var body = edit ? {
            databaseToken: adminData.databaseToken,
            data: {
                name,
                address,
                phoneNumber,
                emergencyNumber,
                gender,
                email
            },
            _id
        } : {
                databaseToken: adminData.databaseToken,
                data: {
                    name,
                    userName,
                    password,
                    address,
                    email,
                    gender,
                    phoneNumber,
                    emergencyNumber,
                    dob
                }
            }
        if (!edit) {
            var school = schools.filter((item) => {
                return item.SchoolName.toLowerCase().indexOf(schoolName.toLowerCase()) === 0;
            })
            if (school[0]) {
                body.data.schoolId = school[0]._id;

            }
        }
        if (edit && password) {
            body.password = true;
            body.data.password = password;
        }
        fetch(Path.BASE_URL + `/admin/teacher/${edit ? "edit" : "add"}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(resObj => resObj.json())
            .then(res => {
                if (!res.success) {
                    errors.serverError = res.message || res.error;
                    this.setState({ errors, success: false })
                    return;
                }
                this.setState({ errors: { hasError: false, errorsObj: {}, serverError: "" }, success: true, name: "", userName: "", password: "", address: "", email: "", schoolId: "", gender: "", phoneNumber: "", emergencyNumber: "", dob: "" });
                document.getElementById("form").reset();
                this.props.history.push("/add-parent");

            }).catch(err => {
                console.log(err);
            })
    }

    render() {
        const { edit, name, userName, success, password, address, email, schoolName, gender, schools, phoneNumber, emergencyNumber, dob,
            errors } = this.state;

        return (
            <div id="Add-School-Form-Container">

                <h3 className="normal-heading">
                    <i>Add Teacher</i>
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
                        id="name"
                        type="text"
                        iconCode='&#xf203;'
                        placeholder="Enter The Teacher Name Here"
                        onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })}
                        value={name}
                        errors={errors}
                    />
                    {!edit && <Input
                        name="userName"
                        id="userName"
                        iconCode='&#xf1ff;'
                        type="text"
                        placeholder="Enter The Teacher Username Here"
                        onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })}
                        value={userName}
                        errors={errors}
                    />}
                    <Input
                        name="email"
                        id="email"
                        iconCode='&#xf15a;'
                        type="email"
                        placeholder="Enter The Teacher Email Address Here"
                        onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })}
                        value={email}
                        errors={errors}
                    />
                    <Input
                        name="password"
                        id="password"
                        type="password"
                        iconCode='&#xf191;'
                        required={edit}
                        placeholder="Enter The Teacher Password Here"
                        onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })}
                        value={password}
                        errors={errors}
                    />
                    {!edit && <Datalist

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
                    />}
                    <Input
                        name="address"
                        id="address"
                        iconCode='&#xf200;'
                        type="text"
                        placeholder="Enter Teacher's Address Here"
                        onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })}
                        value={address}
                        errors={errors}
                    />


                    <Input
                        name="phoneNumber"
                        id="phoneNumber"
                        iconCode='&#xf2be;'
                        type="text"
                        placeholder="Enter The Teacher Phone Number Here"
                        onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })}
                        value={phoneNumber}
                        errors={errors}
                    />

                    <Input
                        name="emergencyNumber"
                        id="emergencyNumber"
                        type="text"
                        iconCode='&#xf2bb;'
                        placeholder="Enter The Teacher's Emergency Number Here"
                        onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })}
                        value={emergencyNumber}
                        errors={errors}
                    />

                    <Input
                        name="dob"
                        id="dob"
                        label="Teacher Date Of Birth"
                        type="date"
                        iconCode='&#xf32e;'
                        onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })}
                        value={dob}
                        errors={errors}
                    />
                    <div id="Gender-Wrapper">
                        <strong>Gender</strong>
                        {errors.errorsObj["gender"] ?
                            <p className="error text-left" >{errors.errorsObj["gender"].message}</p> : <br />
                        }
                        <br />
                        <input
                            type="radio"
                            name="gender"
                            checked={gender === "male"}
                            onChange={() => { }}
                            onClick={(ev) => this.setState({ [ev.target.name]: ev.target.id })}
                            id="male" />
                        <label htmlFor="male">
                            Male</label>
                        <input type="radio"
                            name="gender"
                            checked={gender === "female"}
                            onChange={() => { }}
                            onClick={(ev) => this.setState({ [ev.target.name]: ev.target.id })}
                            id="female" />
                        <label htmlFor="female">Female</label>
                    </div>
                    <button type="submit" className="my-btn-submit">{edit ? "Edit Teacher" : "Add Teacher"}</button>
                </form>
            </div>
        )
    }
}
export default TeacherForm;