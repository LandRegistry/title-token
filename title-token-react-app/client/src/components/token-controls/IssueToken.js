import React from "react";
import { newContextComponents } from "drizzle-react-components";
import LabelText from '@govuk-react/label-text';
import Button from '@govuk-react/button';
import StyledInput from '../common/StyledInput';
const { ContractForm } = newContextComponents;

class IssueToken extends React.Component {

    render() {
        const {drizzle, drizzleState} = this.props;

        return (
            <div className="section">
                <ContractForm
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="TitleCore"
                    method="issueTitleToken"
                    labels={["To Address", "Title ID"]}
                    render={({ inputs, inputTypes, state, handleInputChange, handleSubmit}) => (
                        <form onSubmit={handleSubmit}>
                            <LabelText htmlFor="owner-address-to-issue">Owner address</LabelText>
                            <StyledInput
                                id="owner-address-to-issue"
                                key={inputs[0].name}
                                type={inputTypes[0]}
                                name={inputs[0].name}
                                value={state[inputs[0].name]}
                                placeholder="0x00000000000000000000"
                                onChange={handleInputChange}
                            />
                            <LabelText htmlFor="title-number-to-issue">Title number</LabelText>
                            <StyledInput
                                id="title-number-to-issue"
                                key={inputs[1].name}
                                type={inputTypes[1]}
                                name={inputs[1].name}
                                value={state[inputs[1].name]}
                                placeholder="ABCD123"
                                onChange={handleInputChange}
                            />
                            <Button>Issue</Button>
                        </form>
                    )}
                />
            </div>
        );
    }
}

export default IssueToken;