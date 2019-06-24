import React from "react";
import { DrizzleContext } from "drizzle-react";
import styled from 'styled-components';

import Main from '@govuk-react/main';
import GridRow from '@govuk-react/grid-row';
import GridCol from '@govuk-react/grid-col';

import Loading from "../common/Loading";
import CheckAnswersPage from "./CheckAnswersPage";

const StyledGridRow = styled(GridRow)`
  padding-bottom: 1.5em;
`

export default () => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;
      console.log(drizzleContext);
  
      if (!initialized) {
        return (
          <Loading />
        );
      }

      return (
        <div>
          <Main>
            <GridRow>
              <GridCol>
                <CheckAnswersPage drizzle={drizzle} drizzleState={drizzleState} />
              </GridCol>
            </GridRow>
          </Main>
        </div>
      );
    }}
  </DrizzleContext.Consumer>
)
