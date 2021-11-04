import React from "react";
import styled from "styled-components";
import NewsPiece from "../components/newsPiece";
import Header from '../components/header';
import PageContainer from '../components/pageContainer';

import allIssues from "../newsIssues/index";

const IssuesContainer = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: 20px;
  width: 70%;
`;

export default class NewsPage extends React.Component {
  render() {
    return (
      <PageContainer>
        <Header />
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
