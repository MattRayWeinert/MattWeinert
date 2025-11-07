import React from 'react';

const ContactSection = ({ sectionRef, sectionStyle }) => {
    return (
        <div className="section" ref={sectionRef} style={sectionStyle}>
            <div className="body">
                <h2 className="section-heading">What's next?</h2>
                <div className="inner" style={{display: "block"}}>
                    <h2 className="contact-header">Get In Touch</h2>
                    <p className="contact-p">
                        Although I currently hold a position, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>
                    <div className="ext-link-wrapper">
                        <a className="ext-link" href="mailto:MatthewRaymondWeinert@gmail.com" rel="noopener noreferrer" target="_blank">
                            Say Hello
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;

