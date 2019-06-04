import React from "react";
import { newContextComponents } from "drizzle-react-components";
import { H2 } from "@govuk-react/heading";
import LabelText from "@govuk-react/label-text";
import Paragraph from './Paragraph';

const { ContractData } = newContextComponents;

class TokenDetails extends React.Component {

    render() {
        const {drizzle, drizzleState} = this.props;
        return (
            <div className="section">
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
                <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="TitleCore"
                    method="balanceOf"
                    methodArgs={[drizzleState.accounts[0]]}
                    render={data => (
                        <div>
                            <LabelText>Total owned:</LabelText>
                            <Paragraph>
                                <strong>{data} title token(s)</strong> 
                            </Paragraph>
                        </div>
                    )}
                />
            </div>
        );
    }
}

export default TokenDetails;