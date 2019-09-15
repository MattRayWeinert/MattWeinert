import React, { Component } from 'react';
import Styled from 'styled-components';

const Styles = Styled.div`
 .contact {
    margin-left: auto;
    margin-right: auto;
    float: none;
    margin: 0 0 15px 0;
    text-transform: uppercase;
    text-align: center;
    display: block;
    letter-spacing: 0.1em;
    font-wight: 300;
 }

 .line2 {
  display: block;
  width: 3px;
  height: 290px;
  padding: 0!important;
  background: #ccc;
 }

 .centered {
    margin-left: auto;
    margin-right: auto;
    float: none;
  }

  .line {
    display: block;
    width: 290px;
    height: 3px;
    padding: 0!important;
    background: #ccc;
  }

  .contactForm {
      text-align: center;
  }

  .contactForm {
    background-color: #f7f7f7;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
    overflow-wrap: break-word;
    padding: 10px;
    margin: 15px;
  }
`;

export const Contact = () => (
<Styles>
    <div className="contact"><h2>Contact</h2></div>
    <div className="centered line"></div><br></br>

    <div className="contactForm">
        <form action="/contact" id="contact-form" method="post" role="form">
            <fieldset>
                <label for="name">Name:*<t></t> </label><br></br>
                <input style={{width: 250, height: 30}} id="name" name="name" type="text" placeholder="Your name" required="required" /><br></br>
                <label for="email">Email:*<t></t> </label><br></br>
                <input style={{width: 250, height: 30}} id="email" name="email" type="text" placeholder="Your email" required="required" /><br></br>
                <label for="message">Message:*<t></t> </label><br></br>
                <textarea style={{width: 550, height: 150}} id="message" name="message" placeholder="Enter your message here" rows="3" required="required"></textarea><br></br>
                <button type="submit">Submit</button><br></br>
            </fieldset>
        </form>
    </div>
</Styles>
)