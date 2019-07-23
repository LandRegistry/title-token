import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import  { Drizzle, generateStore } from "drizzle";
import { DrizzleContext } from "drizzle-react";

import drizzleOptions from "../drizzleOptions";

import Header from "./common/Header";
import DashboardPage from "./dashboard-page/DashboardPage";
import StartPage from "./start-page/StartPage";
import IdentityVerificationPage from "./identity-verification-page/IdentityVerificationPage";
import SelectTitlePage from "./select-title-page/SelectTitlePage";
import WalletAddressPage from "./wallet-address-page/WalletAddressPage";
import CheckAnswersPage from "./check-answers-page/CheckAnswersPage";
import SuccessPage from "./success-page/SuccessPage";
import WorklistPage from "./worklist-page/WorklistPage";
import ViewTitleInformationPageContainer from "./view-title-information-page/ViewTitleInformationPageContainer";

require('dotenv').config({path: "../.env"});

const drizzleStore = generateStore(drizzleOptions);
const drizzle = new Drizzle(drizzleOptions, drizzleStore);

class App extends Component {

  render() {
    return (
      <DrizzleContext.Provider drizzle={drizzle}>
        <Router>
          <Header />
          <Route exact path="/" component={StartPage} />
          <Route path="/idv" component={IdentityVerificationPage} />
          <Route path="/select-title" component={SelectTitlePage} />
          <Route path="/wallet-address" component={WalletAddressPage} />
          <Route path="/check-answers" component={CheckAnswersPage} />
          <Route path="/success" component={SuccessPage} />
          <Route path="/worklist" component={WorklistPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route 
            path="/view-title/:titleId"
            render={props => (
              <ViewTitleInformationPageContainer 
                titleId={props.match.params.titleId}
                drizzle={drizzle}
              />
            )}
          />
        </Router>
      </DrizzleContext.Provider>
    );
  }
}

export default App;
