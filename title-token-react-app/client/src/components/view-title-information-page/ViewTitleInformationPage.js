import React from "react";
import styled from 'styled-components';

import { H1, H2, H3, H4 } from '@govuk-react/heading';
import Link from '@govuk-react/link';
import Main from '@govuk-react/main';
import GridRow from '@govuk-react/grid-row';
import GridCol from '@govuk-react/grid-col';
import ErrorText from '@govuk-react/error-text';

import Loading from "../common/Loading";
import Paragraph from "../common/Paragraph";
import BurnToken from "../token-controls/BurnToken";
import TransferToken from "../token-controls/TransferToken";

const StyledGridRow = styled(GridRow)`
  padding-bottom: 1.5em;
`

const StyledImage = styled.img`
    margin-bottom: 20px;
`

const StyledLink = styled(Link)`
    text-decoration: none;
`;

class ViewTitleInformationPage extends React.Component {

    state = {
        loading: true,
        tokenId: null,
        tokenIdKey: null,
        titleId: '',
        title: {}
    };

    componentDidMount() {
        const { titleId, drizzle } = this.props;
        const contract = drizzle.contracts.TitleCore;
        console.log(this.props);
    
        // get and save the key for the variable we are interested in
        const tokenIdKey = contract.methods["titleIdToTokenIndex"].cacheCall(titleId);
        this.setState({ tokenIdKey, titleId });
        
        if (titleId) {
            this.loadData(titleId);
        }
    }

    loadData = (titleId) => {
        this.callBackendAPI(titleId)
            .then((res) => {
                let error = '';

                if (!res) {
                    error = "Title information not found";
                }
                this.setState({
                    'error': error,
                    'loading': false,
                    'title': res
                });
                console.log(this.state);
            })
            .catch(error => this.setState({error: error}));
    }

    callBackendAPI = async (titleId) => {
        const response = await fetch('/titles/' + titleId);
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message);
        }
        return body;
    };

    render() {
        const { titleId, drizzle, drizzleState} = this.props;
        const { TitleCore } = this.props.drizzleState.contracts;
        const tokenId = TitleCore.titleIdToTokenIndex[this.state.tokenIdKey]

        if (this.state.error) {
            return (
                <ErrorText>
                    {this.state.error}
                </ErrorText>
            )
        }

        if (this.state.loading) {
            return (
            <Loading />
            );
        }

        return (
            <Main>
                <GridRow>
                    <GridCol setWidth="two-thirds">
                        <H1>{this.state.titleId}</H1>
                        <H3>
                            Token ID
                        </H3>
                        <Paragraph>
                            {tokenId && tokenId.value}
                        </Paragraph>

                        <H3>
                            Title owner
                        </H3>
                        <Paragraph>
                            {this.state.title.proprietors[0]}
                        </Paragraph>

                        <H3>
                            Title address
                        </H3>
                        <Paragraph>
                            {this.state.title.address.property_name_number} {this.state.title.address.street_name}, <br />
                            {this.state.title.address.town_city}, <br />
                            {this.state.title.address.postcode}
                        </Paragraph>

                        <H3>
                            Price paid
                        </H3>
                        {this.state.title.price_paid.map((item, key) => (
                            <div key={key}>
                                <Paragraph>
                                    <strong>Date:</strong> {item.date}
                                </Paragraph>
                                <Paragraph>
                                    <strong>Amount:</strong> {item.amount}
                                </Paragraph>
                            </div>
                        ))}
                        
                        {(this.state.title.interests.a && (
                            <H3>
                                A. Charges and beneficial interests
                            </H3>
                        ))}
                        {this.state.title.interests.a.map((item, key) => (
                            <div key={key}>
                                <Paragraph>
                                    <strong>Lender:</strong> {item.lender}
                                </Paragraph>
                                <Paragraph>
                                    <strong>Value:</strong> {item.value}
                                </Paragraph>
                                <Paragraph>
                                    <strong>Issue date:</strong> {item.issue_date}
                                </Paragraph>
                            </div>
                        ))}

                        {(this.state.title.interests.b && (
                            <H3>
                                B. Charges and beneficial interests
                            </H3>
                        ))}
                        {this.state.title.interests.b.map((item, key) => (
                            <div key={key}>
                                <Paragraph>
                                    <strong>Investor {key+1} - {item.name}</strong>
                                </Paragraph>
                                <Paragraph>
                                    <strong>Wallet address:</strong> {item.wallet_address}
                                </Paragraph>
                                <Paragraph>
                                    <strong>Amount owned:</strong> {item.amount_owned}%
                                </Paragraph>
                                <Paragraph>
                                    <strong>Purchase date:</strong> {item.purchase_date}
                                </Paragraph>
                            </div>
                        ))}
                    
                        <H2>Transfer title ownership token</H2>
                        <TransferToken
                            drizzle={drizzle}
                            drizzleState={drizzleState}
                            tokenId={tokenId && tokenId.value}
                        />

                        <H2>Burn token</H2>
                        <Paragraph>
                            Burning the token wil destroy the token and its properties permenantly.
                        </Paragraph>
                        <BurnToken 
                            drizzle={drizzle}
                            drizzleState={drizzleState}
                            tokenId={tokenId && tokenId.value}
                        />
                        
                    </GridCol>
                    <GridCol setWidth="one-third">
                        <StyledImage src={process.env.PUBLIC_URL + '/images/' + this.state.title.image} width="100%"></StyledImage>

                        <StyledLink href="#">
                            Court order information
                        </StyledLink>
                    </GridCol>
                </GridRow>
            </Main>
        );
    }
}

export default ViewTitleInformationPage;