import React from "react";
import { DrizzleContext } from "drizzle-react";

import Main from '@govuk-react/main';

import Loading from "../common/Loading";
import ViewTitleInformationPage from "./ViewTitleInformationPage";


class ViewTitleInformationPageContainer extends React.Component {

    render () {
        const { titleId } = this.props;

        return (
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
                            <ViewTitleInformationPage 
                                drizzle={drizzle}
                                drizzleState={drizzleState}
                                titleId={titleId}
                            />
                        </Main>
                    );
                }}
            </DrizzleContext.Consumer>
        )
    }
}

export default ViewTitleInformationPageContainer;