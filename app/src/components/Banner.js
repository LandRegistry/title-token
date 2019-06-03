import React from "react";
import styled from 'styled-components';
import Panel from '@govuk-react/panel';
import logo from "../static/images/title_token.png";

const StyledPanel = styled(Panel)`
    background-color: #005ea5;
`;

class Banner extends React.Component {

  render() {
    return (      
      <StyledPanel title="Title Token Dashboard">
          <img src={logo} alt="title-token-logo" />
      </StyledPanel>
    )
  }
}

export default Banner;