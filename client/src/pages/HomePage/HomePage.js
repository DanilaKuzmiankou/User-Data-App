import "../../styles/App.css"
import {Button, Container} from "react-bootstrap";
import React from "react";
import {useNavigate} from "react-router-dom";

export const HomePage = () => {
    const navigate = useNavigate()

    const routeChange = () => {
        let path = `/userPage`;
        navigate(path);
    }

    return (

        <div className="home_background">
            <Container fluid className="home_container">
                <div>
                    <h1 className="fonts"> Welcome to the User Data Site! </h1>
                    <Button variant="danger" className=" home_button" onClick={routeChange}>Get Started!</Button>
                </div>
            </Container>

        </div>


    );
}
