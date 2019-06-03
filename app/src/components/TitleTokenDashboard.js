import React from "react";
import TitleTokenAmount from "./TitleTokenAmount";
import IssueToken from "./IssueToken";
import BurnToken from "./BurnToken";
import TransferToken from "./TransferToken";

class TitleTokenDashboard extends React.Component {
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
        <TitleTokenAmount drizzle={drizzle} drizzleState={drizzleState}/>
        <IssueToken isIssuer={isIssuer && isIssuer.value} drizzle={drizzle} drizzleState={drizzleState} />
        <BurnToken isBurner={isBurner && isBurner.value} drizzle={drizzle} drizzleState={drizzleState} />
        {/* <TransferToken isBurner={isBurner && isBurner.value} drizzle={drizzle} drizzleState={drizzleState} /> */}
        
      </div>
    );
  }
}

export default TitleTokenDashboard;