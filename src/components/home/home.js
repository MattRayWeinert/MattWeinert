import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './home.css';
import PortfolioAssistant from '../common/PortfolioAssistant';
import { experiences } from '../../data/experienceData';
import { portfolioItems } from '../../data/portfolioData';
import resume from '../../assets/resume.pdf';

const Home = () => {
    const formRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState(null);

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    const isConfigured = Boolean(serviceId && templateId && publicKey);

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
            <nav className="terminal-nav" aria-label="Primary navigation">
                <a href="#top" className="wordmark"><i /> mattweinert<span>.com</span></a>
                <div className="nav-links">
                    <a href="#projects">~/projects</a>
                    <a href="#experience">~/experience</a>
                    <a href="#contact">~/contact</a>
                </div>
                <a href={resume} className="nav-resume" target="_blank" rel="noopener noreferrer">resume ↗</a>
            </nav>

            <main>
                <section id="top" className="hero-section section-wrap">
                    <div className="hero-copy">
                        <p className="eyebrow"><i /> SENIOR ENGINEER · FULL STACK · APPLICATION DEVELOPER</p>
                        <h1><span>$</span> hi, I&apos;m <strong>Matt.</strong></h1>
                        <p className="role">fullStackEngineer <b>|</b> UCF Computer Engineering</p>
                        <p className="hero-description">
                            I design and ship <em>AI-powered full-stack applications</em> at BNY—Angular and Spring Boot systems,
                            production AI agents, and executive-facing tools that turn complex financial data into decisions.
                            Before that I built mission-critical software for Army, Marine, and training platforms.
                        </p>
                        <div className="hero-actions">
                            <a href="#contact" className="primary-button">→ get in touch</a>
                            <a href="#projects" className="secondary-button">$ cd projects</a>
                        </div>
                        <div className="social-quicklinks">
                            <a href="https://github.com/MattRayWeinert" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                            <a href="https://www.linkedin.com/in/matthew-weinert-37b47b170/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
                        </div>
                    </div>
                    <PortfolioAssistant />
                </section>

                <section id="projects" className="section-wrap content-section">
                    <div className="section-label"><span>01</span> FEATURED WORK</div>
                    <h2>Selected projects</h2>
                    <div className="project-grid">
                        {portfolioItems.slice(0, 3).map((project, index) => (
                            <article className="project-card" key={project.id}>
                                <p className="project-number">[{String(index + 1).padStart(2, '0')}]</p>
                                <h3>{project.title}</h3>
                                <p className="project-meta">{project.technologies.slice(0, 3).join(' · ')}</p>
                                <p>{project.description}</p>
                                <div className="project-tags">
                                    {project.technologies.slice(0, 4).map((technology) => <span key={technology}>{technology}</span>)}
                                </div>
                                {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer">↗ view project</a>}
                            </article>
                        ))}
                    </div>
                </section>

                <section id="experience" className="section-wrap content-section experience-section">
                    <div className="section-label"><span>02</span> EXPERIENCE</div>
                    <h2>From training systems to web applications.</h2>
                    <ol className="career-timeline">
                        {experiences.map((experience, index) => {
                            const side = index % 2 === 0 ? 'is-left' : 'is-right';
                            const isCurrent = experience.id === 'BNYM';
                            const employment = experience.id === 'DignitasTechnologies' ? 'Internship' : 'Full-time';
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
                                        {experience.tags?.length > 0 && (
                                            <ul className="career-card-tags">
                                                {experience.tags.map((tag) => (
                                                    <li key={tag}>{tag}</li>
                                                ))}
                                            </ul>
                                        )}
                                        <ul className="career-card-duties">
                                            {experience.duties.map((duty) => (
                                                <li key={duty}>{duty}</li>
                                            ))}
                                        </ul>
                                    </article>
                                </li>
                            );
                        })}
                    </ol>
                </section>

                <section id="contact" className="section-wrap contact-section">
                    <div>
                        <div className="section-label"><span>03</span> GET IN TOUCH</div>
                        <h2>Let&apos;s build something.</h2>
                        <a className="email-link" href="mailto:MatthewRaymondWeinert@gmail.com">MatthewRaymondWeinert@gmail.com <span>→</span></a>
                        <p className="contact-detail">
                            status&nbsp; <b>open to conversations</b><br />
                            location&nbsp; Pittsburgh, PA<br />
                            email&nbsp; <a href="mailto:MatthewRaymondWeinert@gmail.com">MatthewRaymondWeinert@gmail.com</a><br />
                            github&nbsp; <a href="https://github.com/MattRayWeinert" target="_blank" rel="noopener noreferrer">MattRayWeinert</a><br />
                            linkedin&nbsp; <a href="https://www.linkedin.com/in/matthew-weinert-37b47b170/" target="_blank" rel="noopener noreferrer">/in/matthew-weinert</a>
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
            <footer className="terminal-footer">© {new Date().getFullYear()} Matt Weinert · Full Stack App Developer <span>mattweinert.com</span></footer>
        </div>
    );
};

export default Home;
