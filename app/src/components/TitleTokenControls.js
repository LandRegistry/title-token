import React from "react";
import IssueToken from "./IssueToken";
import BurnToken from "./BurnToken";
import TransferToken from "./TransferToken";

import { H1, H2, H3, H4, H5, H6 } from "@govuk-react/heading";

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
      <div>
        <H2>Token controls</H2>
        <IssueToken isIssuer={isIssuer && isIssuer.value} drizzle={drizzle} drizzleState={drizzleState} />
        <BurnToken isBurner={isBurner && isBurner.value} drizzle={drizzle} drizzleState={drizzleState} />
        {/* <TransferToken isBurner={isBurner && isBurner.value} drizzle={drizzle} drizzleState={drizzleState} /> */}
        
      </div>
    );
  }
}

export default TitleTokenControls;