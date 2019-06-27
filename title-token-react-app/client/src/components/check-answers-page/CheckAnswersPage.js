import React, { useState } from "react";
import { Redirect } from 'react-router';
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

const CheckAnswersPage = () => {
    
    const [tokenId, setTokenId]  = useState(null);
    const [errorText, setErrorText] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fullName] = useState(localStorage.getItem('fullName'));
    const [date] = useState({
        day: localStorage.getItem('day'),
        month: localStorage.getItem('month'),
        year: localStorage.getItem('year')
    });
    const [titleId] = useState(localStorage.getItem('titleId'));
    const [walletAddress] = useState(localStorage.getItem('walletAddress'));

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorText(null);
        setLoading(true);
        localStorage.setItem('tokenId', null)
        requestToken();
    }

    const requestToken = () => {
        callBackendAPI()
            .then((res) => {
                setLoading(false);
                localStorage.setItem('tokenId', res);
                setTokenId(res);
            })
            .catch(error => {
                setLoading(false);
                setErrorText(error.message);
            })
    }

    const callBackendAPI = async () => {
        const data = {
            'owner': walletAddress,
            'titleId': titleId
        }
        return fetch(
            '/request-token', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(response => {
            if (response.status === 400) {
                throw new Error("Token already exists for " + titleId);
            } else if (response.status === 500) {
                throw new Error(response.statusText);
            } else {
                return response.json();
            }
        }, response => {
            throw new Error(response.statusText);
        })
    };

    if (tokenId) {
        return  <Redirect
        push 
        to={{
            pathname: "/success",
            state: { tokenId: tokenId }
        }} 
    />
    }

    if (loading) {
        return <Loading text="Issuing token"/>
    }
    if (localStorage.getItem('fullName') &&
        localStorage.getItem('day') &&
        localStorage.getItem('month') &&
        localStorage.getItem('year') &&
        localStorage.getItem('titleId') &&
        localStorage.getItem('walletAddress')) {

        return (
            <Main>
                {errorText &&
                    <ErrorText>
                        {errorText}
                    </ErrorText>
                }
                <GridRow>
                    <GridCol>
                        <form onSubmit={handleSubmit}>
                            <Fieldset>
                                <H1>
                                    Check your answers before submitting your application
                                </H1>
                                <Table>
                                    <Table.Row>
                                        <Table.Cell>
                                            <strong>Name</strong>
                                        </Table.Cell>
                                        <Table.Cell>{fullName}</Table.Cell>
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
                                            {date.day} {months[date.month]} {date.year}
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
                                            {titleId}
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
                                            {walletAddress}
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

export default CheckAnswersPage;