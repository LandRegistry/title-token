import React, { useState } from "react";
import { Redirect } from 'react-router';
import styled from "styled-components";

import Button from '@govuk-react/button';
import ErrorText from '@govuk-react/error-text';
import Fieldset from '@govuk-react/fieldset';
import GridCol from '@govuk-react/grid-col';
import GridRow from '@govuk-react/grid-row';
import Main from '@govuk-react/main';
import Radio from '@govuk-react/radio';

const StyledButton = styled(Button)`
    margin-top: 1em;
`

const SelectTitlePage = (props) => {
    const [ownedTitles] = useState(props.location.state.ownedTitles)
    const [selectedTitle, setSelectedTitle] = useState('')
    const [submit, setSubmit] = useState(false)

    const handleChangeTitle = (e) => {
        setSelectedTitle(e.target.value);
        localStorage.setItem('titleId', e.target.value);
        localStorage.getItem('titleId');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedTitle && localStorage.getItem('titleId')) {
            setSubmit(true);
        }
    }

    if (submit) {
        return (
            <Redirect
                push
                to={{
                    pathname: "/wallet-address/"
                }}
            />
        )
    }
    
    if (ownedTitles && ownedTitles.length > 0) {
        return (
            <Main>
                <GridRow>
                    <GridCol setWidth="two-thirds">
                        <form onSubmit={handleSubmit}>
                            <Fieldset>
                                <Fieldset.Legend size="XL" isPageHeading>
                                    Which title would you like to receive a token for?
                                </Fieldset.Legend>
                                {ownedTitles.map((item, key) => 
                                    <Radio 
                                        key={key}
                                        value={item.title_number}
                                        name="titles"
                                        hint={item.address.property_name_number + " " + item.address.street_name}
                                        onChange={handleChangeTitle}
                                    >
                                        {item.title_number}
                                    </Radio>
                                )}
                            </Fieldset>
                            <StyledButton>Continue</StyledButton>
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

export default SelectTitlePage;