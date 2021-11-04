import React from 'react';

import styled from "styled-components";

import NeoLogo from "../images/neo-tokyo-logo.png";
import SmallNeoLogo from "../images/small-neo-tokyo-logo.png";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  column-gap: 20px;
  align-items: center;

  margin-bottom: 50px;
`;

const HeaderText = styled.div`
  color: #ffffff;

  font-family: Orbitron;
  font-style: normal;
  font-weight: 900;
  font-size: 84.8px;
  line-height: 106px;
  text-align: center;
  letter-spacing: 0.06em;

  @media all and (max-width: 700px) {
    font-size: 24px;
    line-height: 30px;
    text-align: center;
    letter-spacing: 0.06em;
  }
`;

const Logo = styled.img``;

export default class Header extends React.Component {
  render() {
    // eslint-disable-next-line no-restricted-globals
    const screenWidth = screen.width;

    return (
      <HeaderContainer>
        {screenWidth <= 700 && (
          <React.Fragment>
            <Logo src={SmallNeoLogo} />
            <HeaderText>NEO TOKYO NEWS</HeaderText>
          </React.Fragment>
        )}

        {screenWidth > 700 && (
          <React.Fragment>
            <HeaderText>NEO TOKYO</HeaderText>
            <Logo src={NeoLogo} />
            <HeaderText>NEWS</HeaderText>
          </React.Fragment>
        )}
      </HeaderContainer>
    );
  }
}


