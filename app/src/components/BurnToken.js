import React from "react";
import LabelText from '@govuk-react/label-text';
import Input from '@govuk-react/input';
import Button from '@govuk-react/button';
import { newContextComponents } from "drizzle-react-components";
const { ContractForm } = newContextComponents;

class BurnToken extends React.Component {

    render() {
        const {isBurner, drizzle, drizzleState} = this.props;

        if (isBurner) {
            return (
                <div className="section">
                    <LabelText>Burn Token</LabelText>
                    <ContractForm
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        contract="TitleCore"
                        method="burn"
                        labels={["Token ID"]}
                        render={({ inputs, inputTypes, state, handleInputChange, handleSubmit}) => (
                            <form onSumbit={handleSubmit}>
                                {inputs.map((input, index) => (
                                    <Input
                                        key={input.name}
                                        type={inputTypes[index]}
                                        name={input.name}
                                        value={state[input.name]}
                                        placeholder={input.name}
                                        onChange={handleInputChange}
                                    />
                                ))}
                                <Button>Burn</Button>
                            </form>
                        )}
                    />
                </div>
            );
        }
        return <> </>;
    }
}

export default BurnToken;