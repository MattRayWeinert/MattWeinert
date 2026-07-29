import React, { useState } from 'react';
import { experiences } from '../../data/experienceData';

const ExperienceSection = ({ sectionRef, sectionStyle }) => {
    const [currentJobTab, setCurrentJobTab] = useState(experiences[0]?.id || 'BNYM');

    const workButtonClicked = (id) => {
        if (id === currentJobTab) {
            return;
        }

        const selectedExp = experiences.find((exp) => exp.id === id);
        const tabHeader = document.getElementById('tabHeader');
        if (selectedExp && tabHeader) {
            tabHeader.style.transform = `translateY(${selectedExp.tabOffset}px)`;
        }

        const exitJob = currentJobTab;
        const exitEl = document.getElementById(exitJob);
        const enterEl = document.getElementById(id);

        if (!exitEl || !enterEl) {
            setCurrentJobTab(id);
            return;
        }

        exitEl.classList.add('fade-exit-active');

        window.setTimeout(() => {
            exitEl.style.display = 'none';
            exitEl.classList.remove('fade-exit-active');
            enterEl.style.display = 'block';
            enterEl.classList.add('fade-enter-active');
            window.setTimeout(() => {
                enterEl.classList.remove('fade-enter-active');
            }, 280);
        }, 200);

        setCurrentJobTab(id);
    };

    return (
        <section
            className="section experience"
            id="experience"
            ref={sectionRef}
            style={sectionStyle}
        >
            <div className="section-inner">
                <div className="section-intro">
                    <p className="section-index">02</p>
                    <h2 className="section-heading">Work</h2>
                    <p className="section-support">
                        Places I've shipped software and led technical work.
                    </p>
                </div>

                <div className="experience-layout">
                    <div className="tabular" role="tablist" aria-label="Employers">
                        <div id="tabHeader" className="tab-indicator" />
                        {experiences.map((exp) => (
                            <button
                                key={exp.id}
                                id={`${exp.id}Button`}
                                type="button"
                                role="tab"
                                aria-selected={exp.id === currentJobTab}
                                className={`workButton ${exp.id === currentJobTab ? 'is-active' : ''}`}
                                onClick={() => workButtonClicked(exp.id)}
                            >
                                <span className="buttonText buttonText-full">{exp.displayName}</span>
                                <span className="buttonText buttonText-short">{exp.shortName}</span>
                            </button>
                        ))}
                    </div>

                    <div className="jobs-panel">
                        {experiences.map((exp, index) => (
                            <div
                                key={exp.id}
                                className="jobs"
                                id={exp.id}
                                role="tabpanel"
                                style={{ display: index === 0 ? 'block' : 'none' }}
                            >
                                <div className="job">
                                    <h3>
                                        <span>{exp.position}</span>
                                        <span className="company"> @ {exp.company}</span>
                                    </h3>
                                    <p className="job-period">{exp.period}</p>
                                    <ul className="duties">
                                        {exp.duties.map((duty, dutyIndex) => (
                                            <li key={dutyIndex} className="job-listItem">
                                                {duty}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
