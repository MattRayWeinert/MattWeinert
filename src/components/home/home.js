import React, { Component } from 'react';
import './home.css';
import mw from '../../assets/mw.svg';
import resume from '../../assets/resume.pdf';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import twoters from '../../assets/twoters.png';
import pong from '../../assets/pong.png';
import dodge from '../../assets/dodge.png';


class Home extends Component {

    constructor() {
        super();
        this.state = { 
            currentJobTab: 'BNYM'
         };
    }

    workButtonClicked(id) {
        let exitJob = this.state.currentJobTab;

        if(id === exitJob) {
            return;
        }


        if(id === 'BNYM') {
            document.getElementById("tabHeader").setAttribute("style","transform: 0");
        }

        if(id === 'FourCStrategies') {
            document.getElementById("tabHeader").setAttribute("style","transform: translateY(42px)");
        }

        if(id === 'PhoenixDefense') {
            document.getElementById("tabHeader").setAttribute("style","transform: translateY(84px)");
        }

        if(id === 'DignitasTechnologies') {
            document.getElementById("tabHeader").setAttribute("style","transform: translateY(126px)");
        }

        setTimeout(() => {
            document.getElementById(exitJob).classList.toggle('fade-exit-active');
            setTimeout(() => {
                document.getElementById(id).style.display = 'block';
                document.getElementById(id).classList.toggle('fade-enter-active');
                document.getElementById(exitJob + "Button").style.color = "#8892b0";
                document.getElementById(id + "Button").style.color = "#08fdd8"; //
                document.getElementById(exitJob).classList.toggle('fade-exit-active');
                document.getElementById(exitJob).style.display = 'none';
            }, 250);
          }, 250);

        document.getElementById(id).classList.toggle('fade-enter-active');

        this.state.currentJobTab = id;
    }

    render() {
        return (
            <div class="home-wrapper">
                <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu:regular,bold&subset=Latin" />

                <div class="nav-bar">
                    <div class="title">
                        <AnchorLink href='#intro' class="intro">
                            <img src={mw} class="logo-img" alt="Matt Weinert" />
                            <div class="name">Matt Weinert </div>
                            <div class="career">Software Engineer.</div>
                        </AnchorLink>
                    </div>

                    <div class="nav">
                        <AnchorLink href='#about' class="item">About</AnchorLink>
                        <AnchorLink href='#experience' class="item">Experience</AnchorLink>
                        <AnchorLink href='#portfolio' class="item">Portfolio</AnchorLink>
                        <AnchorLink href='#contact' class="item">Contact</AnchorLink>
                    </div>

                    <ul class="social">
                        <li>
                            <a href="https://www.linkedin.com/in/matthew-weinert-37b47b170/" target="_blank"> <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin-in" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-linkedin-in fa-w-14 fa-5x"><path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" class=""></path></svg> </a>
                        </li>
                        <li>
                            <a href="https://github.com/MattRayWeinert" target="_blank"> <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" class="svg-inline--fa fa-github fa-w-16 fa-3x"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" class=""></path></svg> </a>
                        </li>

                        <li class="navbar-line"></li>
                    </ul>
                </div>

                <body>

                </body>
                
                <div>
                    <div class="section" id="intro" style={{marginBottom: "25vh"}}>
                        <div class="background-container">
                            <img class="moon-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/moon2.png" alt="" />
                            <div class="stars"></div>
                            <div class="twinkling"></div>
                            <div class="clouds"></div>
                        </div>

                        <div class="body" style={{width: "100%", maxWidth: "900px", backgroundColor: "rgba(0, 0, 0, 0)"}}>
                            <h2 class="home-header-1">Hi, my name is</h2>
                            <div class="home">
                                <div >
                                    <h2 class="home-header-2">Matt Weinert,</h2>
                                    <h2 class="home-header-3">and I program things.</h2>
                                </div>
                            </div>
                            <h3 class="home-header-4">
                                I'm a software engineer with experience in full-stack development. My experience is within federal contracting and have developed anywhere from android applications to web based application solutions.
                            </h3>

                            <a class="ext-link" href={resume} target="_blank">Resume</a>
                        </div>
                    </div>
                </div>

                <div class="about" id="about">
                    <div class="section">
                        <div class="body">
                        <h2 class="section-heading">About Me</h2>
                            <div class="inner" style={{display: "block"}}>
                                <p>
                                Hello! My name is Matthew Weinert and I have a deep passion for engineering. Going back to High School I took a web-development class where I learned to develop webpages.
                                
                                <p>Fast forward to today, in my free time in my free time I learn Unity, C# and C++ and my professional life consists of full-stack web application development. My main focus is being the most well-rounded and capable engineer I can be.</p>
                                </p>
                                <p>
                                    Here are a few technologies that I have worked with:
                                </p>

                                <ul class="duties">
                                    <div style={{float: "left", marginRight: "50px"}}>
                                                <li class="listItem">C</li>
                                                <li class="listItem">C#</li>
                                                <li class="listItem">Java</li>
                                                <li class="listItem">MySQL</li>
                                    </div>
                                    <div>
                                                <li class="listItem">Javascript</li>
                                                <li class="listItem">Typescript</li>
                                                <li class="listItem">MongoDB</li>
                                                <li class="listItem">Python</li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="experience" id="experience">
                    <div class="section">
                        <div class="body">
                            <h2 class="section-heading">Work history</h2>
                            <div class="inner">
                                <div class="tabular">
                                    <div id="tabHeader">
                                    </div>
                                        <button id="BNYMButton" class="workButton" style={{color: '#08fdd8'}} onClick={() => this.workButtonClicked("BNYM")}><span class="buttonText">BNY Mellon</span></button>
                                        <button id="FourCStrategiesButton" class="workButton" onClick={() => this.workButtonClicked("FourCStrategies")}>4c Strategies</button>
                                        <button id="PhoenixDefenseButton" class="workButton" onClick={() => this.workButtonClicked("PhoenixDefense")}>Phoenix Defense</button>
                                        <button id="DignitasTechnologiesButton" class="workButton" onClick={() => this.workButtonClicked("DignitasTechnologies")}>Dignitas Technologies</button>
                                </div>

                                <div class="jobs" id="BNYM">
                                    <div class="job">
                                        <h3>
                                            <span>Lead Full-Stack Engineer</span>
                                            <span class="company"> @ BNYM</span>
                                        </h3>
                                        <p>Febuary '22 - Present</p>
                                        <div>
                                            <ul class="duties">
                                                <li class="listItem">Created an entire web application based off a legacy application that is responsible for securing over 18 trillion USD worth of securities daily.</li>
                                                <li class="listItem">Helped onboard and lead new hires along with leading a group of interns.</li>
                                                <li class="listItem">The technologies used for development was Typescript via Angular along with Springboot as the middleware and Java for the backend with a relational SQL database; 
                                                development tools such as IntelliJ, RapidSQL and Putty.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div class="jobs" id="FourCStrategies">
                                    <div class="job">
                                        <h3>
                                            <span>Software Engineer</span>
                                            <span class="company"> @ 4c Strategies</span>
                                        </h3>
                                        <p>May '22 - Febuary '23</p>
                                        <div>
                                            <ul class="duties">
                                                <li class="listItem">Developed a training solution that integrated with a Synthetic Training Environment (STE) that created, tracked and managed simulations.</li>
                                                <li class="listItem">Worked alongsided a cluster of small teams with an agile development process using Git and Gitlab.</li>
                                                <li class="listItem">The development tech stack consisted of Java, Typecript and MySQL; development tools such as Webstorm, VS Code, Eclipse, Git Bash and SQL Management Studio.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div class="jobs" id="PhoenixDefense">
                                    <div class="job">
                                        <h3>
                                            <span>Software Engineer</span>
                                            <span class="company"> @ Phoenix Defense</span>
                                        </h3>
                                        <p>May 21' - May 22'</p>
                                        <div>
                                            <ul class="duties">
                                                <li class="listItem">Supported development on two different contracts, which both were developed with an agile process. </li>
                                                <li class="listItem">The first being a GPS training application which was an anadroid application that linked with a radio using peer-to-peer architecture; this utililzed a NoSQL database and Kotlin along with Git and Bitbucket.</li>
                                                <li class="listItem">The ladder was a database management system application to track large amounts of data; this was done so with Java, SpringBoot, SQL and Typescript along with TortiseSVN and BitBucket.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div class="jobs" id="DignitasTechnologies">
                                    <div class="job">
                                        <h3>
                                            <span>Software Engineer</span>
                                            <span class="company"> @ Dignitas Technologies</span>
                                        </h3>
                                        <p>July 19' - April 20'</p>
                                        <div>
                                            <ul class="duties">
                                                <li class="listItem">Constructed and developed a web application training tool that was used by the Army to construct information timelines for the purpose of teaching.</li>
                                                <li class="listItem">Interfaced with different support staff to test the software, fix bugs, create features along with unit testing and creating technical notes.</li>
                                                <li class="listItem">The development of this required an agile process along with the use of Java, XML, HTML, CSS and GWT.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="portfolio" id="portfolio">
                    <div class="section">
                        <div class="body" style={{width: "950px"}}>
                        <h2 class="section-heading">Portfolio</h2>
                                <ul class="proj-list">
                                    <li class="proj-list-item">
                                        <div class="project">
                                            <div class="content-left">
                                                <div>
                                                    <p class="proj-overline">Personal Project</p>
                                                    <h3 class="proj-header">Twoters</h3>
                                                    <div class="proj-desc">
                                                        Developed a website that helps college students to learn, teach and study together. The website uses a MERN stack with Axios acting as the middleware. The website handles account registration with a login/logout system. Users can currently edit their user profile settings, create posts and search for posts along with logging out with potential to add more features in the future.
                                                    </div>
                                                    <ul class="proj-stack-left">
                                                        <li class="stack-li-item">React</li>
                                                        <li class="stack-li-item">Mongo</li>
                                                        <li class="stack-li-item">Express</li>
                                                        <li class="stack-li-item">Node</li>
                                                    </ul>
                                                    <div class="proj-links-left">
                                                        <a class="github-proj-link" href="https://github.com/MattRayWeinert/Twoters2" target="_blank" style={{width: "20px"}}><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github"><title>GitHub</title><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="proj-images-right">
                                                <img src={twoters} class="proj-image"/>
                                            </div>
                                        </div>
                                    </li>

                                    <li class="proj-list-item">
                                        <div class="project">
                                            <div class="content-right">
                                                <div>
                                                    <p class="proj-overline">Personal Project</p>
                                                    <h3 class="proj-header">Pong</h3>
                                                    <div class="proj-desc">
                                                        Recreated a Pong like clone that is single player using Unity and C#. The game was created in a 3d space but the game view acts as a 2d plane. The mouse controls the paddle to bounce the ball. The player has 3 lives and records a score with a simple single option play menu.
                                                    </div>
                                                    <ul class="proj-stack-right">
                                                        <li class="stack-li-item">Unity</li>
                                                        <li class="stack-li-item">C#</li>
                                                    </ul>
                                                    <div class="proj-links-right">
                                                        <a class="github-proj-link" href="https://github.com/MattRayWeinert/First-Unity-Project" target="_blank" style={{width: "20px"}}><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github"><title>GitHub</title><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="proj-images-left">
                                                <img src={pong} class="proj-image"/>
                                            </div>
                                        </div>
                                    </li>

                                    <li class="proj-list-item">
                                        <div class="project">
                                            <div class="content-left">
                                                <div>
                                                    <p class="proj-overline">Personal Project</p>
                                                    <h3 class="proj-header">Dodge</h3>
                                                    <div class="proj-desc">
                                                        In this game, the WASD keys are used to dodge the spawning objects, every new level there are new threats and the more that the player gets hit then the more damage they will take. The goal is to stay alive longer than anyone else, doing so will grant you a lot of points! This is my first major Java based game. The engine was created using a tick FPS system. The GUI was created using the JFrame class withing Java's JDK Framework.
                                                    </div>
                                                    <ul class="proj-stack-left">
                                                        <li class="stack-li-item">Java</li>
                                                        <li class="stack-li-item">Swing</li>
                                                    </ul>
                                                    <div class="proj-links-left">
                                                        <a class="github-proj-link" href="https://github.com/MattRayWeinert/Dodge" target="_blank" style={{width: "20px"}}><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github"><title>GitHub</title><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="proj-images-right">
                                                <img src={dodge} class="proj-image"/>
                                            </div>
                                        </div>
                                    </li>
                                </ul>                                
                        </div>
                    </div>
                </div>

                <div class="contact" id="contact">
                    <div class="section">
                        <div class="body">
                        <h2 class="section-heading">What's next?</h2>
                            <div class="inner" style={{display: "block"}}>
                                <h2 class="contact-header">Get In Touch</h2>
                                <p class="contact-p">Although I currently hold a position, my inbox is always open. Whether you have a question or just want to say hi, I’ll try my best to get back to you!</p>
                                <div class="ext-link-wrapper">
                                    <a class="ext-link" href="mailto:MatthewRaymondWeinert@gmail.com" rel="noopener noreferrer" target="_blank">Say Hello</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="footer" id="footer">
                    <div class="section">
                        <div class="body" style={{backgroundColor: "rgba(0,0,0,0)", minHeight: "60px"}}>
                            <footer>
                                <a href="https://github.com/MattRayWeinert/mw" class="footer-href" target="_blank">
                                    <div>
                                        Designed & Built by Matthew Weinert
                                    </div>
                                </a>
                            </footer>
                        </div>
                    </div>
                </div>
                
            </div>

        )
    }
}

export default Home;