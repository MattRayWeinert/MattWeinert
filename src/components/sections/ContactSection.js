import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactSection = ({ sectionRef, sectionStyle }) => {
    const formRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error' | null

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    const isConfigured = Boolean(serviceId && templateId && publicKey);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isConfigured) {
            setStatus('error');
            return;
        }
        setIsSubmitting(true);
        setStatus(null);
        try {
            await emailjs.sendForm(serviceId, templateId, formRef.current, {
                publicKey,
            });
            setStatus('success');
            formRef.current.reset();
        } catch (err) {
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="section" ref={sectionRef} style={sectionStyle}>
            <div className="body">
                <h2 className="section-heading">What's next?</h2>
                <div className="inner" style={{display: "block"}}>
                    <h2 className="contact-header">Get In Touch</h2>
                    <p className="contact-p">
                        Although I currently hold a position, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>
                    <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
                        {/* Hidden fallback recipient to help template mapping if used */}
                        <input type="hidden" name="to_email" value="MatthewRaymondWeinert@gmail.com" />
                        <div className="form-row">
                            <div className="form-field">
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="input"
                                    placeholder="Your name"
                                    required
                                    autoComplete="name"
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="input"
                                    placeholder="you@example.com"
                                    required
                                    autoComplete="email"
                                />
                            </div>
                        </div>
                        <div className="form-field">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                className="textarea"
                                rows="6"
                                placeholder="Write your message..."
                                required
                            />
                        </div>
                        <button type="submit" className="submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending…' : 'Send Message'}
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
                    {/* Fallback mailto link */}
                    <div className="contact-direct-wrapper">
                        <span className="contact-divider">or</span>
                        <a className="contact-direct-link" href="mailto:MatthewRaymondWeinert@gmail.com" rel="noopener noreferrer" target="_blank">
                            <svg className="contact-email-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Contact me directly
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;

