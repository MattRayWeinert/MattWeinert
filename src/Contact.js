import React, { Component } from 'react';
import Styled from 'styled-components';
import { Button } from 'react-bootstrap';

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
    background: plum;
  }

  .contactForm {
      text-align: center;
  }

  .contactForm {
    background-color: #333333;
    overflow-wrap: break-word;
    padding: 10px;
  }

`;

export const Contact = () => (
<Styles style={{marginTop: "59px"}}>
  <div className="contactForm">
      <form action="/contact" id="contact-form" method="post" role="form">
          <fieldset style={{marginBottom: "175px"}}>
            <div className="contact" style={{color: "plum"}}><h2>Let's get in touch</h2></div>
            <div className="centered line"></div><br></br>
              <input style={{width: 700, height: 45, border: "1px solid rgba(0,0,0,0.125)", borderRadius: "0.3rem", fontStyle:"italic"}} id="name" name="name" type="text" placeholder="Name" required="required" /><br/><br/>
              <input style={{width: 700, height: 45, border: "1px solid rgba(0,0,0,0.125)", borderRadius: "0.3rem", fontStyle:"italic"}} id="email" name="email" type="text" placeholder="Email" required="required" /><br/><br/>
              <textarea style={{width: 700, height: 200, border: "1px solid rgba(0,0,0,0.125)", borderRadius: "0.3rem", fontStyle:"italic"}} id="message" name="message" placeholder="Your message" rows="3" required="required"></textarea><br/><br/>
              <Button type="subimt" variant="secondary">Submit</Button>
          </fieldset>
      </form>
  </div>
</Styles>
)