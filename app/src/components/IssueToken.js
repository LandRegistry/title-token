import React from "react";
import { newContextComponents } from "drizzle-react-components";
import LabelText from '@govuk-react/label-text';
import Input from '@govuk-react/input';
import Button from '@govuk-react/button';
const { ContractForm } = newContextComponents;

class IssueToken extends React.Component {

    render() {
        const {isIssuer, drizzle, drizzleState} = this.props;

        if (isIssuer) {
            return (
                <div className="section">
                    <LabelText>Issue Token</LabelText>
                    <ContractForm
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        contract="TitleCore"
                        method="issueTitleToken"
                        labels={["To Address", "Title ID"]}
                        render={({ inputs, inputTypes, state, handleInputChange, handleSubmit}) => (
                            <form onSumbit={handleSubmit}>
                                {inputs.map((input, index) => (
                                    <Input
                                        key={input.name}
                                        type={inputTypes[index]}
                                        name={input.name}
                                        value={state[input.name]}
                                        placeholder={input.name}
                                        onChange={handleInputChange}
                                    />
                                ))}
                                <Button>Issue</Button>
                            </form>
                        )}
                    />
                </div>
            );
        }
        return <> </>;
    }
}

export default IssueToken;