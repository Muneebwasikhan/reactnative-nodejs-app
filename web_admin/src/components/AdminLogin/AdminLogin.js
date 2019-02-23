import React, { Component } from "react";
import { Input } from "../input/input"
import "./AdminLogin.css"
import Path from '../../config/path'
import logo from "../../Assets/logo.png";



class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            errors: {
                hasError: false,
                errorsObj: {},
                serverError: ""
            }
        }
        localStorage.getItem("AdminData") && this.props.history.push("/dashboard")
    }

    onSubmit = (ev) => {
        ev.preventDefault();
        const { userName, password, errors } = this.state;
        if (!userName || !password) {
            errors.serverError = "Please Provide Valid Credentials";
            this.setState({ errors })
            return;
        }
        fetch(`${Path.BASE_URL}/adminAuth`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userName,
                password
            })
        })
            .then(resObj => resObj.json())
            .then(res => {
                if (!res.success) {
                    errors.serverError = res.message;
                    this.setState({ errors })
                    return;
                }
                errors.serverError = "";
                this.setState({ errors })
                console.log(res);
                // localStorage.setItem("AdminData", JSON.stringify(res.data));
                localStorage.setItem("AdminData", JSON.stringify(res));
                window.location.reload();

            }).catch(err => {
                console.log(err);
                errors.serverError = "Something Went Wrong !!";
                this.setState({ errors })
            })
    }

    render() {
        const { userName, password, errors } = this.state;
        return (
            <div>
                <div className="limiter">
                    <div className="container-login100" >
                        <div className="wrap-login100" autoComplete="off" >
                            <form method="post" onSubmit={(ev) => this.onSubmit(ev)} className="login100-form validate-form">
                                <span className="login100-form-logo" >
                                    <img
                                        src={logo}
                                        width="80px"
                                        height="80px"
                                    />
                                </span>

                                <span className="login100-form-title p-b-34 p-t-27">
                                    Admin
					            </span>
                                {errors.serverError &&
                                    <p className="error">{errors.serverError}</p>
                                }
                                <Input
                                    name="userName"
                                    id="userName"
                                    type="text"
                                    iconCode="&#xf207;"
                                    placeholder="Username"
                                    onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })}
                                    value={userName}
                                    errors={errors}
                                />
                                <Input
                                    name="password"
                                    id="password"
                                    type="password"
                                    iconCode="&#xf191;"
                                    placeholder="Password"
                                    onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })}
                                    value={password}
                                    errors={errors}
                                />
                                <div className="container-login100-form-btn">
                                    <button type="submit" className="login100-form-btn">
                                        Login
						            </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default AdminLogin;