import React from "react";
import styled from 'styled-components'
import { newContextComponents } from "drizzle-react-components";

import { H1, H2, H3 } from '@govuk-react/heading';
import Link from '@govuk-react/link';
import Main from '@govuk-react/main';
import GridRow from '@govuk-react/grid-row';
import GridCol from '@govuk-react/grid-col';
import ErrorText from '@govuk-react/error-text';

import Loading from "../common/Loading";
import Paragraph from "../common/Paragraph";
import BurnToken from "../token-controls/BurnToken";
import TransferToken from "../token-controls/TransferToken";

const { ContractData } = newContextComponents;

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
        title: {},
        isOwner: false
    };

    componentDidMount() {
        const { titleId, drizzle } = this.props;
        const contract = drizzle.contracts.TitleCore;
    
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
        const tokenId = TitleCore.titleIdToTokenIndex[this.state.tokenIdKey];
        
        drizzle.contracts.TitleCore.methods.isOwner().call({from: drizzleState.accounts[0]})
            .then((result) => this.setState({isOwner: result}))
        
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

        const tokenExists = (tokenId && tokenId.value && tokenId.value !== "0")

        const tokenControls = (tokenExists && 
            <div>
                <H2>Transfer title ownership token</H2>
                <Paragraph>
                    Enter the new owner's digital wallet address
                </Paragraph>
                <TransferToken
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    tokenId={tokenId.value}
                />

                <H2>Burn token</H2>
                <Paragraph>
                    Burning the token will destroy the token and its properties permanantly.
                </Paragraph>
                <BurnToken 
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    tokenId={tokenId.value}
                />
            </div>
        )

        return (
            <Main>
                <StyledGridRow>
                    <GridCol setWidth="two-thirds">
                        <H1>{titleId}</H1>

                        <H3>
                            Token ID
                        </H3>
                        {tokenExists && 
                            <div>
                                <Paragraph>
                                    {tokenId.value}
                                </Paragraph>

                                <H3>
                                    Owner wallet address
                                </H3>
                                <ContractData
                                    drizzle={drizzle}
                                    drizzleState={drizzleState}
                                    contract="TitleCore"
                                    method="ownerOf"
                                    methodArgs={[tokenId && tokenId.value]}
                                    render={walletAddress => (
                                        <Paragraph>
                                            {walletAddress}
                                        </Paragraph>
                                    )}
                                />
                            </div>
                        }

                        {!tokenExists && 
                            <ErrorText>
                                N/A
                            </ErrorText>
                        }

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
                            {this.state.title.address.property_name_number}{this.state.title.address.street_name && ' ' + this.state.title.address.street_name}, <br />
                            {this.state.title.address.town_city}, <br />
                            {this.state.title.address.postcode}
                        </Paragraph>

                        {(this.state.title.valuation && (
                            <div>
                                <H3>
                                    Valuation
                                </H3>
                                <Paragraph>
                                    {this.state.title.valuation}
                                </Paragraph>
                            </div>
                        ))}

                        {(this.state.title.description && (
                            <div>
                                <H3>
                                    Description
                                </H3>
                                <Paragraph>
                                    {this.state.title.description}
                                </Paragraph>
                            </div>
                        ))}

                        {(this.state.title.price_paid.length > 0 && (
                            <H3>
                                Price paid
                            </H3>
                        ))}
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
                        
                        {(this.state.title.interests.a.length > 0 && (
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


                        {tokenExists && 
                            <div>
                                {(this.state.title.interests.b.length > 0 && (
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
                            </div>
                        }

                    {this.state.isOwner && tokenControls}

                    </GridCol>
                    <GridCol setWidth="one-third">
                        <StyledImage src={process.env.PUBLIC_URL + '/images/' + this.state.title.image} width="100%"></StyledImage>

                        <StyledLink href="#">
                            Court order information
                        </StyledLink>
                    </GridCol>
                </StyledGridRow>
            </Main>
        );
    }
}

export default ViewTitleInformationPage;