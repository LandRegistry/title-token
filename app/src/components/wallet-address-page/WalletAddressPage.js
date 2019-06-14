import React from "react";
import styled from "styled-components";
import { Link as RouterLink } from 'react-router-dom';

import StyledInput from '../common/StyledInput';

import Button from '@govuk-react/button';
import LabelText from '@govuk-react/label-text';
import Link from '@govuk-react/link';
import Main from '@govuk-react/main';
import GridCol from '@govuk-react/grid-col';
import GridRow from '@govuk-react/grid-row';
import Heading from '@govuk-react/heading';

const StyledLink = styled(Link)`
    text-decoration: none;
`;

export default() => (
    <Main>
        <GridRow>
            <GridCol setWidth="two-thirds">
                <Heading>Digital wallet address</Heading>
                <LabelText>
                    Enter digital wallet address e.g. 0xSLRHtKNngkdXEeobR76b53LETtpyT 
                    <StyledInput></StyledInput>
                </LabelText>
                <StyledLink as={RouterLink} to="/success/">
                    <Button>Continue</Button>
                </StyledLink>
            </GridCol>
        </GridRow>
    </Main>
)