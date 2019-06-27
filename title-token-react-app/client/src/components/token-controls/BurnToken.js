import React from "react";

import LabelText from '@govuk-react/label-text';
import Button from '@govuk-react/button';

import StyledInput from '../common/StyledInput';

import { newContextComponents } from "drizzle-react-components";
const { ContractForm } = newContextComponents;

class BurnToken extends React.Component {

    state = {  
        userIsBurner: null,
        isBurner: false
    };
    
    componentDidMount() {
        const { drizzle } = this.props;
        const titleTokenContract = drizzle.contracts.TitleCore;
    
        const userIsBurner = titleTokenContract.methods["isBurner"].cacheCall();
        this.setState({ userIsBurner });
      }

    render() {
        const { drizzle, drizzleState, tokenId } = this.props;
        const { TitleCore } = drizzleState.contracts;
    
        const isBurner = TitleCore.isBurner[this.state.userIsBurner];

        if (isBurner) {
            return (
                <div className="section">
                    <ContractForm
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        contract="TitleCore"
                        method="burn"
                        labels={["Token ID"]}
                        render={({ inputs, inputTypes, state, handleInputChange, handleSubmit}) => (
                            <form onSubmit={handleSubmit}>
                                <div hidden={tokenId}>
                                    <LabelText htmlFor="token-id-to-burn">Token ID</LabelText>
                                    <StyledInput
                                        id="token-id-to-burn"
                                        key={inputs[0].name}
                                        type={inputTypes[0]}
                                        name={inputs[0].name}
                                        value={tokenId}
                                        placeholder="451"
                                        onChange={handleInputChange}
                                        disabled={tokenId}
                                    />
                                </div>
                                <Button>Burn token</Button>
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