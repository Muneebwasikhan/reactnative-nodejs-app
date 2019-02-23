import React, { Component } from 'react';
import logo from "../../Assets/logo.png";
import "./Navbar.css";
import { Fade } from "react-bootstrap"

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNav: false
        }
    }
    render() {
        const isLoggedIn = JSON.parse(localStorage.getItem("AdminData"));
        const { showNav } = this.state;
        return (
            <nav className="my-nav navbar navbar-expand-lg navbar-light">
                <div className="jusftify-self-flex-start" >
                    <img
                        src={logo}
                        width="50px"
                        height="50px"
                        alt=""
                    />
                    <div className="logo-heading-group">
                        <i className="logo-heading" >Fiverr</i>
                        <i>Selling Platform</i>
                    </div>
                </div>
                {isLoggedIn &&
                    <div className="logout-dropdown jusftify-self-flex-end" >
                        <button className="logout-dropdown-btn" type="button"
                            onClick={() => this.setState({ showNav: !showNav })}
                        >
                            {isLoggedIn.userName.charAt(0).toUpperCase()}
                        </button>
                        <Fade in={showNav}>
                            <div className="drop-list" >
                                <button className="logout-btn" type="button"
                                    onClick={(ev) => {
                                        ev.preventDefault();
                                        localStorage.removeItem("AdminData");
                                        window.location.reload()
                                    }}
                                >
                                    Logout
                            </button>
                            </div>
                        </Fade>
                    </div>



                    // <div className="dropdown logout-dropdown">
                    //     <button className="logout-dropdown-btn dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    //         {isLoggedIn.userName.charAt(0).toUpperCase()}
                    //     </button>
                    //     <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                    //         <button className="dropdown-item"
                    //         onClick={(ev) => {
                    //             ev.preventDefault();
                    //             localStorage.removeItem("AdminData");
                    //             window.location.reload()
                    //         }}
                    //         type="button">Logout</button>
                    //     </div>
                    // </div>
                }
            </nav>







        );
    }
}

export default Navbar;