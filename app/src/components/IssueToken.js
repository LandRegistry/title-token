import React from "react";
import { newContextComponents } from "drizzle-react-components";
const { ContractForm } = newContextComponents;

class IssueToken extends React.Component {

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
                </div>
            );
        }
        return <> </>;
    }
}

export default IssueToken;