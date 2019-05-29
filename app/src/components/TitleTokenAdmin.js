import React from "react";
import { newContextComponents } from "drizzle-react-components";
const { AccountData, ContractData, ContractForm } = newContextComponents;

class TitleTokenAdmin extends React.Component {

    render() {
        const {isIssuer, drizzle, drizzleState} = this.props;

        if (isIssuer) {
            return (
                <div className="section">
                    <h3>Issue Token</h3>
                    <ContractForm
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        contract="TitleCore"
                        method="issueTitleToken"
                        labels={["To Address", "Title ID"]}
                    />
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

export default TitleTokenAdmin;