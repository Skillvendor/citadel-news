import React from "react";
import styled from "styled-components";
import NewsPiece from "../components/newsPiece";

import NeoLogo from "../images/neo-tokyo-logo.png";
import SmallNeoLogo from "../images/small-neo-tokyo-logo.png";

import allIssues from "../newsIssues/index";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #000000;
`;

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

const IssuesContainer = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: 20px;
  width: 70%;
`;

const Logo = styled.img``;

export default class NewsPage extends React.Component {
  render() {
    // eslint-disable-next-line no-restricted-globals
    const screenWidth = screen.width;

    return (
      <PageContainer>
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
        <Issues />
      </PageContainer>
    );
  }
}

function Issues() {
  // const { data, error, isLoading } = useMoralisQuery("News");

  // if (error) {
  //   return <pre>Access denied</pre>;
  // }

  // if (isLoading) {
  //   return <pre>loading...</pre>;
  // }

  return (
    <IssuesContainer>
      {allIssues.map((issue, index) => (
        // <NewsPiece key={index} {...{object: issue}} />
        <NewsPiece key={index} {...issue} />
      ))}
    </IssuesContainer>
  );
}
