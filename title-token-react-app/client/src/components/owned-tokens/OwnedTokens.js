import React from "react";
import OwnedTokensContainer from './OwnedTokensContainer';

class OwnedTokens extends React.Component {

    state = {
        balanceOfKey: null
    };
    
    componentDidMount() {
        const { drizzle, drizzleState} = this.props;
        const titleTokenContract = drizzle.contracts.TitleCore;
        console.log(drizzle);
        console.log(drizzleState);
        const balanceOfKey = titleTokenContract.methods["balanceOf"].cacheCall(drizzleState.accounts[0]);
        this.setState({ balanceOfKey });
    }
    
    render() {
        const {drizzle, drizzleState} = this.props;
        const { TitleCore } = this.props.drizzleState.contracts;
        const balance = TitleCore.balanceOf[this.state.balanceOfKey];

        let ownedTokensContainer;

        if (balance && balance.value) {
            ownedTokensContainer = (
                <OwnedTokensContainer drizzle={drizzle} drizzleState={drizzleState} balance={balance && balance.value} />
            )
        }

        return (
            <div>
                {ownedTokensContainer}
            </div>
        );
    }
}

export default OwnedTokens;