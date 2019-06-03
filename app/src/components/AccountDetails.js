import React from "react";
import { newContextComponents } from "drizzle-react-components";
import { H1, H2, H3, H4, H5, H6 } from "@govuk-react/heading";
const { AccountData } = newContextComponents;

class AccountDetails extends React.Component {
    
  render() {
      const {drizzle, drizzleState} = this.props;

      return (
          <div>
            <H2>Account details</H2>
            <AccountData
              drizzle={drizzle}
              drizzleState={drizzleState}
              accountIndex={0}
              units="ether"
              precision={3}
              render={({ address, balance, units }) => (
                <div>
                  <p> 
                    <H3>My address:</H3> 
                    {address}
                  </p>
                  <p>
                  <H3>My Ether:</H3> 
                    {balance} {units}
                  </p>
                </div>
              )}
            />
          </div>
      );
    }
}

export default AccountDetails;