import React from "react";
import { drizzleConnect } from "drizzle-react";
import { newContextComponents } from "drizzle-react-components";
import TitleTokenView from "./TitleTokenView";
import TitleTokenAdmin from "./TitleTokenAdmin";

class TitleTokenContainerComponent extends React.Component {

  render() {
    return (
      <div>
        <TitleTokenView />
        <TitleTokenAdmin />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    TitleToken: state.contracts.TitleCore,
    drizzleStatus: state.drizzleStatus,
  };
};

const TitleTokenContainer = drizzleConnect(TitleTokenContainerComponent, mapStateToProps);

export default TitleTokenContainer;