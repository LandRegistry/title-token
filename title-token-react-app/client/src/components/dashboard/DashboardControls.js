import React from "react";
import GridRow from '@govuk-react/grid-row';
import GridCol from '@govuk-react/grid-col';
import IssueToken from "../token-controls/IssueToken";
import BurnToken from "../token-controls/BurnToken";

class TitleTokenControls extends React.Component {
  state = { 
    userIsIssuer: null, 
    userIsBurner: null
  };

  componentDidMount() {
    const { drizzle } = this.props;
    const titleTokenContract = drizzle.contracts.TitleCore;

    const userIsIssuer = titleTokenContract.methods["isIssuer"].cacheCall();
    const userIsBurner = titleTokenContract.methods["isBurner"].cacheCall();
    this.setState({ userIsIssuer, userIsBurner });
  }

  render() {
    const {drizzle, drizzleState} = this.props;
    const { TitleCore } = drizzleState.contracts;
    
    const isIssuer = TitleCore.isIssuer[this.state.userIsIssuer];
    const isBurner = TitleCore.isBurner[this.state.userIsBurner];
    return (
      <GridRow>
        <GridCol setWidth="one-half">
          <IssueToken isIssuer={isIssuer && isIssuer.value} drizzle={drizzle} drizzleState={drizzleState} />
        </GridCol>
        <GridCol setWidth="one-half">
          <BurnToken isBurner={isBurner && isBurner.value} drizzle={drizzle} drizzleState={drizzleState} />
        </GridCol>
        {/* <TransferToken isBurner={isBurner && isBurner.value} drizzle={drizzle} drizzleState={drizzleState} /> */}
      </GridRow>
    );
  }
}

export default TitleTokenControls;