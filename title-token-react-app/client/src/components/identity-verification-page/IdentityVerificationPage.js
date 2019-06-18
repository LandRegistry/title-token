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
        fullNameInput: '',
        dayInput: '',
        monthInput: '',
        yearInput: '',
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
                for (let key in res) {
                    for (let proprietor in res[key]['proprietors']) {
                        if (this.state.fullNameInput.toUpperCase() == res[key]['proprietors'][proprietor].toUpperCase()) {
                            ownedTitles.push(res[key]);
                        }
                    }
                }
                if (!ownedTitles.length > 0) {
                    error = "No titles found for user: " + this.state.fullNameInput;
                }
                this.setState({ ownedTitles: ownedTitles, loading: false, error: error });
            })
            .catch(err => console.log(err));
    }

    callBackendAPI = async () => {
        const response = await fetch('/titles');
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
            return <Loading text="Performing identity checks..."/>
        } else if (this.state.ownedTitles && this.state.ownedTitles.length > 0) {
            return (
                <Redirect
                    push 
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
                                        name="fullNameInput"
                                        value={this.state.fullNameInput}
                                        onChange={this.handleChange}
                                        required 
                                    />
                                </LabelText>
                                <DateField
                                    hintText="For example, 31 03 1980"
                                    inputNames={{
                                        day: 'dayInput',
                                        month: 'monthInput',
                                        year: 'yearInput'
                                    }}
                                    defaultValues={{
                                        day: this.state.dayInput,
                                        month: this.state.monthInput,
                                        year: this.state.yearInput,
                                    }}
                                    onChange={this.handleChange}
                                    input={{
                                        required: true
                                    }}
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