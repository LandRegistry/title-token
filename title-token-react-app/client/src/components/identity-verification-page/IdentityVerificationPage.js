import React, { useState } from "react";
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

const IdentityVerificationPage = () => {

    const[fullName, setFullName] = useState('');
    const[day, setDay] = useState('');
    const[month, setMonth] = useState('');
    const[year, setYear] = useState('');
    const[ownedTitles, setOwnedTitles] = useState(null);
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState('');

    const handleChangeDate = (e) => {
        if (e.target.name == 'dayInput') {
            setDay(e.target.value);
        } else if (e.target.name == 'monthInput'){
            setMonth(e.target.value);
        } else if (e.target.name == 'yearInput'){
            setYear(e.target.value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        checkIdentity();
    }

    const checkIdentity = () => {
        callBackendAPI()
            .then((res) => {
                let error = '';
                let ownedTitles = [];
                console.log(fullName);
                for (let key in res) {
                    for (let proprietor in res[key]['proprietors']) {
                        if (fullName.toUpperCase() == res[key]['proprietors'][proprietor].toUpperCase()) {
                            ownedTitles.push(res[key]);
                        }
                    }
                }
                if (!ownedTitles.length > 0) {
                    error = "No titles found for user: " + fullName;
                }
                setOwnedTitles(ownedTitles);
                setLoading(false);
                setError(error);
                // setState({ ownedTitles: ownedTitles, loading: false, error: error });
            })
            .catch(err => console.log(err));
    }

    const callBackendAPI = async () => {
        const response = await fetch('/titles');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message);
        }
        return body;
    };

    const errorText = (error && (
        <ErrorText>{error}</ErrorText>
    ))
    
    // Code to return after submitting the identity form
    if (loading) {
        return <Loading text="Performing identity checks..."/>
    } else if (ownedTitles && ownedTitles.length > 0) {
        return (
            <Redirect
                push 
                to={{
                    pathname: "/select-title",
                    state: { ownedTitles: ownedTitles }
                }} 
            />
        ) 
    }

    return (
        <Main>
            <GridRow>
                <GridCol setWidth="two-thirds">
                    {errorText}
                    <H1>Identity verification</H1>
                    <StyledParagraph>
                        Complete the form below to submit identity verification
                    </StyledParagraph>
                    <form onSubmit={handleSubmit}>
                        <LabelText>
                            Full name
                            <StyledInput 
                                name="fullNameInput"
                                value={fullName.value}
                                onChange={e => setFullName(e.target.value)}
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
                                day: day,
                                month: month,
                                year: year
                            }}
                            onChange={handleChangeDate}
                            input={{
                                required: true
                            }}
                        >
                            Date of birth
                        </DateField>
                        <Button>Continue</Button>
                    </form>
                </GridCol>
            </GridRow>
        </Main>
    )
}

export default IdentityVerificationPage;