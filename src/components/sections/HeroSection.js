import React from 'react';
import SocialLinks from '../common/SocialLinks';
import resume from '../../assets/resume.pdf';

const HeroSection = () => {
    return (
        <div className="left">
            <div className="header" style={{backgroundColor: "rgba(0, 0, 0, 0)"}}>
                <h2 className="home-header-1">Hi, my name is</h2>
                <div className="home">
                    <div>
                        <h2 className="home-header-2">Matt Weinert</h2>
                        <h2 className="home-header-1">and I program things.</h2>
                    </div>
                </div>
                <h3 className="home-header-4">
                    Self-starter with a drive to build and innovate.
                </h3>

                <a className="resume" href={resume} target="_blank" rel="noopener noreferrer">Resume</a>

                <div>
                    <SocialLinks />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;

