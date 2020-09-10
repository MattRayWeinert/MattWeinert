import React, { Component } from 'react';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';
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

  .home ul {
    padding-left: 60%;
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
  }

  .second {
    float: left;
    position: relative;
    width: 40%;
    margin: 4%;
    margin-right: auto;
    margin-left: auto;
  }
`;

export const Portfolio = () => (
<Styles style={{display: "flex", marginTop: "59px"}}>
  <div className="second">
    <div className="about">
        <h2 style={{color: "plum"}}>Portfolio</h2>
    </div>
    <div className="centered line"></div><br></br>

    <Accordion>

    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="12" link="#C0C0C0" btn-link="color: #000000">
          2unitBot
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="12">
        <Card.Body>
          <br />
          This is an IRC chatbot created using Java sockets. There are a few features the bot has, but one of
          the main features is being able to webscrape and parse for data and relay it back into the IRC socket. This
          is done using Selenium and a Chrome Driver to load the HTML in order for parsing. The data is stored locally
          for the a fast runtime instead of implemnenting multiple function calls. 
          <ul>
            <li>Programmed exclusively using Java</li>
            <li>Considered and utilized effective runtime analysis </li>
            <li>Implementation of Chrome drivers and HTML parsing</li>
            <li>Websocket and TCP Java API used for connectivity</li>
          </ul>
          <a href="https://github.com/MattRayWeinert/2unitBot" target="_blank">Github</a>
        </Card.Body>
      </Accordion.Collapse>
    </Card>

    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="11" link="#C0C0C0" btn-link="color: #000000">
          MySQL Java Swing App 
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="11">
        <Card.Body>
          <Card.Body className="img">
            <img src={riders} style={{width: '525px', height: '250px'}} />
          </Card.Body>
          <br />
          Using MySQL workbench along with Java, this project simply created a swing app and implemented the CRUD (Create, Read, Update, Delete) functionality of 
          MySQL within a Swing app. 
          <ul>
            <li>Programmed exclusively using Java</li>
            <li>Utilized event handlers</li>
            <li>Multiple different Swing GUIs were implemented</li>
            <li>Example of a simple swing frontend connected to a MySQL backend</li>
          </ul>
          <a href="https://github.com/MattRayWeinert/JavaMySQL" target="_blank">Github</a>
        </Card.Body>
      </Accordion.Collapse>
    </Card>

    <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="10" link="#C0C0C0" btn-link="color: #000000">
            Dunder Mifflin Book Store
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="10">
          <Card.Body>
            <Card.Body className="img">
              <img src={dmOpen} style={{width: '650px', height: '250px'}} />
              <br /><br />
              <img src={dmMsg} style={{width: '650px', height: '450px'}} />
              <br /><br />
              <img src={dmFinish} style={{width: '650px', height: '450px'}} />
            </Card.Body>
            <br />
            For this project it was an individual project requiring the use of Java to synthesize a book store
            terminal that allows a user to "order" books and build an order using an inventory of books. The inventory
            used a dummy backend using a .txt file which was read from to confirm if the books exist, and if the user ordered
            a book that exists, that book would than be added to the order. This project utilized a range of Java frameworks such
            as the Swing GUI, file processing and some others. When the user finished their order, their order would not only display
            on a Swing GUI popout, but also a .txt file would be created totaling their order with the quantity of items, the pricing
            and unique IDs' per item which were generated.
            <ul>
              <li>Programmed exclusively using Java</li>
              <li>Multiple different Swing GUIs were implemented</li>
              <li>Basic example of handlers and their implementations</li>
              <li>Simplistic exmaple of a Frontend interfacing with a Backend</li>
            </ul>
            <a href="https://github.com/MattRayWeinert/DunderMifflin" target="_blank">Github</a>
          </Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0" link="#C0C0C0" btn-link="color: #000000">
            ConMan
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Card.Body className="img">
              <img src={conmanHome} style={{width: '100%'}} />
              <br /><br />
              <img src={conmanIndex} style={{width: '100%'}} />
            </Card.Body>
            <br />
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
      
      {/* <Card>
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
      </Card> */}

      {/* <Card>
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
      </Card> */}

      {/* <Card>
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
      </Card> */}
      
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="9">
            Social-Media Network
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="9">
          <Card.Body>
            Currnetly solo-developing a Social-Meida networking website that will eventually evolve into a business
            and marketed towards it's intended target audience. <b>No info is made public as it is still under construction.</b> Funds from
            this enterprise will be utilized towards it's iOS and Android app development.
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  </div>
</Styles>
)