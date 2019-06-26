import React from "react";
import { DrizzleContext } from "drizzle-react";
import styled from 'styled-components';

import Main from '@govuk-react/main';
import GridRow from '@govuk-react/grid-row';
import GridCol from '@govuk-react/grid-col';

import Banner from "../common/Banner";
import AccountDetails from "../AccountDetails";
import Loading from "../common/Loading";
import TokenDetails from "../TokenDetails";
import DashboardControls from "./DashboardControls";
import OwnedTokens from "../owned-tokens/OwnedTokens";


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
          <StyledGridRow>
            <GridCol>
              <DashboardControls drizzle={drizzle} drizzleState={drizzleState} />
            </GridCol>
          </StyledGridRow>
          <StyledGridRow>
            <GridCol>
              <OwnedTokens drizzle={drizzle} drizzleState={drizzleState} />
            </GridCol>
          </StyledGridRow>
        </Main>
      );
    }}
  </DrizzleContext.Consumer>
)
