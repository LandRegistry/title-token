import React from "react";
import { newContextComponents } from "drizzle-react-components";
const { AccountData } = newContextComponents;


class Account extends React.Component {
    
  render() {
      const {drizzle, drizzleState} = this.props;

      return (
          <div className="section">
            <h2>Active Account</h2>
            <AccountData
              drizzle={drizzle}
              drizzleState={drizzleState}
              accountIndex={0}
              units="ether"
              precision={3} 
            />
          </div>
      );
    }
}

export default Account;