import React from "react";
import LabelText from '@govuk-react/label-text';
import Button from '@govuk-react/button';
import { H2 } from "@govuk-react/heading";
import StyledInput from '../common/StyledInput';
import { newContextComponents } from "drizzle-react-components";
const { ContractForm } = newContextComponents;

class BurnToken extends React.Component {

    render() {
        const {isBurner, drizzle, drizzleState} = this.props;

        if (isBurner) {
            return (
                <div className="section">
                    <H2>Burn Token</H2>
                    <ContractForm
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        contract="TitleCore"
                        method="burn"
                        labels={["Token ID"]}
                        render={({ inputs, inputTypes, state, handleInputChange, handleSubmit}) => (
                            <form onSubmit={handleSubmit}>
                                <LabelText htmlFor="token-id-to-burn">Token ID</LabelText>
                                <StyledInput
                                    id="token-id-to-burn"
                                    key={inputs[0].name}
                                    type={inputTypes[0]}
                                    name={inputs[0].name}
                                    value={state[inputs[0].name]}
                                    placeholder="451"
                                    onChange={handleInputChange}
                                />
                                <Button>Burn</Button>
                            </form>
                        )}
                    />
                </div>
            );
        }
        return <> </>;
    }
}

export default BurnToken;