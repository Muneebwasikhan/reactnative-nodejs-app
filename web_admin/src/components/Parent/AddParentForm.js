import React, { Component } from "react";
import { Input } from "../input/input"
import Path from "../../config/path";
import { validateForm } from "./helper";


class ParentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adminData: JSON.parse(localStorage.getItem("AdminData")),
            name: "",
            address: "",
            email: "",
            phoneNumber: "",
            dob: "",
            gender: "",
            userName: "",
            password: "",
            success: false,
            errors: {
                hasError: false,
                errorsObj: {},
                serverError: ""
            }
        }
    }
    componentWillMount() {
        if (this.props.location.state) {
            console.log(this.props.location.state);

            const { parentId } = this.props.location.state;
            var { errors } = this.state;
            if (this.props.location.state.parentId) {
                fetch(Path.BASE_URL + "/admin/parent/getparent", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        idNo: parentId,
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
        const { userName, password, errors, dob, address, _id, edit, gender, phoneNumber, name, email, adminData } = this.state;

        var validate = validateForm({
            name,
            userName,
            password: !edit ? password : password || "123456",
            address,
            email,
            gender,
            phoneNumber,
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
                gender,
                dob,
                email
            },
            _id
        } : {
                databaseToken: adminData.databaseToken,
                data: {
                    userName, password, dob, address, gender, phoneNumber, name, email
                }
            }
        if (edit && password) {
            body.password = true;
            body.data.password = password;
        }
        fetch(Path.BASE_URL + `/admin/parent/${edit ? "edit" : "add"}`, {
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
                errors.serverError = "";
                this.setState({ errors: { hasError: false, errorsObj: {}, serverError: "" }, success: true, name: "", userName: "", password: "", address: "", email: "", gender: "", phoneNumber: "", dob: "" });
                document.getElementById("form").reset();
                this.props.history.push("/add-student");
            }).catch(err => {
                console.log(err);
            })
    }

    render() {
        const { name, userName, password, address, edit, email, gender, success, phoneNumber, dob,
            errors } = this.state;

        return (
            <div id="Add-School-Form-Container">

                <h3 className="normal-heading"><i>Add Parent</i></h3>
                <form method="post" onSubmit={(ev) => this.onSubmit(ev)}>
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
                        placeholder="Enter The Parent's Name Here"
                        onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })}
                        value={name}
                        errors={errors}
                    />
                    {!edit && <Input
                        name="userName"
                        id="userName"
                        iconCode='&#xf1ff;'
                        type="text"
                        placeholder="Enter The Parent's Username Here"
                        onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })}
                        value={userName}
                        errors={errors}
                    />}
                    <Input
                        name="email"
                        id="email"
                        iconCode='&#xf15a;'
                        type="email"
                        placeholder="Enter The Parent's Email Address Here"
                        onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })}
                        value={email}
                        errors={errors}
                    />
                    <Input
                        name="password"
                        id="password"
                        iconCode='&#xf191;'
                        type="password"
                        required={edit}
                        placeholder="Enter The Parent's Password Here"
                        onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })}
                        value={password}
                        errors={errors}
                    />

                    <Input
                        name="address"
                        id="address"
                        iconCode='&#xf200;'
                        type="text"
                        placeholder="Enter Teacher's Address"
                        onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })}
                        value={address}
                        errors={errors}
                    />


                    <Input
                        name="phoneNumber"
                        id="phoneNumber"
                        iconCode='&#xf2be;'
                        type="text"
                        placeholder="Enter The Parent's Phone Number"
                        onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })}
                        value={phoneNumber}
                        errors={errors}
                    />



                    <Input
                        name="dob"
                        id="dob"
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
                    <button type="submit" className="my-btn-submit">Add Parent</button>
                </form>
            </div>
        )
    }
}
export default ParentForm;