import React from "react";
import {
  AccountData,
  ContractData,
  ContractForm,
} from "drizzle-react-components";

import logo from "./title_token.png";

export default ({ accounts }) => (
  <div className="App">
    <div>
      <img src={logo} alt="drizzle-logo" />
      <h1>Title Token</h1>
    </div>

    <div className="section">
      <h2>Active Account</h2>
      <AccountData accountIndex="0" units="ether" precision="3" />
    </div>

    <div className="section">
      <h2>TitleToken</h2>
      <p>
        <strong>Total Supply: </strong>
        <ContractData
          contract="TitleCore"
          method="totalSupply"
          methodArgs={[{ from: accounts[0] }]}
        />{" "}
        <ContractData contract="TitleCore" method="symbol" hideIndicator />
      </p>
      <p>
        <strong>Amount: </strong>
        <ContractData
          contract="TitleCore"
          method="balanceOf"
          methodArgs={[accounts[0]]}
        />
      </p>
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

  </div>
);
