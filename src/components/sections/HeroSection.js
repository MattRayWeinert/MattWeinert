import React, { useEffect, useState } from 'react';
import SocialLinks from '../common/SocialLinks';
import resume from '../../assets/resume.pdf';
import heroVisual from '../../assets/balder.png';

const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Work' },
    { href: '#portfolio', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
];

const HeroSection = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="hero">
            <nav className={`site-nav ${scrolled ? 'is-scrolled' : ''}`} aria-label="Primary">
                <a className="nav-brand" href="#top" onClick={closeMenu}>
                    MW
                </a>
                <button
                    className={`nav-toggle ${menuOpen ? 'is-open' : ''}`}
                    type="button"
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    <span />
                    <span />
                </button>
                <div className={`nav-panel ${menuOpen ? 'is-open' : ''}`}>
                    <ul className="nav-links">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <a href={link.href} onClick={closeMenu}>
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <a
                        className="nav-resume"
                        href={resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMenu}
                    >
                        Resume
                    </a>
                </div>
            </nav>

            <section className="hero-stage" id="top">
                <div
                    className="hero-visual"
                    style={{ backgroundImage: `url(${heroVisual})` }}
                    role="img"
                    aria-label="Screenshot of Baldr trading interface"
                />
                <div className="hero-scrim" aria-hidden="true" />
                <div className="hero-content">
                    <h1 className="hero-name">
                        Matt
                        <span className="hero-name-break">Weinert</span>
                    </h1>
                    <p className="hero-headline">Full-stack software developer</p>
                    <p className="hero-lede">
                        Building reliable products, clear interfaces, and systems that scale.
                    </p>
                    <div className="hero-actions">
                        <a className="btn btn-primary" href="#portfolio">
                            View projects
                        </a>
                        <a
                            className="btn btn-secondary"
                            href={resume}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Resume
                        </a>
                    </div>
                    <SocialLinks />
                </div>
            </section>
        </header>
    );
};

export default HeroSection;
