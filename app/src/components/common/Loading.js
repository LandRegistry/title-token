import React from "react";
import { H1 } from "@govuk-react/heading";
import styled from 'styled-components'

const StyledLoading = styled.div`
    text-align: center;
    margin: 2rem;
`

class Loading extends React.Component {
    render() {
        return (
            <StyledLoading>
                <H1><span role="img" aria-label="Loading icon">⚙️</span></H1>
                <p>Loading dapp...</p>
            </StyledLoading>
        )
    }
}

export default Loading;