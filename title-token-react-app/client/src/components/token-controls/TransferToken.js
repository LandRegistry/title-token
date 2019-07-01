import React from "react";

import Button from '@govuk-react/button';

import StyledInput from '../common/StyledInput';

import { newContextComponents } from "drizzle-react-components";
const { ContractForm } = newContextComponents;

class TransferToken extends React.Component {

    state = { 
        walletAddress: null,
        walletAddress: null
      };
    
      componentDidMount() {
        const { drizzle, tokenId } = this.props;
        const titleTokenContract = drizzle.contracts.TitleCore;
    
        const userIsOwner = titleTokenContract.methods["isOwner"].cacheCall();
        const walletAddress = titleTokenContract.methods["ownerOf"].cacheCall(tokenId);
        this.setState({ userIsOwner, walletAddress});
      }

    render() {
        const { drizzle, drizzleState, tokenId } = this.props;

        const { TitleCore } = drizzleState.contracts;

        const isOwner = TitleCore.isOwner[this.state.userIsOwner];
        const ownerAddress = TitleCore.ownerOf[this.state.walletAddress];
    
        if (isOwner && isOwner.value && ownerAddress && ownerAddress.value) {
            return (
                <div className="section">
                    <ContractForm
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        contract="TitleCore"
                        method="ownerTransferFrom"
                        labels={["From Address", "To Address", "Token ID"]}
                        render={({ inputs, inputTypes, state, handleInputChange, handleSubmit}) => {
                            state['from'] = ownerAddress.value;
                            state['tokenId'] = tokenId;
                            return (
                                <form onSubmit={handleSubmit}>
                                    <StyledInput
                                        id="from-address"
                                        key={inputs[0].name}
                                        type={inputTypes[0]}
                                        name={inputs[0].name}
                                        value={state[inputs[0].name]}
                                        onChange={handleInputChange}
                                        disabled={true}
                                        hidden={true}
                                    />

                                    <StyledInput
                                        id="to-address"
                                        key={inputs[1].name}
                                        type={inputTypes[1]}
                                        name={inputs[1].name}
                                        onChange={handleInputChange}
                                    />
                                    <StyledInput
                                        id="token-id"
                                        key={inputs[2].name}
                                        type={inputTypes[2]}
                                        name={inputs[2].name}
                                        value={state[inputs[2].name]}
                                        placeholder="451"
                                        onChange={handleInputChange}
                                        disabled={true}
                                        hidden={true}
                                    />
                                    
                                    <Button>Transfer token</Button>
                                </form>
                            )
                        }
                    }
                    />
                </div>
            );
        }
        return <> </>;
    }
}

export default TransferToken;