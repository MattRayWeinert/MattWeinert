import React from 'react';
import { Container } from 'react-bootstrap';

export const Layout = (props) => (
    <Container style={{maxWidth: "fit-content", display: "flex", width: "100%", padding: "0"}} >
        {props.children}
    </Container>
)