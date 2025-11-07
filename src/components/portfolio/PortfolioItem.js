import React, { useState } from 'react';

const PortfolioItem = ({ item, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isEven = index % 2 === 0;

    return (
        <li className={`proj-list-item ${isExpanded ? 'expanded' : ''}`}>
            <div 
                className={`project-card ${isEven ? 'project-left' : 'project-right'}`}
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
            >
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="project-link">
                    <div className="project-content">
                        <div className="project-image-wrapper">
                            <img src={item.image} className="proj-image" alt={item.alt} />
                            <div className="image-overlay">
                                <svg className="external-link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                        </div>
                        
                        <div className="project-details">
                            <div className="project-header-section">
                                <h3 className="proj-header">{item.title}</h3>
                                <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                            
                            <p className="project-description">{item.description}</p>
                            
                            <ul className="project-tech-stack">
                                {item.technologies.map((tech, techIndex) => (
                                    <li key={techIndex} className="tech-tag">{tech}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </a>
            </div>
        </li>
    );
};

export default PortfolioItem;
