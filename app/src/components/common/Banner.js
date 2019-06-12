import React from "react";
import styled from 'styled-components';
import Panel from '@govuk-react/panel';
import logo from "../../static/images/title_token.png";

const StyledPanel = styled(Panel)`
    background-color: #005ea5;
    margin-bottom: 2em;
`;

class Banner extends React.Component {

  render() {
    return (      
      <StyledPanel title="Title Token Dashboard">
          <img src={logo} width="200" height="200" alt="title-token-logo" />
      </StyledPanel>
    )
  }
}

export default Banner;