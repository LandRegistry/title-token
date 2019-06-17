import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import  { Drizzle, generateStore } from "drizzle";
import { DrizzleContext } from "drizzle-react";

import drizzleOptions from "../drizzleOptions";

import Header from "./common/Header";
import Dashboard from "./dashboard/Dashboard";
import StartPage from "./start-page/StartPage";
import IdentityVerificationPage from "./identity-verification-page/IdentityVerificationPage";
import SelectTitlePage from "./select-title-page/SelectTitlePage";
import WalletAddressPage from "./wallet-address-page/WalletAddressPage";
import SuccessPage from "./success-page/SuccessPage";

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
          <Route path="/success" component={SuccessPage} />
          <Route path="/dashboard" component={Dashboard} />
        </Router>
      </DrizzleContext.Provider>
    );
  }
}

export default App;
