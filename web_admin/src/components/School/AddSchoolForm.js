import React, { Component } from "react";
import { Input } from "../input/input"
import "./School.css"
import Path from "../../config/path";
import { validateForm } from "./helper";
import DataFetchMiddleware from "../../Store/Middlewares/DataFetchMiddleware/DataFetchMiddleware";
import Store from "../../Store/Store";

class SchoolForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adminData: JSON.parse(localStorage.getItem("AdminData")),
            SchoolName: "my school",
            address: "flate 151 block x labour square",
            email: "irfanali.17899@gmail.com",
            phoneNumber: "03471674062",
            schoolWebsite: "www.fb.com",
            password: "",
            edit: false,
            success: false,
            errors: {
                hasError: false,
                errorsObj: {},
                serverError: ""
            }
        }
    }

    componentDidMount() {
        if (this.props.location.state) {

            const { data } = this.props.location.state;
            if (this.props.location.state.data) {
                console.log(data);
                this.setState({
                    SchoolName: data.SchoolName,
                    address: data.address,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    schoolWebsite: data.schoolWebsite,
                    edit: true,
                    data
                })

            }
        }
    }


    onSubmit = (ev) => {
        ev.preventDefault();
        const { SchoolName, password, data, address, edit, schoolWebsite, email, phoneNumber, errors, adminData } = this.state;
        console.log({
            SchoolName,
            address,
            email,
            password,
            phoneNumber,
            schoolWebsite,
        });

        var validate = validateForm({
            SchoolName,
            address,
            email,
            password: !edit ? password : password || "123456",
            phoneNumber,
            schoolWebsite,
        });
        if (validate.hasError) {
            window.scrollTo(0, 0)
            this.setState({ errors: validate });
            return
        }
        this.setState({
            errors: {
                hasError: false,
                errorsObj: {},
                serverError: ""
            }
        });

        var body = {
            databaseToken: adminData.databaseToken,

            data: {
                SchoolName,
                address,
                password,
                schoolWebsite,
                email,
                phoneNumber
            }
        }
        if (edit) {
            body.data._id = data._id;
        }
        if (edit && password) {
            body.password = true;
            body.data.password = password;
        }
        console.log(body);

        fetch(Path.BASE_URL + `/admin/school/${edit ? "edit" : "add"}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(resObj => resObj.json())
            .then(res => {
                console.log(res);

                if (!res.success) {
                    errors.serverError = res.message || res.error;
                    this.setState({ errors, success: false })
                    return;
                }
                edit ? Store.dispatch({ data: res.data, type: "EDIT_SCHOOL_IN_SIDEBAR" }) : Store.dispatch({ data: res.data, type: "ADD_SCHOOL_IN_SIDEBAR" })
                this.setState({ errors: { hasError: false, errorsObj: {}, serverError: "" }, SchoolName: "", edit: false, password: "", address: "", schoolWebsite: "", email: "", phoneNumber: "", success: true })
                console.log(res);
                this.props.history.push("/add-teacher");

            }).catch(err => {
                console.log(err);
            })
    }

    render() {
        const { schoolWebsite, SchoolName, phoneNumber, edit, email, address, errors, success, password } = this.state;
        console.log(this.props.location.state);

        return (
            <div id="Add-School-Form-Container">

                <h3 className="normal-heading">
                    <i>Add School</i>
                </h3>
                <form method="post" id="form" onSubmit={(ev) => {
                    this.onSubmit(ev)
                }}>
                    {errors.serverError &&
                        <p className="error">{errors.serverError}</p>
                    }
                    {success && <div className="success-wrapper">
                        <p className="success">
                            Submit Successful
                        </p>
                    </div>}
                    <Input
                        name="SchoolName"
                        id="SchoolName"
                        iconCode='&#xf203;'
                        type="text"
                        placeholder="Enter The School Name Here"
                        onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })}
                        value={SchoolName}
                        errors={errors}
                    />

                    <Input
                        name="email"
                        id="email"
                        label="Email"
                        iconCode='&#xf15a;'
                        type="email"
                        placeholder="Enter The Email Address Here"
                        onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })}
                        value={email}
                        errors={errors}
                    />
                    <Input
                        name="password"
                        id="password"
                        iconCode='&#xf191;'
                        type="password"
                        placeholder="Enter The Password Here"
                        onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })}
                        value={password}
                        errors={errors}
                    />

                    <Input
                        name="phoneNumber"
                        id="phoneNumber"
                        label="Phone Number"
                        iconCode='&#xf2be;'
                        type="text"
                        placeholder="Enter The  School Phone Number Here"
                        onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })}
                        value={phoneNumber}
                        errors={errors}
                    />
                    <Input
                        name="schoolWebsite"
                        id="schoolWebsite"
                        type="text"
                        iconCode="&#xf326;"
                        placeholder="Enter The School Website Here (optional)"
                        onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })}
                        value={schoolWebsite}
                        errors={errors}
                    />
                    <Input
                        name="address"
                        id="address"
                        label="School Adress"
                        type="text"
                        iconCode='&#xf200;'
                        placeholder="Enter School Address Here"
                        onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })}
                        value={address}
                        errors={errors}
                    />
                    <button type="submit" className="my-btn-submit">{edit ? "Edit School" : "Add School"}</button>
                </form>
            </div>
        )
    }
}
export default SchoolForm;