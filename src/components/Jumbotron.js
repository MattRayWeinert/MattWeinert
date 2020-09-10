import React from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components';
import jumbo from '../assets/desert.jpg';

const Styles = styled.div`
  .jumbo {
    background: url(${jumbo}) no-repeat fixed bottom;
    background-size: cover;
    color: #efefef;
    height: 200px;
    position: relative;
    z-index: 99;
  }
  .overlay {
    background-color: #000;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
  .p {
    padding-left: 75px;
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
    background: cornsilk;
  }
`;

export const Jumbotron = () => (
  <Styles style={{marginTop: "59px"}} >
    <Jumbo fluid className="jumbo">
      <div className="overlay"></div>
      <Container style={{textAlign: "center"}}>
        <h1 style={{color: "white", fontWeight: "850", letterSpacing: "0.1em", fontWeight: "850", fontSize: "3em"}}>Matt Weinert</h1>
        <div className="centered line"></div><br></br>
        <h5 style={{letterSpacing: "0.1em", textTransform: "uppercase"}}>Computer & Software Engineer</h5>
      </Container>
    </Jumbo>
  </Styles>
)