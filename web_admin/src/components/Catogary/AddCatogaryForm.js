import React, { Component } from "react";
import { Input } from "../input/input"
import Path from "../../config/path";
import "./addCategory.css";


class CategoryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adminData: JSON.parse(localStorage.getItem("AdminData")),
            name: "",
            success: false,
            errors: {
                hasError: false,
                errorsObj: {},
                serverError: ""
            }
        }
    }


    onSubmit = (ev) => {
        ev.preventDefault();
        const { name, adminData, errors } = this.state;


        var body = {
            databaseToken: adminData.databaseToken,
            name
        }

        fetch(Path.BASE_URL + `/admin/category/add`, {
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
                this.setState({ errors: { hasError: false, errorsObj: {}, serverError: "" }, success: true, name: "" });
            }).catch(err => {
                console.log(err);
            })
    }

    render() {
        const { name, success, errors } = this.state;

        return (
            <div id="Add-School-Form-Container">

                <h3 className="normal-heading"><i>Add Category</i></h3>
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
                        placeholder="Enter The Category Name Here"
                        onChange={(ev) => this.setState({ [ev.target.name]: ev.target.value })}
                        value={name}
                        errors={errors}
                    />
                    <button type="submit" className="my-btn-submit">Add Category</button>
                </form>
            </div>
        )
    }
}
export default CategoryForm;