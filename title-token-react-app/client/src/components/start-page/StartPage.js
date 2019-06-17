import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components'

import Paragraph from "../common/Paragraph"

import Button from '@govuk-react/button';
import { ButtonArrow } from '@govuk-react/icons';
import Link from '@govuk-react/link';
import Main from '@govuk-react/main';
import GridCol from '@govuk-react/grid-col';
import GridRow from '@govuk-react/grid-row';
import Heading from '@govuk-react/heading';
import InsetText from '@govuk-react/inset-text';

const StyledLink = styled(Link)`
    text-decoration: none;
`;

export default() => (
    <Main>
        <GridRow>
            <GridCol setWidth="two-thirds">
                <Heading>Request a token for your property</Heading>
                <Paragraph>
                    If you are the owner of a property you can request to tokenise the asset allowing you to trade 
                    the token on live market places.
                </Paragraph>
                <InsetText>
                    You’ll need to prove your identity and your ownership of the property in order to be issued with 
                    a token.
                </InsetText>
                <StyledLink as={RouterLink} to="/idv/">
                    <Button icon={<ButtonArrow />}>Start now</Button>
                </StyledLink>
            </GridCol>
        </GridRow>
    </Main>
)