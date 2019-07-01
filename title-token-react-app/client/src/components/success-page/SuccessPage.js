import React, { useState } from "react";
import styled from "styled-components";
import { Link as RouterLink } from 'react-router-dom';

import Paragraph from "../common/Paragraph"

import GridCol from '@govuk-react/grid-col';
import GridRow from '@govuk-react/grid-row';
import InsetText from '@govuk-react/inset-text';
import Link from '@govuk-react/link';
import Main from '@govuk-react/main';
import Panel from '@govuk-react/panel';

const StyledParagraph = styled(Paragraph)`
    padding-top: 20px;
`;

const SuccessPage = () => {

    const [tokenId] = useState(localStorage.getItem('tokenId'))
    localStorage.setItem('fullName', '');
    localStorage.setItem('day', '');
    localStorage.setItem('month', '');
    localStorage.setItem('year', '');
    localStorage.setItem('titleId', '');
    localStorage.setItem('walletAddress', '');

    return (
        <Main>
            <GridRow>
                <GridCol>
                    <Panel title="Token issued">
                        Your token ID:<br />
                        <strong>{localStorage.getItem('tokenId')}</strong>
                    </Panel>
                </GridCol>
            </GridRow>
            <GridRow>
                <GridCol setWidth="two-thirds">
                    <StyledParagraph>
                        Your identity has been verified and your token has been issued to your digital wallet.
                    </StyledParagraph>
                    <InsetText>
                        To <strong>burn</strong> your title token&nbsp;
                        <Link as={RouterLink} to="#">click here</Link>
                        &nbsp;and it will be permanantly deleted. You may request a new token for the same title at a 
                        later date.
                    </InsetText>
                    <Link as={RouterLink} to="/dashboard/">
                        View your token details
                    </Link>
                </GridCol>
            </GridRow>
        </Main>
    )
    }

export default SuccessPage