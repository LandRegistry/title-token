import React from "react";

import LabelText from '@govuk-react/label-text';
import Button from '@govuk-react/button';

import StyledInput from '../common/StyledInput';

import { newContextComponents } from "drizzle-react-components";
const { ContractForm } = newContextComponents;

class BurnToken extends React.Component {

    render() {
        const { drizzle, drizzleState, tokenId } = this.props;
    
        return (
            <div className="section">
                <ContractForm
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="TitleCore"
                    method="ownerBurn"
                    sendArgs={{from: drizzleState.accounts[0]}}
                    labels={["Token ID"]}
                    render={({ inputs, inputTypes, state, handleInputChange, handleSubmit}) => {
                        state["_id"] = tokenId;
                        
                        return (
                        <form onSubmit={handleSubmit}>
                            <div hidden={tokenId}>
                                <LabelText htmlFor="token-id-to-burn">Token ID</LabelText>
                                <StyledInput
                                    id="token-id-to-burn"
                                    key={inputs[0].name}
                                    type={inputTypes[0]}
                                    name={inputs[0].name}
                                    value={state[inputs[0].name]}
                                    placeholder="451"
                                    onChange={handleInputChange}
                                    disabled={tokenId}
                                />
                            </div>
                            <Button>Burn token</Button>
                        </form>
                    )}}
                />
            </div>
        );
    }
}

export default BurnToken;