import {AuthButton} from "../AuthUI/AuthButton/AuthButton";
import React from 'react';
import "../../styles/App.css"
import {OverlayTrigger, Tooltip} from "react-bootstrap";

export const CustomNav = () => (


    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="d-flex flex-grow-1 navbar_home_button_container">
            <OverlayTrigger placement="bottom" delay={{show: 250, hide: 400}}
                            overlay={<Tooltip id="tooltip-disabled">To Home!</Tooltip>}>
                <a href="/" className=" justify-content-start navbar_home_button">Home</a>
            </OverlayTrigger>
        </div>
        <div className="navbar-collapse collapse w-100 navbar_auth_button" id="collapsingNavbar3">
            <ul className="nav navbar-nav ml-auto w-100 justify-content-end">
                <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-disabled">To User Data!</Tooltip>}>
                    <a href="/users" className="navbar_users_data_button">User Data</a>
                </OverlayTrigger>
                <AuthButton/>
            </ul>
        </div>
    </nav>


);

export default CustomNav;