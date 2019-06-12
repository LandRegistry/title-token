import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import  { Drizzle, generateStore } from "drizzle";
import { DrizzleContext } from "drizzle-react";

import drizzleOptions from "../drizzleOptions";

import Header from "./common/Header";
import Dashboard from "./dashboard/Dashboard";
import StartPage from "./start-page/StartPage";

const drizzleStore = generateStore(drizzleOptions);
const drizzle = new Drizzle(drizzleOptions, drizzleStore);

class App extends Component {

  render() {
    return (
      <DrizzleContext.Provider drizzle={drizzle}>
        <Router>
          <Header />
          <Route exact path="/" component={StartPage} />
          <Route path="/dashboard" component={Dashboard} />
        </Router>
      </DrizzleContext.Provider>
    );
  }
}

export default App;
