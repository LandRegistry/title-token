import React from "react";
import { newContextComponents } from "drizzle-react-components";
import { H1, H2, H3, H4, H5, H6 } from "@govuk-react/heading";

const { ContractData } = newContextComponents;

class TokenDetails extends React.Component {

    render() {
        const {drizzle, drizzleState} = this.props;
        return (
            <div className="section">
            <H2>Token details</H2>
            <p>
                <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="TitleCore"
                    method="totalSupply"
                    methodArgs={[{ from: drizzleState.accounts[0] }]}
                    render={data => (
                        <div>
                            <H3>Total supply:</H3>
                            <strong>{data}</strong> title token(s)
                        </div>
                    )}
                />
            </p>
            <p>
                <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="TitleCore"
                    method="balanceOf"
                    methodArgs={[drizzleState.accounts[0]]}
                    render={data => (
                        <div>
                            <H3>Total owned:</H3>
                            <strong>{data}</strong> title token(s)
                        </div>
                    )}
                />
            </p>
            </div>
        );
    }
}

export default TokenDetails;