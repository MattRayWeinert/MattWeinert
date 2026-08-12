import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './home.css';
import PortfolioAssistant from '../common/PortfolioAssistant';
import { experiences } from '../../data/experienceData';
import { getGithubRepo, getYoutubeEmbedId, portfolioItems } from '../../data/portfolioData';
import useIsMobile from '../../hooks/useIsMobile';
import resume from '../../assets/resume.pdf';

const ORBS = [
    { x: '6%', size: 3, dur: 16, delay: 0, peak: 0.55, drift: '10px' },
    { x: '14%', size: 2, dur: 21, delay: 2.5, peak: 0.4, drift: '-14px' },
    { x: '22%', size: 5, dur: 18, delay: 6, peak: 0.48, drift: '18px' },
    { x: '31%', size: 2.5, dur: 23, delay: 1, peak: 0.35, drift: '-8px' },
    { x: '39%', size: 4, dur: 17, delay: 8, peak: 0.5, drift: '12px' },
    { x: '47%', size: 2, dur: 20, delay: 4, peak: 0.42, drift: '-20px' },
    { x: '55%', size: 6, dur: 22, delay: 10, peak: 0.45, drift: '6px' },
    { x: '63%', size: 2.5, dur: 15, delay: 3, peak: 0.38, drift: '-12px' },
    { x: '71%', size: 3.5, dur: 19, delay: 7, peak: 0.5, drift: '16px' },
    { x: '78%', size: 5, dur: 24, delay: 12, peak: 0.4, drift: '-6px' },
    { x: '86%', size: 2, dur: 18, delay: 5, peak: 0.36, drift: '14px' },
    { x: '93%', size: 4, dur: 21, delay: 9, peak: 0.44, drift: '-10px' },
    { x: '11%', size: 2.5, dur: 14, delay: 11, peak: 0.32, drift: '8px' },
    { x: '28%', size: 7, dur: 25, delay: 13, peak: 0.38, drift: '-16px' },
    { x: '58%', size: 3, dur: 16, delay: 2, peak: 0.4, drift: '20px' },
    { x: '82%', size: 4.5, dur: 20, delay: 14, peak: 0.46, drift: '-18px' },
    { x: '43%', size: 2, dur: 19, delay: 15.5, peak: 0.34, drift: '9px' },
    { x: '67%', size: 5.5, dur: 23, delay: 0.8, peak: 0.42, drift: '-11px' },
];

const NAV_SECTIONS = [
    { id: 'top', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
];

const Home = () => {
    const formRef = useRef(null);
    const isMobile = useIsMobile();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState(null);
    const [shellOpen, setShellOpen] = useState(false);
    const [shellReady, setShellReady] = useState(false);
    const [activeSection, setActiveSection] = useState('top');
    const navLockRef = useRef(null);
    const navUnlockTimerRef = useRef(null);

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    const isConfigured = Boolean(serviceId && templateId && publicKey);

    useEffect(() => {
        if (!shellOpen) return undefined;
        const onKeyDown = (event) => {
            if (event.key === 'Escape') setShellOpen(false);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [shellOpen]);

    useEffect(() => {
        if (isMobile) setShellOpen(false);
    }, [isMobile]);

    useEffect(() => {
        const hash = window.location.hash.replace('#', '');
        if (!hash) return undefined;
        const target = document.getElementById(hash);
        if (!target) return undefined;
        const timer = window.setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
        return () => window.clearTimeout(timer);
    }, []);

    useEffect(() => {
        const sections = NAV_SECTIONS
            .map(({ id }) => document.getElementById(id))
            .filter(Boolean);

        if (!sections.length) return undefined;

        const observer = new IntersectionObserver(
            (entries) => {
                if (navLockRef.current) return;

                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (visible[0]?.target?.id) {
                    setActiveSection(visible[0].target.id);
                }
            },
            {
                rootMargin: '-20% 0px -55% 0px',
                threshold: [0.1, 0.25, 0.5, 0.75],
            }
        );

        sections.forEach((section) => observer.observe(section));
        return () => {
            observer.disconnect();
            if (navUnlockTimerRef.current) {
                window.clearTimeout(navUnlockTimerRef.current);
            }
        };
    }, []);

    const openShell = () => {
        setShellReady(true);
        setShellOpen(true);
    };

    const goToSection = (event, id) => {
        event.preventDefault();
        const target = document.getElementById(id);
        if (!target) return;

        setActiveSection(id);
        navLockRef.current = id;
        if (navUnlockTimerRef.current) {
            window.clearTimeout(navUnlockTimerRef.current);
        }

        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', `#${id}`);

        navUnlockTimerRef.current = window.setTimeout(() => {
            navLockRef.current = null;
        }, 900);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isConfigured) {
            setStatus('error');
            return;
        }

        setIsSubmitting(true);
        setStatus(null);

        try {
            await emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey });
            setStatus('success');
            formRef.current.reset();
        } catch (error) {
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="home-wrapper">
            <div className="ambient-glow" aria-hidden="true" />
            <div className="starfield" aria-hidden="true" />
            <div className="orb-field" aria-hidden="true">
                {ORBS.map((orb, index) => (
                    <span
                        key={index}
                        className="orb"
                        style={{
                            '--x': orb.x,
                            '--size': `${orb.size}px`,
                            '--dur': `${orb.dur}s`,
                            '--delay': `${orb.delay}s`,
                            '--peak': orb.peak,
                            '--drift': orb.drift,
                        }}
                    />
                ))}
            </div>

            <header className="site-top">
                <nav className="site-nav" aria-label="Primary navigation">
                    {NAV_SECTIONS.map(({ id, label }) => (
                        <a
                            key={id}
                            href={`#${id}`}
                            className={activeSection === id ? 'is-active' : undefined}
                            aria-current={activeSection === id ? 'true' : undefined}
                            onClick={(event) => goToSection(event, id)}
                        >
                            {label}
                        </a>
                    ))}
                    <a href={resume} className="nav-resume" target="_blank" rel="noopener noreferrer">
                        Resume
                    </a>
                </nav>
            </header>

            <main>
                <section id="top" className="hero-section">
                    <a
                        href={resume}
                        className="mobile-resume"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Resume
                    </a>
                    <div className="hero-copy">
                        <p className="hero-greeting">Hey, I&apos;m</p>
                        <h1 className="hero-brand">
                            Matt
                            <br className="hero-name-break" />
                            {' '}
                            Weinert
                        </h1>
                        <p className="hero-role">Full Stack Developer</p>
                        <p className="hero-tagline">
                            I build software products that deliver <em>real impact</em>
                        </p>
                        <div className="hero-actions">
                            <a
                                href="#contact"
                                className="hero-connect"
                                onClick={(event) => goToSection(event, 'contact')}
                            >
                                Let&apos;s Connect <span aria-hidden="true">→</span>
                            </a>
                            <button
                                type="button"
                                className="hero-scroll"
                                onClick={(event) => goToSection(event, 'projects')}
                            >
                                See work
                            </button>
                        </div>
                    </div>
                </section>

                <section id="projects" className="section-wrap content-section">
                    <div className="section-label"><span>01</span> FEATURED WORK</div>
                    <h2>Selected projects</h2>
                    <div className="project-grid">
                        {portfolioItems.filter((project) => project.featured).map((project) => {
                            const repo = getGithubRepo(project);
                            const hasRepo = Boolean(repo);
                            const isPrivate = Boolean(project.private);
                            const githubUrl = hasRepo ? `https://github.com/${repo}` : null;
                            const openLabel = isPrivate
                                ? 'Private'
                                : hasRepo
                                    ? (isMobile ? '↗ GitHub' : '↗ explore code')
                                    : project.link
                                        ? `↗ ${project.linkLabel || 'view project'}`
                                        : null;
                            const content = (
                                <>
                                    <div className="project-card-top">
                                        <h3>{project.title}</h3>
                                        {isPrivate && <span className="project-private-badge">Private</span>}
                                    </div>
                                    <p className="project-meta">{project.technologies.slice(0, 3).join(' · ')}</p>
                                    <p>{project.description}</p>
                                    <div className="project-tags">
                                        {project.technologies.slice(0, 4).map((technology) => (
                                            <span key={technology}>{technology}</span>
                                        ))}
                                    </div>
                                    {openLabel && (
                                        <span className={`project-open${isPrivate ? ' is-private' : ''}`}>
                                            {openLabel}
                                        </span>
                                    )}
                                </>
                            );

                            if (isPrivate) {
                                return (
                                    <article className="project-card is-private" key={project.id}>
                                        {content}
                                    </article>
                                );
                            }

                            const youtubeId = getYoutubeEmbedId(project.link);
                            // Mobile never uses the in-site code explorer; app links (e.g. Skedit)
                            // always go straight to the external URL.
                            const useExternal = Boolean(
                                (isMobile && (githubUrl || project.link))
                                || (!hasRepo && project.link && !youtubeId)
                            );

                            if (useExternal) {
                                const href = githubUrl || project.link;
                                return (
                                    <a
                                        className="project-card"
                                        key={project.id}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {content}
                                    </a>
                                );
                            }

                            if (!hasRepo && !project.link) {
                                return (
                                    <article className="project-card is-static" key={project.id}>
                                        {content}
                                    </article>
                                );
                            }

                            return (
                                <Link
                                    className="project-card"
                                    key={project.id}
                                    to={`/projects/${project.id}`}
                                >
                                    {content}
                                </Link>
                            );
                        })}
                    </div>
                </section>

                <section id="experience" className="section-wrap content-section experience-section">
                    <div className="section-label"><span>02</span> EXPERIENCE</div>
                    <h2>From defense contracting to finance</h2>
                    <ol className="career-timeline">
                        {experiences.map((experience, index) => {
                            const side = index % 2 === 0 ? 'is-left' : 'is-right';
                            const isCurrent = experience.id === 'BNYM';
                            const employment = experience.id === 'DignitasTechnologies' ? 'Internship' : 'Full-time';
                            const tags = experience.tags?.length > 0 ? (
                                <ul className="career-card-tags">
                                    {experience.tags.map((tag) => (
                                        <li key={tag}>{tag}</li>
                                    ))}
                                </ul>
                            ) : null;
                            const duties = (
                                <ul className="career-card-duties">
                                    {experience.duties.map((duty) => (
                                        <li key={duty}>{duty}</li>
                                    ))}
                                </ul>
                            );
                            return (
                                <li
                                    key={experience.id}
                                    className={`career-timeline-item ${side} ${isCurrent ? 'is-current' : ''}`}
                                >
                                    <span className="career-timeline-node" aria-hidden="true" />
                                    <article className="career-card">
                                        <header className="career-card-header">
                                            <div className="career-card-heading">
                                                <h3>{experience.position}</h3>
                                                <span className="career-card-company">{experience.company}</span>
                                            </div>
                                            <div className="career-card-meta">
                                                <p>
                                                    <em>{employment}</em>
                                                    {isCurrent && <span className="career-card-now"> · Present</span>}
                                                </p>
                                                <time>{experience.period}</time>
                                            </div>
                                        </header>
                                        {isMobile ? (
                                            <details className="career-more">
                                                <summary>Details</summary>
                                                {tags}
                                                {duties}
                                            </details>
                                        ) : (
                                            <>
                                                {tags}
                                                {duties}
                                            </>
                                        )}
                                    </article>
                                </li>
                            );
                        })}
                    </ol>
                </section>

                <section id="contact" className="section-wrap contact-section">
                    <div>
                        <div className="section-label"><span>03</span> GET IN TOUCH</div>
                        <h2>Let&apos;s build something</h2>
                        <a className="email-link" href="mailto:MatthewRaymondWeinert@gmail.com">
                            MatthewRaymondWeinert@gmail.com <span>→</span>
                        </a>
                        <p className="contact-detail">
                            status&nbsp; <b>open to conversations</b><br />
                            location&nbsp; Orlando, FL<br />
                            email&nbsp; <a href="mailto:MatthewRaymondWeinert@gmail.com">MatthewRaymondWeinert@gmail.com</a><br />
                            github&nbsp; <a href="https://github.com/MattRayWeinert" target="_blank" rel="noopener noreferrer">MattRayWeinert</a><br />
                            linkedin&nbsp; <a href="https://www.linkedin.com/in/matt-weinert/" target="_blank" rel="noopener noreferrer">/in/matt-weinert</a>
                        </p>
                    </div>
                    <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
                        <input type="hidden" name="to_email" value="MatthewRaymondWeinert@gmail.com" />
                        <label>Name <i>*</i><input name="name" type="text" required autoComplete="name" /></label>
                        <label>Email <i>*</i><input name="email" type="email" required autoComplete="email" /></label>
                        <label>Message <i>*</i><textarea name="message" placeholder="What are you building?" required rows="5" /></label>
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending…' : '→ send message'}
                        </button>
                        {!isConfigured && (
                            <p className="form-status form-status-warning">
                                Email is not configured yet. Please add EmailJS keys to your environment.
                            </p>
                        )}
                        {status === 'success' && (
                            <p className="form-status form-status-success">Thanks! Your message has been sent.</p>
                        )}
                        {status === 'error' && isConfigured && (
                            <p className="form-status form-status-error">Sorry, something went wrong. Please try again.</p>
                        )}
                    </form>
                </section>
            </main>

            <footer className="terminal-footer section-wrap">
                © {new Date().getFullYear()} Matt Weinert · Full Stack Developer <span>mattweinert.com</span>
            </footer>

            <div className={`shell-dock ${shellOpen ? 'is-open' : ''}`}>
                {shellReady && (
                    <div
                        id="shell-panel"
                        className={`shell-panel ${shellOpen ? 'is-visible' : ''}`}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Interactive shell"
                        aria-hidden={!shellOpen}
                    >
                        <PortfolioAssistant />
                    </div>
                )}
                <button
                    type="button"
                    className="shell-fab"
                    onClick={() => (shellOpen ? setShellOpen(false) : openShell())}
                    aria-expanded={shellOpen}
                    aria-controls="shell-panel"
                    aria-label={shellOpen ? 'Close shell' : 'Open shell'}
                >
                    {shellOpen ? (
                        <span aria-hidden="true">×</span>
                    ) : (
                        <>
                            <span className="shell-fab-prompt" aria-hidden="true">$</span>
                            <span className="shell-fab-label">shell</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default Home;
