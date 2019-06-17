import React from "react";
import { newContextComponents } from "drizzle-react-components";
const { ContractForm } = newContextComponents;

class TransferToken extends React.Component {

    render() {
        const {isIssuer, drizzle, drizzleState} = this.props;

        if (isIssuer) {
            return (
                <div className="section">
                    <h3>Transfer Token</h3>
                    <ContractForm
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        contract="TitleCore"
                        method="transferFrom"
                        labels={["From Address", "To Address", "Token ID"]}
                    />
                </div>
            );
        }
        return <> </>;
    }
}

export default TransferToken;