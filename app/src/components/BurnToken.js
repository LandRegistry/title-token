import React from "react";
import { newContextComponents } from "drizzle-react-components";
const { ContractForm } = newContextComponents;

class BurnToken extends React.Component {

    render() {
        const {isBurner, drizzle, drizzleState} = this.props;

        if (isBurner) {
            return (
                <div className="section">
                    <h3>Burn Token</h3>
                    <ContractForm
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        contract="TitleCore"
                        method="burn"
                        labels={["Token ID"]}
                    />
                </div>
            );
        }
        return <> </>;
    }
}

export default BurnToken;