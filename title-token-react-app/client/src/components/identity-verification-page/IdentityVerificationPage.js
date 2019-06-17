import React from "react";
import styled from "styled-components";
import { Redirect } from 'react-router';

import Loading from "../common/Loading";
import Paragraph from "../common/Paragraph";
import StyledInput from '../common/StyledInput';

import Button from '@govuk-react/button';
import DateField from '@govuk-react/date-field';
import ErrorText from '@govuk-react/error-text';
import LabelText from '@govuk-react/label-text';
import Link from '@govuk-react/link';
import Main from '@govuk-react/main';
import GridCol from '@govuk-react/grid-col';
import GridRow from '@govuk-react/grid-row';
import { H1 } from "@govuk-react/heading";

const StyledParagraph = styled(Paragraph)`
    padding-bottom: 20px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;

class IdentityVerificationPage extends React.Component {
    
    state = {
        fullName: '',
        dateOfBirth: '',
        ownedTitles: null,
        loading: false,
        error: ''
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({loading: true});
        this.checkIdentity();
    }

    checkIdentity() {
        this.callBackendAPI()
            .then((res) => {
                let error = '';
                let ownedTitles = [];
                for (let key in res.titles) {
                    if (res.titles[key]['proprietors'].includes(this.state.fullName.toUpperCase())) {
                        ownedTitles.push(res.titles[key]);
                    }
                }
                if (!ownedTitles.length > 0) {
                    error = "No titles found for user: " + this.state.fullName;
                }
                this.setState({ ownedTitles: ownedTitles, loading: false, error: error });
            })
            .catch(err => console.log(err));
    }

    callBackendAPI = async () => {
        const response = await fetch('/data');
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
            return <Loading text="Performing Identity checks..."/>
        } else if (this.state.ownedTitles && this.state.ownedTitles.length > 0) {
            return (
                <Redirect 
                    to={{
                        pathname: "/select-title",
                        state: { ownedTitles: this.state.ownedTitles }
                    }} 
                />
            ) 
        } else {
            return (
                <Main>
                    <GridRow>
                        <GridCol setWidth="two-thirds">
                            {errorText}
                            <H1>Identity verification</H1>
                            <StyledParagraph>
                                Complete the form below to submit identity verification
                            </StyledParagraph>
                            <form onSubmit={this.handleSubmit}>
                                <LabelText>
                                    Full name
                                    <StyledInput 
                                        name="fullName"
                                        value={this.state.fullName}
                                        onChange={this.handleChange} 
                                    />
                                </LabelText>
                                <DateField
                                    hintText="For example, 31 03 1980"
                                    name="dateOfBirth"
                                    value={this.state.dateOfBirth}
                                    onChange={this.handleChangeDOB}
                                >
                                    Date of birth
                                </DateField>
                                {/* <StyledLink as={RouterLink} to="/wallet-address/"> */}
                                <Button>Continue</Button>
                                {/* </StyledLink> */}
                            </form>
                        </GridCol>
                    </GridRow>
                </Main>
            )
        }
    } 
}

export default IdentityVerificationPage;