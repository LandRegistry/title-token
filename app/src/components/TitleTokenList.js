import React from "react";
import { newContextComponents } from "drizzle-react-components";

const { ContractData } = newContextComponents;

class TitleTokenList extends React.Component {

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
                    />
                </p>
            </div>
        );
    }
}

export default TitleTokenList;