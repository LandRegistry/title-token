import React from "react";
import { drizzleConnect } from "drizzle-react";
import { newContextComponents } from "drizzle-react-components";

const { AccountData, ContractData, ContractForm } = newContextComponents;

class TitleTokenViewComponent extends React.Component {

  render() {
    return (
        <div className="section">
          <h2>TitleToken</h2>
          <p>
            <strong>Total Supply: </strong>
            <ContractData
              contract="TitleCore"
              method="totalSupply"
              methodArgs={[{ from: this.props.accounts[0] }]}
            />{" "}
            <ContractData contract="TitleCore" method="symbol" hideIndicator />
          </p>
          <p>
            <strong>Amount: </strong>
            <ContractData
              contract="TitleCore"
              method="balanceOf"
              methodArgs={[this.props.accounts[0]]}
            />
          </p>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    accounts: state.accounts
  };
};

const TitleTokenView = drizzleConnect(TitleTokenViewComponent, mapStateToProps);

export default TitleTokenView;