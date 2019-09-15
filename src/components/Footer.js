import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    .footer {
        background-color: #222;
        color: white;
        padding: 10px;
        text-align: right;
    }
`;

export const Footer = () => (
    <Wrapper>
        <div className="footer">
            Matthew Weinert &#9400;
        </div>
    </Wrapper>
)