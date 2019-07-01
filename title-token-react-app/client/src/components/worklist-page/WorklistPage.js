import React from "react";
import styled from "styled-components";
import { Link as RouterLink } from 'react-router-dom';

import Loading from "../common/Loading";

import Button from '@govuk-react/button';
import ErrorText from '@govuk-react/error-text';
import Link from '@govuk-react/link';
import Main from '@govuk-react/main';
import GridCol from '@govuk-react/grid-col';
import GridRow from '@govuk-react/grid-row';
import { H1 } from "@govuk-react/heading";
import Table from '@govuk-react/table';

const StyledLink = styled(Link)`
    text-decoration: none;
`;

class WorklistPage extends React.Component {
    
    state = {
        courtOrders: null,
        loading: true,
        error: ''
    }

    componentDidMount() {
        this.callBackendAPI()
            .then((res) => {
                let error = '';
                let courtOrders = [];
                for (let key in res) {
                    if (res[key]['status'] === 'move') {
                        res[key]['status'] = 'Move token';
                    } else if(res[key]['status'] === 'burn'){
                        res[key]['status'] = 'Burn token';
                    } else {
                        res[key]['status'] = 'Complete';
                    }
                    courtOrders.push(res[key]);
                }
                if (!courtOrders.length > 0) {
                    error = "No court orders found";
                }
                this.setState({ courtOrders: courtOrders, loading: false, error: error });
            })
            .catch(err => console.log(err));
    }

    callBackendAPI = async () => {
        const response = await fetch('/court-orders/titles');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message);
        }
        return body;
    };

    render() {
        const errorText = (this.state.error && (
            <ErrorText>{this.state.error}</ErrorText>
        ))

        if (this.state.loading) {
            return <Loading />
        } else if (this.state.courtOrders && this.state.courtOrders.length > 0) {
            return (
                <Main>
                    <GridRow>
                        <GridCol>
                            {errorText}
                            <H1>Worklist</H1>
                            <Table
                                head={
                                    <Table.Row>
                                        <Table.CellHeader>Title address</Table.CellHeader>
                                        <Table.CellHeader>Title number</Table.CellHeader>
                                        <Table.CellHeader>Owner</Table.CellHeader>
                                        <Table.CellHeader setWidth="15%">Additional documents</Table.CellHeader>
                                        <Table.CellHeader>Date requested</Table.CellHeader>
                                        <Table.CellHeader setWidth="20%">Date Actions</Table.CellHeader>
                                        <Table.CellHeader></Table.CellHeader>
                                    </Table.Row>
                                }>
                                {this.state.courtOrders.map((item, key) => 
                                    <Table.Row key={key}>
                                        <Table.Cell>
                                            {item.title.address.property_name_number + " " + item.title.address.street_name},<br />
                                            {item.title.address.town_city},<br />
                                            {item.title.address.postcode}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {item.title.title_number}
                                        </Table.Cell>
                                        <Table.Cell>{item.title.proprietors[0]}</Table.Cell>
                                        <Table.Cell>
                                            <StyledLink href="#">
                                                Deeds 1
                                            </StyledLink>
                                        </Table.Cell>
                                        <Table.Cell>11/06/19</Table.Cell>
                                        <Table.Cell>
                                            Court Order<br />
                                            <strong>{item.status}</strong>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <StyledLink as={RouterLink} to={"/view-title/" + item.title.title_number}>
                                                <Button>View</Button>
                                            </StyledLink>
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table>
                        </GridCol>
                    </GridRow>
                </Main>
            )
        }
    } 
}

export default WorklistPage;