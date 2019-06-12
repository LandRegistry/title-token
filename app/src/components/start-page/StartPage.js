import React from "react";

import Paragrah from "../common/Paragraph"

import Button from '@govuk-react/button';
import { ButtonArrow } from '@govuk-react/icons';
import Main from '@govuk-react/main';
import GridCol from '@govuk-react/grid-col';
import GridRow from '@govuk-react/grid-row';
import Heading from '@govuk-react/heading';
import InsetText from '@govuk-react/inset-text';

export default() => (
    <Main>
        <GridRow>
            <GridCol setWidth="two-thirds">
                <Heading>Request a token for your property</Heading>
                <Paragrah>
                    If you are the owner of a property you can request to tokenise the asset allowing you to trade 
                    the token on live market places.
                </Paragrah>
                <InsetText>
                    You’ll need to prove your identity and your ownership of the property in order to be issued with 
                    a token.
                </InsetText>
                <Button icon={<ButtonArrow />}>Start now</Button>
            </GridCol>
        </GridRow>
    </Main>
)