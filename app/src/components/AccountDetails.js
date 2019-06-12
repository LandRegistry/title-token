import React from "react";
import { newContextComponents } from "drizzle-react-components";
import { H2 } from "@govuk-react/heading";
import LabelText from '@govuk-react/label-text';
import Paragraph from "./common/Paragraph"
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
                  <LabelText>My address:</LabelText>  
                  <Paragraph>
                    <strong>{address}</strong>
                  </Paragraph>
                  <LabelText>My balance:</LabelText> 
                  <Paragraph>
                    <strong>{balance} {units}</strong>
                  </Paragraph>
                </div>
              )}
            />
          </div>
      );
    }
}

export default AccountDetails;