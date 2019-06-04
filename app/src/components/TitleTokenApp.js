import React from "react";
import { DrizzleContext } from "drizzle-react";
import styled from 'styled-components';

import Main from '@govuk-react/main';
import GridRow from '@govuk-react/grid-row';
import GridCol from '@govuk-react/grid-col';

import Banner from "./Banner";
import AccountDetails from "./AccountDetails";
import Header from "./Header";
import Loading from "./Loading";
import TokenDetails from "./TokenDetails";
import TitleTokenControls from "./TitleTokenControls";


const StyledGridRow = styled(GridRow)`
  padding-bottom: 1.5em;
`

export default () => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;
  
      if (!initialized) {
        return (
          <Loading />
        );
      }

      return (
        <div className="App">
          <Header />
          <Main>
            <Banner />
            <StyledGridRow>
              <GridCol setWidth="one-half">
                <AccountDetails drizzle={drizzle} drizzleState={drizzleState}/>
              </GridCol>
              <GridCol setWidth="one-half">
                <TokenDetails drizzle={drizzle} drizzleState={drizzleState}/>
              </GridCol>
            </StyledGridRow>
            <TitleTokenControls drizzle={drizzle} drizzleState={drizzleState} />
          </Main>
        </div>
      );
    }}
  </DrizzleContext.Consumer>
)
