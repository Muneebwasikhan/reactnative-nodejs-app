import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import AdminLogin from "./components/AdminLogin/AdminLogin"
import SchoolForm from "./components/School/AddSchoolForm"
import TeacherForm from "./components/Teacher/AddTeacherForm"

import ClassForm from "./components/Class/AddClassForm"

import StudentForm from "./components/Student/AddStudentForm"
import ParentForm from "./components/Parent/AddParentForm"


import Dashboard from "./components/Dashboard/Dashboard"
import SideBar from "./components/Sidebar/Sidebar"

import DataShow from "./components/DataShow/DataShow";
import Navbar from "./components/Navbar/Navbar";




class Routes extends Component {
    render() {
        const isLoggedIn = localStorage.getItem("AdminData");
        return (
            <BrowserRouter>
                <div className="conatiner-fluid main-page" >
                    {isLoggedIn && <Navbar />}
                    <div className="row main-route-row">
                        {isLoggedIn &&
                            <SideBar />
                        }
                        <div className={isLoggedIn ? "col-sm-9 main-route-tab" : "col-sm-12 main-route-tab"}>
                            <Switch>
                                <Route exact path="/" component={AdminLogin} />
                                <PrivateRoute path="/dashboard" component={Dashboard} />
                                <PrivateRoute path="/add-school" component={SchoolForm} />
                                <PrivateRoute path="/add-teacher" component={TeacherForm} />
                                <PrivateRoute path="/add-class" component={ClassForm} />
                                <PrivateRoute path="/add-student" component={StudentForm} />
                                <PrivateRoute path="/add-parent" component={ParentForm} />
                                <PrivateRoute path="/datashow" component={DataShow} />
                            </Switch>
                        </div>
                    </div>
                </div>

            </BrowserRouter>
        )
    }
}



function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => localStorage.getItem("AdminData")
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
        />
    )
}



export default Routes