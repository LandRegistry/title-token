import React from "react";
import { newContextComponents } from "drizzle-react-components";
import { H2 } from "@govuk-react/heading";
import LabelText from "@govuk-react/label-text";

import Paragraph from './common/Paragraph';

const { ContractData } = newContextComponents;

class TokenDetails extends React.Component {

    state = { 
        data: null,
        balanceOfKey: null,
        titles: null
    };
    
    componentDidMount() {
        const { drizzle, drizzleState} = this.props;
        const titleTokenContract = drizzle.contracts.TitleCore;
        const balanceOfKey = titleTokenContract.methods["balanceOf"].cacheCall(drizzleState.accounts[0]);
        this.setState({ balanceOfKey });

        this.callBackendAPI()
            .then((res) => {
                let titles = [];
                for (let key in res) {
                    titles.push(res[key]);
                } 
                this.setState({ titles: titles });
            })
            .catch(err => console.log(err));
    }

    callBackendAPI = async () => {
        const response = await fetch('/titles');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message) 
        }
        return body;
    };
    
    render() {
        const {drizzle, drizzleState} = this.props;
        const { TitleCore } = this.props.drizzleState.contracts;
        const balance = TitleCore.balanceOf[this.state.balanceOfKey];

        return (
            <div>
                <H2>Token details</H2>
                <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="TitleCore"
                    method="totalSupply"
                    methodArgs={[{ from: drizzleState.accounts[0] }]}
                    render={data => (
                        <div>
                            <LabelText>Total supply:</LabelText>
                            <Paragraph>
                                <strong>{data} title token(s)</strong>
                            </Paragraph>
                        </div>
                    )}
                />
                <div>
                    <LabelText>Total owned:</LabelText>
                    <Paragraph>
                        <strong>{balance && balance.value} title token(s)</strong> 
                    </Paragraph>
                </div>
            </div>
        );
    }
}

export default TokenDetails;