import React from "react";
import { newContextComponents } from "drizzle-react-components";

const { ContractData } = newContextComponents;

class TitleTokenAmount extends React.Component {

    render() {
        const {drizzle, drizzleState} = this.props;
        return (
            <div className="section">
            <h2>TitleToken</h2>
            <p>
                <strong>Total Supply: </strong>
                <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="TitleCore"
                    method="totalSupply"
                    methodArgs={[{ from: drizzleState.accounts[0] }]}
                />{" "}
                <ContractData 
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="TitleCore"
                    method="symbol"
                    hideIndicator
                />
            </p>
            <p>
                <strong>Amount: </strong>
                <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="TitleCore"
                    method="balanceOf"
                    methodArgs={[drizzleState.accounts[0]]}
                />
            </p>
            </div>
        );
    }
}

export default TitleTokenAmount;