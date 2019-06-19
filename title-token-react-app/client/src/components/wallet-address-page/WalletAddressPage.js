import React, { useState } from "react";
import { DrizzleContext } from "drizzle-react";
import styled from "styled-components";
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

const WalletAddressPage = () => {
    
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState('');

    // state = {
    //     walletAddressInput: '',
    //     loading: false,
    //     error: ''
    // }

    // handleChange = (e) => {
    //     this.setState({[e.target.name]: e.target.value});
    // }

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     this.setState({loading: true});
    // }

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
                                {/* <form onSubmit={this.handleSubmit}> */}
                                    {/* <LabelText>
                                        Enter digital wallet address e.g. 0x70427779641D9c2bA227E48b9B6FbEF1B3CfcDc6 
                                        <StyledInput 
                                            name="walletAddressInput"
                                            required 
                                        />
                                    </LabelText> */}
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
                                                    Please ensure that you are signed into the correct account before proceeding.
                                                </Details>
                                            </div>
                                    )}/>
                                    <StyledLink as={RouterLink} to="/success/">
                                        <Button>Continue</Button>
                                    </StyledLink>
                                {/* </form> */}
                            </GridCol>
                        </GridRow>
                    </Main>
                );
            }}
        </DrizzleContext.Consumer>
    )
}

export default WalletAddressPage;