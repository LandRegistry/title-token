import React from "react";
import { DrizzleContext } from "drizzle-react";

import Main from '@govuk-react/main';
import GridRow from '@govuk-react/grid-row';
import GridCol from '@govuk-react/grid-col';

import Banner from "./Banner";
import AccountDetails from "./AccountDetails";
import Header from "./Header";
import TokenDetails from "./TokenDetails";
import TitleTokenControls from "./TitleTokenControls";

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
          <Main>
            <Banner />
            <GridRow>
              <GridCol setWidth="one-half">
                <AccountDetails drizzle={drizzle} drizzleState={drizzleState}/>
              </GridCol>
              <GridCol setWidth="one-half">
                <TokenDetails drizzle={drizzle} drizzleState={drizzleState}/>
              </GridCol>
            </GridRow>
            <TitleTokenControls drizzle={drizzle} drizzleState={drizzleState} />
          </Main>
        </div>
      );
    }}
  </DrizzleContext.Consumer>
)
