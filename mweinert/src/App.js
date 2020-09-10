import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { Contact } from './Contact';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';
import { Jumbotron } from './components/Jumbotron';
import * as bubbly from 'bubbly-bg';
import { Portfolio } from './Portfolio';
import jumbo from './assets/desert.jpg';
import { Nav, Navbar } from 'react-bootstrap';
import { SocialIcon } from 'react-social-icons';
import styled from 'styled-components';
import logo from './assets/mw.png';
import resume from './assets/resume.pdf';

class App extends Component {

  componentDidMount()
  {
    window.bubbly({
      colorStart: '#1c040b',
      colorStop: '#000000',
      bubbleFunc:() => `hsla(${Math.random() * 360}, 100%, 50%, ${Math.random() * 0.25})`,
      ReactFragment: document.querySelector("background")
    });
  }
  
  render()
  {
    const Wrapper = styled.div`
    .navbar {
        background: #333333;
    }
    
    .navbar-brand, .navbar-nav .nav-link {
        color: white;
        
        &:hover {
            color: lightgray;
        }
    }
    
    .social:hover {
        opacity: 0.7;
    }
    
    .socialIcon {
        height: 35px;
        width: 35px;
    }
    
    .all {
        animation: 1.5s ease-out 0s 1 slideInFromRight;
      }
    
      @keyframes slideInFromRight {
        0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(100%);
          }
      }
    
    `;
    
    return (
      <React.Fragment id="background">
        
        <div style={{background: "#333333"}}>
          <Wrapper style={{position: "fixed", width: "100%", zIndex: "100"}}>
              <Navbar expand="lg">
                  <Navbar.Brand className="social" href="/"><img src={logo} /></Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse style={{marginLeft: "80px"}} id="basic-navbar-nav">
                      <Nav className="mx-auto">
                          <Nav.Item><Nav.Link className="nav" href="#about">About</Nav.Link></Nav.Item>
                          <Nav.Item><Nav.Link className="nav" href="#portfolio">Portfolio</Nav.Link></Nav.Item>
                          <Nav.Item><Nav.Link className="nav" href="#contact">Contact</Nav.Link></Nav.Item>
                          <Nav.Item><Nav.Link className="nav" target="blank" href={resume}>Resume</Nav.Link></Nav.Item>
                      </Nav>
                  </Navbar.Collapse>
                  <SocialIcon style={{ height: 35, width: 35, margin: 5}} className="social" url="https://github.com/mattRayWeinert/" />
                  <SocialIcon style={{ height: 35, width: 35, margin: 5}} className="social" url="https://www.linkedin.com/in/matthew-weinert-37b47b170/" />
                  <SocialIcon style={{ height: 35, width: 35, margin: 5 }} className="social" url="https://www.facebook.com/matt.weinert.7" />
              </Navbar>
          </Wrapper>
        </div>


        <Layout>
          <div style={{display: "block"}}>
            <Jumbotron />

            <div id="about" style={{}} />
            <Home />

            <div id="portfolio" style={{}}/>
            <Portfolio />

            <div id="contact" style={{}}/>
            <Contact />

          </div>
        </Layout>

      </React.Fragment>
    );
  }
}

export default App;
