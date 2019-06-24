import React, { useState } from "react";
import { DrizzleContext } from "drizzle-react";
import styled from "styled-components";
import { Redirect } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { newContextComponents } from "drizzle-react-components";

import Loading from "../common/Loading";
import Paragraph from "../common/Paragraph";
import StyledInput from '../common/StyledInput';

import Button from '@govuk-react/button';
import Details from '@govuk-react/details';
import LabelText from '@govuk-react/label-text';
import Link from '@govuk-react/link';
import Main from '@govuk-react/main';
import GridCol from '@govuk-react/grid-col';
import GridRow from '@govuk-react/grid-row';
import Heading from '@govuk-react/heading';

const { AccountData } = newContextComponents;

const StyledLink = styled(Link)`
    text-decoration: none;
`;

class WalletAddressPage extends React.Component {
    
    state = {
        error: '',
        walletAddress: ''
    }

    
    handleSubmit = (e, walletAddress) => {
        e.preventDefault();
        this.setState({
            walletAddress: walletAddress
        })
        localStorage.setItem('walletAddress', this.state.walletAddress);
    }

    render() {
        if (this.state.walletAddress && localStorage.getItem('walletAddress')) {
            return (
                <Redirect
                    push 
                    to={{
                        pathname: "/check-answers"
                    }} 
                />
            )
        }
        return (
            <DrizzleContext.Consumer>
                {drizzleContext => {
                    const { drizzle, drizzleState, initialized } = drizzleContext;
                
                    if (!initialized) {
                        return (
                        <Loading />
                        );
                    }
    
                    return (
                        <Main>
                            <GridRow>
                                <GridCol setWidth="two-thirds">
                                    <Heading>Digital wallet address</Heading>
                                    <form onSubmit={(e) => this.handleSubmit(e, drizzleState.accounts[0])}>
                                        <AccountData
                                            drizzle={drizzle}
                                            drizzleState={drizzleState}
                                            accountIndex={0}
                                            units="ether"
                                            precision={3}
                                            render={({ address, balance, units }) => (
                                                <div>
                                                    <LabelText>Wallet address</LabelText>  
                                                    <Paragraph>
                                                        <strong>{address}</strong>
                                                    </Paragraph>
                                                    <LabelText>Balance</LabelText>  
                                                    <Paragraph>
                                                        <strong>{balance} {units}</strong>
                                                    </Paragraph>
                                                    <Details summary="Not your wallet address?">
                                                        Make sure that you are signed into the correct account before proceeding.
                                                    </Details>
                                                </div>
                                        )}/>
                                        <Button>Continue</Button>
                                    </form>
                                </GridCol>
                            </GridRow>
                        </Main>
                    );
                }}
            </DrizzleContext.Consumer>
        )
    }
}

export default WalletAddressPage;