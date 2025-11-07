import React from 'react';
import PortfolioCarousel from '../portfolio/PortfolioCarousel';

const PortfolioSection = ({ sectionRef, sectionStyle }) => {
    return (
        <div className="portfolio" id="portfolio" ref={sectionRef} style={sectionStyle}>
            <div className="section">
                <PortfolioCarousel />
            </div>
        </div>
    );
};

export default PortfolioSection;
