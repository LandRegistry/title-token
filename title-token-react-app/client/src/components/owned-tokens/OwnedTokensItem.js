import React from "react";
import LabelText from "@govuk-react/label-text";
import Paragraph from '../common/Paragraph';
import GridCol from '@govuk-react/grid-col';
import GridRow from '@govuk-react/grid-row';
import styled from 'styled-components'

const StyledGridRow = styled(GridRow)`
    padding-bottom: 1.5em;
`

class OwnedTokensItem extends React.Component {


    render() {
        const { tokenId, titleId, issuanceTime } = this.props;
        const issuanceDateTime = new Date(0);
        issuanceDateTime.setUTCSeconds(issuanceTime)

        return (
            <div>
                <StyledGridRow>
                    <GridCol setWidth="one-third">
                        <LabelText>Token ID:</LabelText>
                        <Paragraph>
                            <strong>{tokenId}</strong>
                        </Paragraph>
                    </GridCol>
                    <GridCol setWidth="one-third">
                        <LabelText>Title ID:</LabelText>
                        <Paragraph>
                            <strong>{titleId}</strong>
                        </Paragraph>
                    </GridCol>
                    <GridCol setWidth="one-third">
                        <LabelText>Issuance Date:</LabelText>
                        <Paragraph>
                            <strong>{issuanceDateTime.toDateString()}</strong>
                        </Paragraph>
                    </GridCol>
                </StyledGridRow>
            </div>
        );
    }
}

export default OwnedTokensItem;