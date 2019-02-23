import React, { Component } from "react";
import { Collapse } from "react-bootstrap"
import Path from "../../config/path";


class SchoolForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adminData: JSON.parse(localStorage.getItem("AdminData")),
            sellers: [],
            hidesellers: true,
            errors: {
                hasError: false,
                errorsObj: {},
                serverError: ""
            },
            searchSeller: "",
            searchSellers: []
        }
    }

    componentDidMount() {
        var errorMsg = ""
        fetch(Path.GET_SELLERS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        }).then(resObj => resObj.json())
            .then((res) => {
                console.log(res);
                if (!res.success) {
                    errorMsg = res.message;
                    this.setState({ errorMsg })
                    return;
                }
                this.setState({ sellers: res.data })
            }).catch((err) => {
                console.log(err);
                errorMsg = "Something Went Wrong";
                this.setState({ errorMsg })
            })

    }


    performActions = (wtd, id, index) => {
        var adminData = JSON.parse(localStorage.getItem("AdminData"));
        let { errorMsg, sellers } = this.state;
        var body = {
            databaseToken: adminData.databaseToken,
            _id: id
        }

        fetch(Path.BASE_URL + `/admin/user/${wtd}`, {
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
                sellers[index] = res.data;
                // sellers.splice(index, 1)
                this.setState({ errorMsg, sellers });

            }))
    }



    searchSellers = (ev) => {
        const { sellers } = this.state;
        let searchSellers = sellers ? sellers.filter((item) => {
            return item.userName.toLowerCase().indexOf(ev.target.value.toLowerCase()) !== -1
        }) : []
        this.setState({
            searchSellers,
            searchSeller: ev.target.value
        })
    }

    render() {
        const { sellers, searchSeller, searchSellers } = this.state;
        console.log(this.props.location.state);
        const finalSellers = searchSeller ? searchSellers : sellers;

        return (
            <div id="Add-School-Form-Container">

                <div className="mt-5">
                    <section className="panel">
                        <header className="panel-heading">
                            <div className="panel-actions">
                                <a href="" onClick={(ev) => { ev.preventDefault(); this.setState({ hidesellers: !this.state.hidesellers }) }} className="fa fa-caret-down"></a>
                            </div>
                            <h2 className="panel-title">sellers</h2>
                        </header>
                        <Collapse in={this.state.hidesellers}>
                            <div className="panel-body  ">
                                <div className="col-sm-12 search-teacher" >
                                    <i className="fa fa-search"></i>
                                    <input
                                        type="text"
                                        onChange={(ev) => this.searchSellers(ev)}
                                        value={searchSeller}
                                        name="searchSellers"
                                        id="searchSellers"
                                        placeholder="Search Seller" />
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-striped mb-none">
                                        <tbody>
                                            {finalSellers.map(((seller, index) => {
                                                return (
                                                    <tr key={index} className="sellers-row">
                                                        <th className="my-table-border">
                                                            <img
                                                                src={seller.profilePhoto}
                                                                width="50px"
                                                                height="50px"
                                                                alt=""
                                                            />
                                                            {seller.userName}<br />{seller.skills}
                                                        </th>
                                                        <th className="my-table-border">
                                                            <center className="my-table-span">
                                                                <button className="my-table-btn chat" onClick={() => this.performActions("chat", seller._id)} >
                                                                    <i className="fa fa-comments"></i>Chat</button>
                                                            </center>
                                                        </th>
                                                        <th className="my-table-border">
                                                            <center className="my-table-span" >
                                                                <button className={`my-table-btn ${seller.warning ? "warning" : "unwarning"}`} onClick={() => this.performActions(`${seller.warning ? "unwarning" : "warning"}`, seller._id, index)} >
                                                                    <i className="fa fa-warning"></i>{seller.warning ? "Un-Warn" : "Warn"}</button>
                                                            </center>
                                                        </th>
                                                        <th className="my-table-border">
                                                            <center className="my-table-span" >
                                                                <button className={`my-table-btn ${seller.block ? "block" : "unblock"}`} onClick={() => this.performActions(`${seller.block ? "unblock" : "block"}`, seller._id, index)} >
                                                                    <i className="fa fa-ban"></i>{seller.block ? "Un-Block" : "Block"}</button>
                                                            </center>
                                                        </th>
                                                        <th className="my-table-border">
                                                            <center className="my-table-span">
                                                                <button className="my-table-btn" onClick={() => this.performActions("delete", seller._id, index)} >
                                                                    <i className="fa fa-trash"></i>Delete</button>
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
            </div >

        )
    }
}
export default SchoolForm;