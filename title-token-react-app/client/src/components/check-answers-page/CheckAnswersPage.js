import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

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

    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        
    }

    if (localStorage.getItem('fullName') &&
        localStorage.getItem('day') &&
        localStorage.getItem('month') &&
        localStorage.getItem('year') &&
        localStorage.getItem('titleId') &&
        localStorage.getItem('walletAddress')) {

    
        return (
            <Main>
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
                                        <Table.Cell>{localStorage.getItem('fullName')}</Table.Cell>
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
                                            {localStorage.getItem('day')} {months[localStorage.getItem('month')]} {localStorage.getItem('year')}
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
                                            {localStorage.getItem('titleId')}
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
                                            {localStorage.getItem('walletAddress')}
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