import React from 'react'
import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { Accordion } from 'react-bootstrap';
import conmanHome from './assets/conmanHome.png';
import conmanIndex from './assets/conmanIndex.png';
import dodge from './assets/dodge.gif';
import appLight1 from './assets/appLight1.mp4';
import googleLight2 from './assets/googleLight2.mp4';
import finale3 from './assets/finale3.mp4';
import Glowworm from './assets/Glowworm.png';
import Connect4 from './assets/Connect4.png';
import dmOpen from './assets/dundermifflinOpen.png';
import dmMsg from './assets/dundermifflinFinishMessage.png';
import dmFinish from './assets/dundermifflinFinish.png';
import profile from './assets/prof.jpg';
import riders from './assets/riders.png';


const Styles = styled.div`
  .about {
    margin-left: auto;
    margin-right: auto;
    float: none;
    margin: 0 0 15px 0;
    text-transform: uppercase;
    text-align: center;
    display: block;
    letter-spacing: 0.1em;
    font-wight: 300;
  }

  .centered {
    margin-left: auto;
    margin-right: auto;
    float: none;
  }

  .line {
    display: block;
    width: 290px;
    height: 3px;
    padding: 0!important;
    background: plum;
  }
  
  .home {
      background-color: #f7f7f7;
      border: 1px solid rgba(0, 0, 0, 0.125);
      border-radius: 0.25rem;
      overflow-wrap: break-word;
      display: inline-block;
    }

  .home p {
      word-break: wrap;
      margin: 30px;
      overflow: hidden;
      text-align: center;
  }

  .home img {
    float: left;
    padding: 20px;
    width: 50%;
    height: 70%;
    margin-top: 25px;
  }

  .btn-link {
      color: #000000;
    }

  .img {
    text-align: center;
  }

  .first {
    float: left;
    width: 40%;
    margin: 4%;
    margin-right: auto;
    margin-left: auto;
  }

`;

export const Home = () => (
<Styles style={{display: "flex", marginTop: "59px"}}>
  <div className="first">
  <React.Fragment>
    <div className="about">
      <h2 style={{color: "plum"}}>About</h2>
    </div>
    <div className="centered line"></div><br></br>
      <div className="home">
        {/* <img src={profile} /> */}
        <p>
          At first I started my education in forensic biochemistry while working in an analytical 
          chemistry lab for a company owned by Energizer. Later on into my education I developed a 
          passion for computers and software which lead me into the decision of changing my study to
          Computer Engineering. Currently I now work as a Software Engineer for Dignitas Technologies while finishing my degree at UCF.
          When i'm not studying for school or fixing bugs at work, I like to spend time with my dogs, family or I put time
          into challenging myself and learning new things!
        </p>
        <ul style={{marginRight: "auto", marginLeft: "auto", display: "table"}}>
          <h6 style={{textTransform: "uppercase"}}>Technical Skills</h6>
          <li>C</li>
          <li>Java</li>
          <li>Protobuf & JSON</li>
          <li>PHP</li>
          <li>MySQL</li>
          <li>Node & ReactJS</li>
          <li>HTML & CSS</li>
          <li>Microcontrollers</li>
          <i>...and more!</i>
        </ul>
      </div>
  </React.Fragment>
  </div>
</Styles>
)
