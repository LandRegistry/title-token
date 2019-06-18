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

class WalletAddressPage extends React.Component {
    
    state = {
        walletAddressInput: '',
        loading: false,
        error: ''
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({loading: true});
    }

    render() {
        return (
            <Main>
                <GridRow>
                    <GridCol setWidth="two-thirds">
                        <Heading>Digital wallet address</Heading>
                        <form onSubmit={this.handleSubmit}>
                            <LabelText>
                                Enter digital wallet address e.g. 0x70427779641D9c2bA227E48b9B6FbEF1B3CfcDc6 
                                <StyledInput 
                                    name="walletAddressInput"
                                    required 
                                />
                            </LabelText>
                            <StyledLink as={RouterLink} to="/success/">
                                <Button>Continue</Button>
                            </StyledLink>
                        </form>
                    </GridCol>
                </GridRow>
            </Main>
        )
    }
}

export default WalletAddressPage;