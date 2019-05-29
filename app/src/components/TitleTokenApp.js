import React from "react";
import { DrizzleContext } from "drizzle-react";

import Account from "./Account";
import Header from "./Header";
import TitleTokenContainer from "./TitleTokenContainer";

export default () => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;
  
      if (!initialized) {
        return "Loading...";
      }

      return (
        <div className="App">
          <Header />
          <Account drizzle={drizzle} drizzleState={drizzleState}/>
          <TitleTokenContainer drizzle={drizzle} drizzleState={drizzleState} />
        </div>
      );
    }}
  </DrizzleContext.Consumer>
)
