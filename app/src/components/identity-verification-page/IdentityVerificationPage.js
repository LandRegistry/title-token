import React from "react";
import styled from "styled-components";
import { Link as RouterLink } from 'react-router-dom';

import Paragraph from "../common/Paragraph"
import StyledInput from '../common/StyledInput';

import Button from '@govuk-react/button';
import DateField from '@govuk-react/date-field';
import LabelText from '@govuk-react/label-text';
import Link from '@govuk-react/link';
import Main from '@govuk-react/main';
import GridCol from '@govuk-react/grid-col';
import GridRow from '@govuk-react/grid-row';
import Heading from '@govuk-react/heading';

const StyledParagraph = styled(Paragraph)`
    padding-bottom: 20px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;

export default() => (
    <Main>
        <GridRow>
            <GridCol setWidth="two-thirds">
                <Heading>Identity verification</Heading>
                <StyledParagraph>
                    Complete the form below to submit identity verification
                </StyledParagraph>
                <LabelText>
                    Full name
                    <StyledInput />
                </LabelText>
                <DateField
                    hintText="For example, 31 03 1980"
                >
                    Date of birth
                </DateField>
                <StyledLink as={RouterLink} to="/wallet-address/">
                    <Button>Continue</Button>
                </StyledLink>
            </GridCol>
        </GridRow>
    </Main>
)