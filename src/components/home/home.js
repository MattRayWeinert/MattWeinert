import React from 'react';
import './home.css';
import { useInView } from 'react-intersection-observer';
import BackgroundAnimation from '../common/BackgroundAnimation';
import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import ExperienceSection from '../sections/ExperienceSection';
import PortfolioSection from '../sections/PortfolioSection';
import ContactSection from '../sections/ContactSection';
import Footer from '../common/Footer';

const Home = () => {
    const [ref, inView] = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });
    
    const [ref2, inView2] = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });
    
    const [ref3, inView3] = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    const divStyle = {
        opacity: inView ? 1 : 0,
        transition: 'opacity 0.6s ease-in',
    };

    const divStyle2 = {
        opacity: inView2 ? 1 : 0,
        transition: 'opacity 0.6s ease-in',
    };

    const divStyle3 = {
        opacity: inView3 ? 1 : 0,
        transition: 'opacity 0.6s ease-in',
    };

    return (
        <div className="home-wrapper">
            <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu:regular,bold&subset=Latin" />
            
            <BackgroundAnimation />

            <div className="container" style={{width: "100%", justifyContent: "space-evenly"}}>
                <HeroSection />

                <div className="right">
                    <AboutSection />
                    <ExperienceSection sectionRef={ref} sectionStyle={divStyle} />
                    <PortfolioSection sectionRef={ref2} sectionStyle={divStyle2} />
                    <ContactSection sectionRef={ref3} sectionStyle={divStyle3} />
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Home;
