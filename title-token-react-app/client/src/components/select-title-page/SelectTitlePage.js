import React from "react";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

import Button from '@govuk-react/button';
import ErrorText from '@govuk-react/error-text';
import GridCol from '@govuk-react/grid-col';
import GridRow from '@govuk-react/grid-row';
import { H1 } from "@govuk-react/heading";
import Main from '@govuk-react/main';
import Link from '@govuk-react/link';
import Radio from '@govuk-react/radio';

import Paragraph from '../common/Paragraph';

// const StyledParagraph = styled(Paragraph)`
//     padding-bottom: 20px;
// `;

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const StyledButton = styled(Button)`
    margin-top: 1em;
`

class SelectTitlePage extends React.Component {

    state = { 
        ownedTitles: null
    };

    componentDidMount() {
        if (this.props.location.state) {
            const { ownedTitles } = this.props.location.state;
            this.setState({ownedTitles: ownedTitles });
        }
    }
    
    render() {
        if (this.state.ownedTitles && this.state.ownedTitles.length > 0) {
            return (
                <Main>
                    <GridRow>
                        <GridCol setWidth="two-thirds">
                            <H1>Which title would you like to receive a token for?</H1>
                            <div>
                                {this.state.ownedTitles.map((item, key) => 
                                    <Radio 
                                        key={key}
                                        name="titles"
                                        hint={item.address.property_name_number + " " + item.address.street_name}
                                        checked={(key == 0)}
                                    >
                                        {item.title_number}
                                    </Radio>
                                )}
                            </div>
                            <StyledLink as={RouterLink} to="/wallet-address/">
                                <StyledButton>Continue</StyledButton>
                            </StyledLink>
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

export default SelectTitlePage;