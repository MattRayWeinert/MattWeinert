import React from 'react';
import { technologies } from '../../data/experienceData';

const AboutSection = () => {
    return (
        <div className="about" id="about">
            <div className="section">
                <div className="body">
                    <h2 className="section-heading">About Me</h2>
                    <div className="inner" style={{display: "block"}}>
                        <p>
                            I'm a full stack software engineer with over 5 years of experience, and I've been passionate about coding since high school. I enjoy solving complex problems and building software that's both practical and well-designed. Whether it's front-end interfaces or back-end systems, I love working across the stack and creating solutions that make a real impact.
                        </p> 
                        <p>
                            At BNY, I develop full stack solutions to modernize legacy workflows, build dashboards that help executives make data-driven decisions, and manage code releases for smooth deployments. I also focus on automation to improve development speed and maintain high code quality across projects.
                        </p>    
                        <p>
                            Outside of work, I'm always chasing new challenges. I picked up mountain biking and dirt jumping for the thrill and progression, but after getting some injuries, I balanced my physical hobbies with teaching myself the piano which gives me time to heal between injuries. As I get older, I enjoy pushing my limits, picking up new skills, and staying curious in everything I do.
                        </p>
                        <p>
                            Here are a few of the many technologies that I have worked with:
                        </p>

                        <ul className="duties">
                            {technologies.map((techGroup, index) => (
                                <div key={index} style={{float: "left", marginRight: "50px"}}>
                                    {techGroup.map((tech, techIndex) => (
                                        <li key={techIndex} className="listItem">{tech}</li>
                                    ))}
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;

