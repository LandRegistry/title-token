import React from "react";
import { drizzleConnect } from "drizzle-react";
import {
  AccountData,
  ContractData,
  ContractForm,
} from "drizzle-react-components";

class AccountComponent extends React.Component {
    render() {
        return (
            <div className="section">
                <h2>Active Account</h2>
                <AccountData accountIndex="0" units="ether" precision="3" />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      accounts: state.accounts,      
      drizzleStatus: state.drizzleStatus,
    };
  };
  
const Account = drizzleConnect(AccountComponent, mapStateToProps);
  
export default Account;