import React from "react";

import { H2 } from '@govuk-react/heading';
import GridRow from '@govuk-react/grid-row';
import GridCol from '@govuk-react/grid-col';

import IssueToken from "../token-controls/IssueToken";
import BurnToken from "../token-controls/BurnToken";

class TitleTokenControls extends React.Component {

  state = {
    isOwner: false
  }

  render() {
    const {drizzle, drizzleState} = this.props;

    drizzle.contracts.TitleCore.methods.isOwner().call({from: drizzleState.accounts[0]})
      .then((result) => this.setState({isOwner: result}))

    if (this.state.isOwner) {
      return (
        <GridRow>
          <GridCol setWidth="one-half">
            <H2>Issue Token</H2>
            <IssueToken drizzle={drizzle} drizzleState={drizzleState} />
          </GridCol>
          <GridCol setWidth="one-half">
            <H2>Burn Token</H2>
            <BurnToken drizzle={drizzle} drizzleState={drizzleState} />
          </GridCol>
        </GridRow>
      );
    }
    return <> </>;
  }
}

export default TitleTokenControls;