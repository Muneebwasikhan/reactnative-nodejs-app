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
       
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            isLoading: nextProps.isLoading,
            errMsg: nextProps.errMsg
        }
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
    

    render() {
        const { options  } = this.state;
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
                                <Link to="" onClick={(ev) => this.changeMenu(ev, "new")}>Activities</Link>
                            </div>
                            {
                                <Collapse in={options.new}>
                                    <ul id="sidebar-inner-ul">
                                        <li className="sidebar-inner-li">
                                            <div className="group-link">
                                                <i className="fa fa-circle"></i>
                                                <Link to="sellers">Sellers</Link>
                                            </div>
                                        </li>
                                    </ul>
                                </Collapse>
                            }
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
        errMsg: state.DataFetchReducer.errMsg,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getData: (data) => { dispatch(DataFetchMiddleware.dataFetch(data)) },
        showData: (data, wts) => { dispatch(DataFetchMiddleware.dataShowMiddleware(data, wts)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidebar));