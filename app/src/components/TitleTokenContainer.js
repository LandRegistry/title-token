import React from "react";
import { drizzleConnect } from "drizzle-react";
import { newContextComponents } from "drizzle-react-components";
import TitleTokenView from "./TitleTokenView";
import TitleTokenAdmin from "./TitleTokenAdmin";

class TitleTokenContainer extends React.Component {
  state = { userIsIssuer: null };

  componentDidMount() {
    const { drizzle } = this.props;
    const titleTokenContract = drizzle.contracts.TitleCore;

    const userIsIssuer = titleTokenContract.methods["isIssuer"].cacheCall();
    this.setState({ userIsIssuer });
  }

  render() {
    const {drizzle, drizzleState} = this.props;
    const { TitleCore } = drizzleState.contracts;
    
    const isIssuer = TitleCore.isIssuer[this.state.userIsIssuer];
    return (
      <div>
        <TitleTokenView drizzle={drizzle} drizzleState={drizzleState}/>
        <TitleTokenAdmin isIssuer={isIssuer && isIssuer.value} drizzle={drizzle} drizzleState={drizzleState} />
      </div>
    );
  }
}

export default TitleTokenContainer;