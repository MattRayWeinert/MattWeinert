import React from 'react';

const Footer = () => {
    return (
        <div className="footer" id="footer">
            <div className="section">
                <div className="body" style={{backgroundColor: "rgba(0,0,0,0)", minHeight: "60px", margin: "auto"}}>
                    <footer>
                        <a href="https://github.com/MattRayWeinert/mw" className="footer-href" target="_blank" rel="noopener noreferrer">
                            <div>
                                Designed & Built by Matthew Weinert
                            </div>
                        </a>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Footer;

