import React from "react";
import { newContextComponents } from "drizzle-react-components";
import { H2 } from "@govuk-react/heading";
import LabelText from "@govuk-react/label-text";

import Paragraph from './common/Paragraph';
import OwnedTokensContainer from './owned-tokens/OwnedTokensContainer';

const { ContractData } = newContextComponents;

class TokenDetails extends React.Component {

    state = { 
        balanceOfKey: null
    };
    
    componentDidMount() {
        const { drizzle, drizzleState} = this.props;
        const titleTokenContract = drizzle.contracts.TitleCore;
        console.log(drizzle);
        console.log(drizzleState);
        const balanceOfKey = titleTokenContract.methods["balanceOf"].cacheCall(drizzleState.accounts[0]);
        this.setState({ balanceOfKey });
    }
    
    render() {
        const {drizzle, drizzleState} = this.props;
        const { TitleCore } = this.props.drizzleState.contracts;
        const balance = TitleCore.balanceOf[this.state.balanceOfKey];

        let ownedTokensContainer;

        if (balance && balance.value) {
            ownedTokensContainer = (
                <OwnedTokensContainer drizzle={drizzle} drizzleState={drizzleState} balance={balance && balance.value} />
            )
        }

        return (
            <div>
                <H2>Token details</H2>
                <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="TitleCore"
                    method="totalSupply"
                    methodArgs={[{ from: drizzleState.accounts[0] }]}
                    render={data => (
                        <div>
                            <LabelText>Total supply:</LabelText>
                            <Paragraph>
                                <strong>{data} title token(s)</strong>
                            </Paragraph>
                        </div>
                    )}
                />
                <div>
                    <LabelText>Total owned:</LabelText>
                    <Paragraph>
                        <strong>{balance && balance.value} title token(s)</strong> 
                    </Paragraph>
                </div>
            </div>
        );
    }
}

export default TokenDetails;