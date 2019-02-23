import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux";
import DataFetchMiddleware from "../../Store/Middlewares/DataFetchMiddleware/DataFetchMiddleware"
import "./Sidebar.css";
import Path from "../../config/path";
import { Collapse } from "react-bootstrap"


class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adminData: JSON.parse(localStorage.getItem("AdminData")),
            options: {
                new: false,
                openSchools: {}
            },
            schoolIndex: "",
            errors: {
                hasError: false,
                errorsObj: {},
                serverError: ""
            },
            keyword: "",
            fetch: false,
        }
    }
    componentDidMount() {
        this.props.getData({
            get: "mySchools"
        })
    }
    getClass = (id) => {
        this.props.getData({
            get: "classes",
            schoolId: id
        })
        this.setState({
            schoolClassesToShow: id
        })
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            mySchools: nextProps.mySchools,
            isLoading: nextProps.isLoading,
            classes: nextProps.classes,
            errMsg: nextProps.errMsg
        }
    }
    getAllStudents = (id) => {
        const user = JSON.parse(localStorage.getItem("AdminData"));
        let { errorMsg } = this.state;

        fetch(Path.GET_STUDENTS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                databaseToken: user.databaseToken,
                schoolId: id
            })
        }).then(resObj => resObj.json())

            .then((res) => {
                if (!res.success) {
                    errorMsg = res.message;
                    this.setState({ errorMsg })
                    return;
                }

                this.props.history.push({ pathname: "/dataShow", state: { dataToBeShow: res.data, edit: "students" } })
            }).catch((err) => {
                console.log(err);
                errorMsg = "Something Went Wrong";
                this.setState({ errorMsg })
            })
    }


    changeMenu = (ev, link) => {
        ev.preventDefault();
        const { options } = this.state;
        var newObj = { ...options };
        delete newObj[link]
        Object.keys(newObj).map((key) => {
            newObj[key] = false
        })
        newObj[link] = !options[link]
        this.setState({ options: newObj })
    }
    searchSchool = (ev) => {
        const { mySchools } = this.state;
        let searchSchools = mySchools ? mySchools.filter((item) => {
            return item.SchoolName.toLowerCase().indexOf(ev.target.value.toLowerCase()) !== -1
        }) : []
        this.setState({
            searchSchools,
            keyword: ev.target.value
        })
    }

    render() {
        const { options, mySchools, searchSchools, classes, schoolClassesToShow, errors, keyword } = this.state;
        const finalScools = keyword ? searchSchools : mySchools;
        return (
            <div className="col-sm-3 side-menu-list">
                <div id="sidebar-list-wrapper">
                    <ul id="sidebar-parent-list">
                        <li className={`sidebar-parent-li`}>
                            <div className="group-link">
                                <i className="fa fa-refresh"></i>
                                <a href="" onClick={(ev) => { ev.preventDefault(); this.setState({ refresh: !this.state.refresh, keyword: "" }) }}>Refresh</a>
                            </div>
                        </li>
                        <li className={`sidebar-parent-li ${options.new ? 'active-main-tab' : "non-active-tab"}`}>
                            <div className="group-link">
                                <i className="fa fa-plus-circle"></i>
                                <Link to="" onClick={(ev) => this.changeMenu(ev, "new")}>New School</Link>
                            </div>
                            {
                                <Collapse in={options.new}>
                                    <ul id="sidebar-inner-ul">
                                        <li className="sidebar-inner-li">
                                            <div className="group-link">
                                                <i className="fa fa-circle"></i>
                                                <Link to="add-school">School</Link>
                                            </div>
                                        </li>
                                        <li className="sidebar-inner-li">
                                            <div className="group-link">
                                                <i className="fa fa-circle"></i>
                                                <Link to="add-teacher">Teacher</Link>
                                            </div>
                                        </li>
                                        <li className="sidebar-inner-li">
                                            <div className="group-link">
                                                <i className="fa fa-circle"></i>
                                                <Link to="add-parent">Parent</Link>
                                            </div>
                                        </li>
                                        <li className="sidebar-inner-li">
                                            <div className="group-link">
                                                <i className="fa fa-circle"></i>
                                                <Link to="add-student">Student</Link>
                                            </div>
                                        </li>
                                        <li className="sidebar-inner-li">
                                            <div className="group-link">
                                                <i className="fa fa-circle"></i>
                                                <Link to="add-class">Class</Link>
                                            </div>
                                        </li>
                                    </ul>
                                </Collapse>
                            }
                        </li>


                        <li className={`sidebar-parent-li ${options.mySchools ? 'active-main-tab' : "non-active-tab"}`}>
                            <div className="group-link">
                                <i className="fa fa-home" ></i>
                                <Link to="" onClick={(ev) => this.changeMenu(ev, "mySchools")}> My Schools</Link>
                            </div>
                            <Collapse in={options.mySchools}>
                                <ul id="sidebar-inner-ul">
                                    <li className="sidebar-inner-li">
                                        <div className="group-link search-school">
                                            <i className="fa fa-search" ></i>
                                            <input
                                                type="text"
                                                name="keyword"
                                                id="keyword"
                                                autoComplete="off"
                                                value={keyword}
                                                placeholder="Search School"
                                                onChange={(ev) => this.searchSchool(ev)}
                                            />
                                        </div>
                                    </li>
                                    {finalScools &&
                                        finalScools.map((school, index) => {
                                            return (<li key={school._id} onClick={() => this.getClass(school._id)} className="sidebar-inner-li">
                                                <div className="group-link">
                                                    <i className="fa fa-circle"></i>
                                                    <Link to={{ pathname: "/datashow", state: { dataToBeShow: school, edit: "school" } }}  >{school.SchoolName}</Link>
                                                </div>
                                                <ul id="sidebar-inner-ul">
                                                    {
                                                        schoolClassesToShow === school._id && classes && classes.map((myClass) => {
                                                            return (<li onClick={(ev) => this.changeMenu(ev, "")} key={myClass._id} className="sidebar-inner-li">
                                                                <Link to={{ pathname: "/datashow", state: { dataToBeShow: myClass, edit: "class" } }} >{myClass.name}</Link>
                                                            </li>)
                                                        })}
                                                    <div className="group-link">
                                                        <i className=""></i>
                                                        <Link to=""><li onClick={(ev) => this.getAllStudents(school._id)} key={""} className="sidebar-inner-li">
                                                            See All Students
                                            </li></Link>
                                                    </div>

                                                </ul>
                                            </li>)
                                        })
                                    }
                                </ul>
                            </Collapse>
                        </li>

                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        isLoading: state.DataFetchReducer.isLoading,
        mySchools: state.DataFetchReducer.mySchools,
        errMsg: state.DataFetchReducer.errMsg,
        classes: state.DataFetchReducer.classes
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getData: (data) => { dispatch(DataFetchMiddleware.dataFetch(data)) },
        showData: (data, wts) => { dispatch(DataFetchMiddleware.dataShowMiddleware(data, wts)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidebar));