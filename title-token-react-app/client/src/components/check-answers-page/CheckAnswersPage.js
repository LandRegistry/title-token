import React, { useState, useCallback } from "react";
import { Redirect } from 'react-router';
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

import Loading from '../common/Loading';

import Button from '@govuk-react/button';
import ErrorText from '@govuk-react/error-text';
import Fieldset from '@govuk-react/fieldset';
import GridCol from '@govuk-react/grid-col';
import GridRow from '@govuk-react/grid-row';
import { H1 } from '@govuk-react/heading';
import Link from '@govuk-react/link';
import Main from '@govuk-react/main';
import Table from '@govuk-react/table';

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

class CheckAnswersPage extends React.Component {

    state = { 
        tokenId: null,
        methodKey: null,
        walletAddress: localStorage.getItem('walletAddress'),
        titleId: localStorage.getItem('titleId'),
        fullName: localStorage.getItem('fullName'),
        date: {
            day: localStorage.getItem('day'),
            month: localStorage.getItem('month'),
            year: localStorage.getItem('year')
        },
        loading: false
    };

    componentDidMount() {
        const { drizzle } = this.props;
        console.log(drizzle);
        const contract = drizzle.contracts.TitleCore;

        const methodKey = contract.methods["issueTitleToken"].cacheCall(this.state.walletAddress, this.state.titleId);
        this.setState({ methodKey });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({loading: 'true'});

        const { TitleCore } = this.props.drizzleState.contracts;
        const issueTitleToken = TitleCore.issueTitleToken[this.state.methodKey];


        this.setState({tokenId: issueTitleToken && issueTitleToken.value});
        localStorage.setItem('tokenId', this.state.tokenId);
    }

    render() {
        if (this.state.tokenId) {
            return  <Redirect
            push 
            to={{
                pathname: "/success",
                state: { tokenId: this.state.tokenId }
            }} 
        />
        }
    
        if (this.state.loading) {
            return <Loading text="Issuing token"/>
        }

        if (this.state.fullName &&
            this.state.date &&
            this.state.titleId &&
            this.state.walletAddress) {
    
            return (
                <Main>
                    <GridRow>
                        <GridCol>
                            <form onSubmit={this.handleSubmit}>
                                <Fieldset>
                                    <H1>
                                        Check your answers before submitting your application
                                    </H1>
                                    <Table>
                                        <Table.Row>
                                            <Table.Cell>
                                                <strong>Name</strong>
                                            </Table.Cell>
                                            <Table.Cell>{this.state.fullName}</Table.Cell>
                                            <Table.Cell>
                                                <StyledLink href="#">
                                                    Change
                                                </StyledLink>
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                <strong>Date of birth</strong>
                                            </Table.Cell>
                                            <Table.Cell>
                                                {this.state.date.day} {months[this.state.date.month]} {this.state.date.year}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <StyledLink href="#">
                                                    Change
                                                </StyledLink>
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                <strong>Title number</strong>
                                            </Table.Cell>
                                            <Table.Cell>
                                                {this.state.titleId}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <StyledLink href="#">
                                                    Change
                                                </StyledLink>
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                <strong>Wallet address</strong>
                                            </Table.Cell>
                                            <Table.Cell>
                                                {this.state.walletAddress}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <StyledLink href="#">
                                                    Change
                                                </StyledLink>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table>
                                </Fieldset>
                                <Button>Accept and send</Button>
                            </form>
                        </GridCol>
                    </GridRow>
                </Main>
            );
        } else {
            return (
                <Main>
                    <ErrorText>
                        Something went wrong
                    </ErrorText>
                </Main>
            )
        }
    }
}

export default CheckAnswersPage;