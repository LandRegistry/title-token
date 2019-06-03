import React from "react";
import { DrizzleContext } from "drizzle-react";

import Account from "./Account";
import Header from "./Header";
import TitleTokenDashboard from "./TitleTokenDashboard";

export default () => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;
  
      if (!initialized) {
        return (
          <div className="App">
            <h1><span role="img" aria-label="Loading icon">⚙️</span></h1>
            <p>Loading dapp...</p>
          </div>
        );
      }

      return (
        <div className="App">
          <Header />
          <Account drizzle={drizzle} drizzleState={drizzleState}/>
          <TitleTokenDashboard drizzle={drizzle} drizzleState={drizzleState} />
        </div>
      );
    }}
  </DrizzleContext.Consumer>
)
