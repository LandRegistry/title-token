import React from "react";

import { H1 } from "@govuk-react/heading";

import styled, { keyframes } from 'styled-components';

const StyledDiv = styled.div`
    text-align: center;
    margin: 2rem;
`

const animation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

const Spinner = styled.div`
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;

    div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 51px;
        height: 51px;
        margin: 6px;
        border: 6px solid #005ea5;
        border-radius: 50%;
        animation: ${animation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #005ea5 transparent transparent transparent;

        :nth-child(1) {
            animation-delay: -0.45s;
        }

        :nth-child(2) {
            animation-delay: -0.3s;
        }

        :nth-child(3) {
        animation-delay: -0.15s;
        }
    }
`
class Loading extends React.Component {

    render() {
        let { text } = this.props;

        if (!text) {
            text = "Loading..."
        }
    
        return(
            <StyledDiv>
                <H1>{text}</H1>
                <Spinner><div></div><div></div><div></div><div></div></Spinner>
            </StyledDiv>
        );
    }
} 


export default Loading;