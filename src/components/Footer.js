import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    .footer {
        background-color: #d1d1d1;
        color: black;
        padding: 10px;
        text-align: right;
        position: relative;
        bottom: 0;
        width: 100%;
        text-color: black;
    }
`;

export const Footer = () => (
    <Wrapper>
        <div className="footer">
            <small>Matthew Weinert 2019 &#9400;</small>
        </div>
    </Wrapper>
)