import React from "react";
import { newContextComponents } from "drizzle-react-components";
import GridRow from '@govuk-react/grid-row';
import { H2 } from "@govuk-react/heading";

import OwnedTokensItem from './OwnedTokensItem'

const { ContractData } = newContextComponents;

class OwnedTokensList extends React.Component {

    state = {
        getTitleKeyList: []
    };

    render() {
        const { drizzle, drizzleState, ownedTokenIds } = this.props;

        const ownedTokensList = ownedTokenIds.map(function(item, index) {
            return(
                <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="TitleCore"
                method="getTitle"
                methodArgs={item}
                render={({x, y, titleId, issuanceTime}) => (
                    <OwnedTokensItem key={index} tokenId={item} titleId={titleId} issuanceTime={issuanceTime} />
                )}
                />
            )
        });

        return (
            <div>
                <H2>Owned tokens</H2>
                {ownedTokensList}
            </div>
        );
    }
}

export default OwnedTokensList;