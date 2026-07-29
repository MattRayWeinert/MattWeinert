import React from 'react';
import PortfolioCarousel from '../portfolio/PortfolioCarousel';

const PortfolioSection = ({ sectionRef, sectionStyle }) => {
    return (
        <section
            className="section portfolio"
            id="portfolio"
            ref={sectionRef}
            style={sectionStyle}
        >
            <div className="section-inner section-inner-wide">
                <div className="section-intro">
                    <p className="section-index">03</p>
                    <h2 className="section-heading">Projects</h2>
                    <p className="section-support">
                        Selected work across products, platforms, and experiments.
                    </p>
                </div>
                <PortfolioCarousel />
            </div>
        </section>
    );
};

export default PortfolioSection;
