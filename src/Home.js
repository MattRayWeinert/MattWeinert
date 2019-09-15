import React from 'react'
import { Accordion } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import conmanHome from './assets/conmanHome.png';
import conmanIndex from './assets/conmanIndex.png';
import dodge from './assets/dodge.gif';
import appLight1 from './assets/appLight1.mp4';
import googleLight2 from './assets/googleLight2.mp4';
import finale3 from './assets/finale3.mp4';
import Glowworm from './assets/Glowworm.png';
import Connect4 from './assets/Connect4.png';
// import _ from './assets/_';

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
    background: #ccc;
  }
  
  .home {
      background-color: #f7f7f7;
      border: 1px solid rgba(0, 0, 0, 0.125);
      border-radius: 0.25rem;
      overflow-wrap: break-word;
    }

  .home p {
      word-break: wrap;
      margin: 20px;
      overflow: hidden;
  }

  .btn-link {
      color: #000000;
    }

    .img {
      text-align: center;
    }
`;

export const Home = () => (
<Styles>
  <React.Fragment>
    <div className="about">
      <h2>About Me</h2>
    </div>
    <div className="centered line"></div><br></br>
      <div className="home">

        {/* <img src={} /> */}
        
        <p>
          At first I started my education in forensic biochemistry while working in an analytical 
          chemistry lab for a company owned by Energizer. Later on into my education I developed a 
          passion for computers and software which lead me into the decision of changing my study to
          Computer Engineering. Currently I now work as a Software Engineer while finishing my degree at UCF.
          When i'm not studying for school or fixing bugs at work I like to spend time with my dog or family
          and also I enjoy playing video games with my friends!
        </p>
        <ul>
          <h6 style={{textTransform: "uppercase"}}>Technical Skills</h6>
          <li>C</li>
          <li>Java</li>
          <li>Javascript</li>
          <li>Bootstrap</li>
          <li>GWT</li>
          <li>PHP</li>
          <li>MySQL</li>
          <li>NodeJS</li>
          <li>ReactJS</li>
          <li>HTML5</li>
          <li>CSS3</li>
          <li>Ardunio Microcontrolers</li>
        </ul>
      </div>
  </React.Fragment><br></br>

  <div className="about">
      <h2>Portfolio</h2>
    </div>
  <div className="centered line"></div><br></br>

  <Accordion>
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="0" link="#C0C0C0" btn-link="color: #000000">
          ConMan
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="0">
        <Card.Body>
          <Card.Body className="img">
            <img src={conmanHome} />
            <br></br><br></br><br></br>
            <img src={conmanIndex} />
          </Card.Body>
          <br></br>
          This was a group effort with peers to create a Web application that is a generic contact manager. 
          The rest of my group and I planned and designed the application using UMLs, Gantt charts and ERDs
          to effectively plan a thorough Agile workflow. My duties was to create the frontend, backend and 
          API of the website while the other group-members handled other responsibilities.
          The website was hosted on HostGator and had a few useful features to it, such as Login, Register,
          Add Contact, Search Contact by Keyword, Delete Contact, a Contact table and of course, Logout.
          <ul>
            <li>Programed utilizing a LAMP stack with Javascript and some HTTP Requests</li>
            <li>AJAX was a key technique used to make a clean applicaton display</li>
            <li>JSON and dynamic PHP variables were utilized to communicate from frontend to backend</li>
          </ul>
          <a href="https://github.com/MattRayWeinert/ContactManager" target="_blank">Github</a>
        </Card.Body>
      </Accordion.Collapse>
    </Card>

    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="1">
          Dodge
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="1">
      <Card.Body className="card1">
        <Card.Body className="img">
          <img src={dodge} />
        </Card.Body>
        <br></br>
        In this game, the WASD keys are used to dodge the spawning objects, every new level
        there are new threats and the more that the player gets hit then
        the more damage they will take. The goal is to stay alive longer than
        anyone else, doing so will grant you a lot of points! This is my first major Java based game.
        The engine was created using a tick FPS system. The GUI was created using the JFrame class
        withing Java's JDK Framework.
        <ul>
          <li>Programed in Java using Eclipse and the JDK framework</li>
          <li>Displays knowledge for creating own GUI using JFrame</li>
          <li>Engine created using a tick based system</li>
        </ul>
        <a href="https://github.com/MattRayWeinert/Dodge" target="_blank">Github</a>
      </Card.Body>
    </Accordion.Collapse>
    </Card>

    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="2">
          Voice Activated T.V. Remote
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="2">
        <Card.Body>
          <Card.Body className="img">
            <video width="300" height="240" controls><source src={appLight1} /></video>
            <video width="300" height="240" controls><source src={googleLight2} /></video>
            <video width="300" height="240" controls><source src={finale3} /></video>
          </Card.Body>
          <br></br>
          For this project, the goal was to be able to turn on/off the SmartTV. This was
          done with a NodeMCU microcontroler with wifi integration. The controller was
          coded with the arduino IDE. It was also connected with over the same wifi
          as the television, and was sync'd to an app called blynk. The app allowed us
          to use Google Home's microphone to operate the NodeMCU to send the IR signal
          to turn the television on using a specific phrase, "turn on board".
          <ul>
            <li>Programed using Arduino IDE</li>
            <li>Utilized an NodeMCU microcontroller kit, breadboard and jumpers</li>
            <li>Transmission of IR signals utilizing a microcontroler</li>
          </ul>
          <p><i>Code Available Upon Request</i></p>
        </Card.Body>
      </Accordion.Collapse>
    </Card>

    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="3">
          Glowworm
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="3">
        <Card.Body>
            <Card.Body className="img">
                <img src={Glowworm} /><br></br>
            </Card.Body>
            This project's goal was to create a Glowworm and a ledge by passing commands through the arguments.
            The first command was to pass a number into the argument which would make a visual ledge of '=' for the
            Glowworm to stand on. The second command was the instructions for the Glowworm. These could make the
            worm either move a certain direction, grow in size, shrink in size or kill the worm. After the Glowworm
            reaches the end of the ledge, it then wraps around to the other end of the ledge. This was done using an algorithms
            to break up the Glowworm and map it to the ledge's relative positioning along with the help of modulo.
            <ul>
              <li>Programed in C using Visual Studio Code and an Ubuntu Terminal GCC</li>
              <li>Designed to pass commands into algorithms with the restriction of using arrays</li>
              <li>Constructed algorithms to implement the inputted commands onto the Glowworm</li>
            </ul>
            <p><i>Code Available Upon Request</i></p>
        </Card.Body>
      </Accordion.Collapse>
    </Card>

    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="5">
          Connect4
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="5">
        <Card.Body>
            <Card.Body className="img">
                <img src={Connect4} /><br></br>
            </Card.Body>
            My attempt at recreating the classic game, Connect 4, with the help of Java.
            It is capable of playing against another player and will execute until
            someone has won. Multiple functions used to print the board, place the chip
            or even to iteratively backtrack to check for the winner.
            <ul>
              <li>Programed in Java using Eclipse and the JDK framework</li>
              <li>Utilized multiple functions to backtrack for a 4 in a row</li>
            </ul>
            <a href="https://github.com/MattRayWeinert/Connect4" target="_blank">Github</a>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
    
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="6">
          LonelyPartyArray
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="6">
        <Card.Body>
          This projcet required knowledge in memory allocation and memory management with MALLOC.
          The requirement was to utilize the minimal amount of memory required to store as much data as needed.
          The data was stored into allocated arrays within an allocated struct.
          The user had multiple choices on how to modify the data, such as adding data, removing data, resetting all the
          data, destroy specific data and a few more options. If all the data in an allocated memory location was destroyed,
          the memory would be free'd, and so forth. Valgrind was used to confirm no memory leaks.
          <ul>
            <li>Programed in C using Visual Studio Code and an Ubuntu Terminal GCC</li>
            <li>Constructed to manage memory in the interest of memory conservation</li>
            <li>Created with functions to handle all the tasks prompted by the user</li>
            <li>Zero memory leaks were detected with the assistance of Valgrind</li>
          </ul>
          <p><i>Code Available Upon Request</i></p>
        </Card.Body>
      </Accordion.Collapse>
    </Card>

    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="7">
          KindredSpirits
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="7">
        <Card.Body>
          This bit of code displays binary trees with using recursive methods. Trees were formed
          and the functions that I was required to create were to recursively trace the trees
          and either create a mirror image reflection of the given tree, compare two trees to check
          if those tree's are reflections of eachother or to compare two trees to see if the first tree's preorder
          traversal is the same as the second tree's postorder traversal, and vice versa.
          <ul>
            <li>Programed in C using Visual Studio Code and an Ubuntu Terminal GCC</li>
            <li>Displays memory allocation alongside data management</li>
            <li>Displays understanding of trees recursively</li>
          </ul>
          <p><i>Code Available Upon Request</i></p>
        </Card.Body>
      </Accordion.Collapse>
    </Card>

    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="8">
          Binary Search Tree
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="8">
        <Card.Body>
          This is a simple Binary Search Tree that is created based off of the user's inputs.
          The inputs were read through the command line which ultimately were from a text file.
          The format of the file was then scanned and differentiated from the command and the numerical data.
          After the text is differentiated, then the functions functions would be performed.
          The functions consists of insertion, deletion, search, inorder traversal printing or quitting.
          Lastly the Tree's data was printed based on the left subtree's children and right subtree's children.
          <ul>
            <li>Programed in Java using JDK Framework with Eclipse, Atom and Ubuntu Terminal GCC</li>
            <li>Performs knowledge of Memory Allocation and Data management</li>
            <li>Displays knowledge of pathing for Scanning other files for Data</li>
          </ul>
          <p><i>Code Available Upon Request</i></p>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
    
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="9">
          Chatter Box
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="9">
        <Card.Body>
          Currently working on an IRC Chatbot using the PircBot library. <br></br>
          <i>This will be updated upon completion</i>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  </Accordion>
    <br></br>
</Styles>
)
