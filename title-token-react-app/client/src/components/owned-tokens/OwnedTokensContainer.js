import React from "react";
import OwnedTokensList from './OwnedTokensList';

class OwnedTokensContainer extends React.Component {

    state = {
        tokenOfOwnerByIndexKeyList: []
    };

    componentDidMount() {
        const { drizzle, drizzleState, balance } = this.props;
        const titleTokenContract = drizzle.contracts.TitleCore;

        let tokenOfOwnerByIndexKeyList = [];

        for (let i=0; i < balance; i++) {
            tokenOfOwnerByIndexKeyList.push(titleTokenContract.methods["tokenOfOwnerByIndex"].cacheCall(drizzleState.accounts[0], i));
        }
        this.setState({ tokenOfOwnerByIndexKeyList });
    }

    render() {
        const { drizzle, drizzleState } = this.props;
        const { TitleCore } = this.props.drizzleState.contracts;

        let ownedTokenIds = [];

        for (let i = 0; i < this.state.tokenOfOwnerByIndexKeyList.length; i++) {
            let titleId = TitleCore.tokenOfOwnerByIndex[this.state.tokenOfOwnerByIndexKeyList[i]]
            if (titleId && titleId.value) {
                ownedTokenIds.push(titleId.value);
            }
        }

        if (ownedTokenIds.length > 0) {
            return (
                <div>
                    <OwnedTokensList drizzle={drizzle} drizzleState={drizzleState} ownedTokenIds={ownedTokenIds} />
                </div>
            );
        } else {
            return (null);
        }
    }
}

export default OwnedTokensContainer;