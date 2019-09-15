import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { SocialIcon } from 'react-social-icons';
import styled from 'styled-components';
import logo from '../assets/mw.png';

const Wrapper = styled.div`
    .navbar {
        background-color: #222;
    }

    .navbar-brand, .navbar-nav .nav-link {
        color: #bbb;
        
        &:hover {
            color: white;
        }
    }

    .social:hover {
        opacity: 0.7;
    }

    .socialIcon {
        height: 35px;
        width: 35px;
    }
`;

export const NavigationBar = () => (
    <Wrapper>
        <Navbar expand="lg">
            <Navbar.Brand className="social" href="/"><img src={logo} /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto">
                    <Nav.Item><Nav.Link className="nav" href="/">Home</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link className="nav" href="https://drive.google.com/file/d/1gE17PlmKSMArsCL4L9Pihi7OfLoLfUOE/view">Resume</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link className="nav" href="/contact">Contact</Nav.Link></Nav.Item>
                </Nav>
            </Navbar.Collapse>
            <SocialIcon style={{ height: 35, width: 35, margin: 5}} className="social" url="https://github.com/mattRayWeinert/" />
            <SocialIcon style={{ height: 35, width: 35, margin: 5}} className="social" url="https://www.linkedin.com/in/matthew-weinert-37b47b170/" />
            <SocialIcon style={{ height: 35, width: 35, margin: 5 }} className="social" url="https://www.facebook.com/matt.weinert.7" />
        </Navbar>
    </Wrapper>
)