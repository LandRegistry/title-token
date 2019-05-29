import React from "react";
import { drizzleConnect } from "drizzle-react";
import { newContextComponents } from "drizzle-react-components";

const { AccountData, ContractData, ContractForm } = newContextComponents;

class TitleTokenAdminComponent extends React.Component {

    // CheckIfIssuer() {
    //     const contract =  TitleToken.
    // }

    render() {
        return (
            <div className="section">
                <h3>Issue Token</h3>
                <ContractForm
                    contract="TitleCore"
                    method="issueTitleToken"
                    labels={["To Address", "Title ID"]}
                />
                <h3>Transfer Token</h3>
                <ContractForm
                    contract="TitleCore"
                    method="transferFrom"
                    labels={["From Address", "To Address", "Token ID"]}
                />
            </div>
        );
  }
}

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    TitleToken: state.contracts.TitleCore
  };
};

const TitleTokenAdmin = drizzleConnect(TitleTokenAdminComponent, mapStateToProps);

export default TitleTokenAdmin;