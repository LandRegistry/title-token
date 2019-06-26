import React from "react";

import LabelText from '@govuk-react/label-text';
import Button from '@govuk-react/button';

import StyledInput from '../common/StyledInput';

import { newContextComponents } from "drizzle-react-components";
import Paragraph from "../common/Paragraph";
const { ContractForm } = newContextComponents;

class TransferToken extends React.Component {

    state = { 
        userIsIssuer: null
      };
    
      componentDidMount() {
        const { drizzle } = this.props;
        const titleTokenContract = drizzle.contracts.TitleCore;
    
        const userIsIssuer = titleTokenContract.methods["isIssuer"].cacheCall();
        this.setState({ userIsIssuer });
      }

    render() {
        const { drizzle, drizzleState, tokenId } = this.props;

        const { TitleCore } = drizzleState.contracts;

        const isIssuer = TitleCore.isIssuer[this.state.userIsIssuer];
    
        if (isIssuer) {
            return (
                <div className="section">
                    <ContractForm
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        contract="TitleCore"
                        method="transferFrom"
                        labels={["From Address", "To Address", "Token ID"]}
                        render={({ inputs, inputTypes, state, handleInputChange, handleSubmit}) => (
                            <form onSubmit={handleSubmit}>
                                <StyledInput
                                    id="from-address"
                                    key={inputs[0].name}
                                    type={inputTypes[0]}
                                    name={inputs[0].name}
                                    value="0x7E563849049476250e5088A1c81CD9fD425877C9"
                                    onChange={handleInputChange}
                                    disabled={true}
                                    hidden={true}
                                />
                                <StyledInput
                                    id="to-address"
                                    key={inputs[1].name}
                                    type={inputTypes[1]}
                                    name={inputs[1].name}
                                    value="0x7E563849049476250e5088A1c81CD9fD425877C9"
                                    onChange={handleInputChange}
                                    disabled={true}
                                    // hidden={true}
                                />
                                <StyledInput
                                    id="token-id"
                                    key={inputs[2].name}
                                    type={inputTypes[2]}
                                    name={inputs[2].name}
                                    value={tokenId}
                                    placeholder="451"
                                    onChange={handleInputChange}
                                    disabled={true}
                                    hidden={true}
                                />
                                
                                <Button>Transfer token</Button>
                            </form>
                        )}
                    />
                </div>
            );
        }
        return <> </>;
    }
}

export default TransferToken;