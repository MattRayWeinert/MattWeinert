import React from 'react';
import { technologies } from '../../data/experienceData';

const AboutSection = () => {
    return (
        <section className="section about" id="about">
            <div className="section-inner">
                <div className="section-intro">
                    <p className="section-index">01</p>
                    <h2 className="section-heading">About</h2>
                    <p className="section-support">
                        Developer by craft, builder by instinct.
                    </p>
                </div>

                <div className="about-copy">
                    <p>
                        I'm a full-stack software developer with over 5 years of experience, passionate about coding since high school. I enjoy solving complex problems and building software that's both practical and well-designed—across front-end interfaces and back-end systems.
                    </p>
                    <p>
                        At BNY, I develop full-stack solutions to modernize legacy workflows, build dashboards that help executives make data-driven decisions, and manage releases for smooth deployments. I also focus on automation to improve development speed and maintain high code quality.
                    </p>
                    <p>
                        Outside of work I'm always chasing new challenges—mountain biking and dirt jumping for the thrill, and piano when I need to recover and stay curious.
                    </p>
                </div>

                <div className="tech-block">
                    <h3 className="tech-heading">Technologies I work with</h3>
                    <ul className="tech-list">
                        {technologies.flat().map((tech) => (
                            <li key={tech}>{tech}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
