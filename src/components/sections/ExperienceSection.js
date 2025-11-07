import React, { useState } from 'react';
import { experiences } from '../../data/experienceData';

const ExperienceSection = ({ sectionRef, sectionStyle }) => {
    const [currentJobTab, setCurrentJobTab] = useState("BNYM");

    const workButtonClicked = (id) => {
        let exitJob = currentJobTab;

        if (id === exitJob) {
            return;
        }

        // Find the tab offset for the selected experience
        const selectedExp = experiences.find(exp => exp.id === id);
        if (selectedExp) {
            document.getElementById("tabHeader").setAttribute("style", `transform: translateY(${selectedExp.tabOffset}px)`);
        }

        setTimeout(() => {
            document.getElementById(exitJob).classList.toggle('fade-exit-active');
            setTimeout(() => {
                document.getElementById(id).style.display = 'block';
                document.getElementById(id).classList.toggle('fade-enter-active');
                document.getElementById(exitJob + "Button").style.color = "#8892b0";
                document.getElementById(id + "Button").style.color = "#08fdd8";
                document.getElementById(exitJob).classList.toggle('fade-exit-active');
                document.getElementById(exitJob).style.display = 'none';
            }, 250);
        }, 250);

        document.getElementById(id).classList.toggle('fade-enter-active');

        setCurrentJobTab(id);
    };

    return (
        <div className="experience" id="experience" ref={sectionRef} style={sectionStyle}>
            <div className="section">
                <div>
                    <h2 className="section-heading">Work history</h2>
                    <div className="inner">
                        <div className="tabular">
                            <div id="tabHeader"></div>
                            {experiences.map((exp, index) => (
                                <button
                                    key={exp.id}
                                    id={`${exp.id}Button`}
                                    className="workButton"
                                    style={{color: index === 0 ? '#08fdd8' : '#8892b0'}}
                                    onClick={() => workButtonClicked(exp.id)}
                                >
                                    <span className="buttonText buttonText-full">{exp.displayName}</span>
                                    <span className="buttonText buttonText-short">{exp.shortName}</span>
                                </button>
                            ))}
                        </div>

                        {experiences.map((exp, index) => (
                            <div key={exp.id} className="jobs" id={exp.id} style={{display: index === 0 ? 'block' : 'none'}}>
                                <div className="job">
                                    <h3>
                                        <span>{exp.position}</span>
                                        <span className="company"> @ {exp.company}</span>
                                    </h3>
                                    <p>{exp.period}</p>
                                    <div>
                                        <ul className="duties">
                                            {exp.duties.map((duty, dutyIndex) => (
                                                <li key={dutyIndex} className="job-listItem">
                                                    {duty}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExperienceSection;

