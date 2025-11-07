import React, { useState, useEffect, useRef } from 'react';
import { portfolioItems } from '../../data/portfolioData';

const PortfolioCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const carouselRef = useRef(null);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % portfolioItems.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Touch/Mouse drag handlers
    const handleDragStart = (e) => {
        setIsDragging(true);
        setStartX(e.type === 'mousedown' ? e.pageX : e.touches[0].pageX);
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;
        const currentX = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
        const diff = currentX - startX;
        setTranslateX(diff);
    };

    const handleDragEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        
        if (translateX > 100) {
            prevSlide();
        } else if (translateX < -100) {
            nextSlide();
        }
        setTranslateX(0);
    };

    const getCardPosition = (index) => {
        const diff = index - currentIndex;
        const totalCards = portfolioItems.length;
        
        // Normalize diff to handle circular array
        let normalizedDiff = diff;
        if (Math.abs(diff) > totalCards / 2) {
            normalizedDiff = diff > 0 ? diff - totalCards : diff + totalCards;
        }
        
        return normalizedDiff;
    };

    return (
        <div className="carousel-container">
            <div className="carousel-header">
                <h2 className="section-heading">Featured Projects</h2>
            </div>

            <div 
                className="carousel-wrapper"
                ref={carouselRef}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
            >
                <div className="carousel-track">
                    {portfolioItems.map((item, index) => {
                        const position = getCardPosition(index);
                        const isActive = position === 0;
                        const isVisible = Math.abs(position) <= 2;
                        
                        return (
                            <div
                                key={item.id}
                                className={`carousel-card ${isActive ? 'active' : ''} ${!isVisible ? 'hidden' : ''}`}
                                style={{
                                    transform: `
                                        translateX(calc(${position * 110}% + ${translateX}px))
                                        scale(${isActive ? 1 : 0.85})
                                        rotateY(${position * -15}deg)
                                    `,
                                    zIndex: 100 - Math.abs(position),
                                    opacity: isActive ? 1 : 0.6,
                                }}
                                onClick={() => !isActive && goToSlide(index)}
                            >
                                <a 
                                    href={item.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="carousel-card-link"
                                    onClick={(e) => !isActive && e.preventDefault()}
                                >
                                    <div className="carousel-card-image-wrapper">
                                        <img 
                                            src={item.image} 
                                            alt={item.alt} 
                                            className="carousel-card-image"
                                        />
                                        <div className="carousel-image-gradient"></div>
                                    </div>
                                    
                                    <div className="carousel-card-content">
                                        <h3 className="carousel-card-title">
                                            {item.title}
                                            <svg className="carousel-external-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd"></path>
                                            </svg>
                                        </h3>
                                        <p className="carousel-card-description">
                                            {item.description}
                                        </p>
                                        <div className="carousel-tech-tags">
                                            {item.technologies.map((tech, techIndex) => (
                                                <span key={techIndex} className="carousel-tech-tag">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Navigation Arrows */}
            <button 
                className="carousel-nav carousel-nav-prev" 
                onClick={prevSlide}
                aria-label="Previous project"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button 
                className="carousel-nav carousel-nav-next" 
                onClick={nextSlide}
                aria-label="Next project"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dot Indicators */}
            <div className="carousel-indicators">
                {portfolioItems.map((_, index) => (
                    <button
                        key={index}
                        className={`carousel-dot ${currentIndex === index ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to project ${index + 1}`}
                    />
                ))}
            </div>

        </div>
    );
};

export default PortfolioCarousel;

