import React from "react";
import { useMoralisQuery } from "react-moralis";
import styled from "styled-components";

import DownArrow from "../images/ArrowDown.png";
import RightArrow from "../images/ArrowRight.png";

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AccordionButtonRow = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  width: 100%;
`;

const ArrowContainer = styled.img`
  width: 19px;
  height: 19px;
`;

const TextContainer = styled.div`
  font-family: Orbitron;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 28px;
  /* identical to box height */

  color: #ffffff;
`;

const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 40px;

  ${(props) =>
    props.clicked
      ? `
    display: block;
  `
      : `
    display: none;
  `}
`;

const NewsImage = styled.embed`
  width: 761px;
  height: 1074px;
`;

export default class NewsPiece extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
    };
  }

  invertAccordion() {
    this.setState({ clicked: !this.state.clicked });
  }

  render() {
    const arrowImg = this.state.clicked ? DownArrow : RightArrow;

    return (
      <AccordionContainer>
        <AccordionButtonRow>
          <ArrowContainer
            src={arrowImg}
            onClick={() => this.invertAccordion()}
          />
          <TextContainer>
            Issue #{this.props.object.get("title")}{" "}
          </TextContainer>
        </AccordionButtonRow>
        <NewsContainer clicked={this.state.clicked}>
          <News object={this.props.object} />
        </NewsContainer>
      </AccordionContainer>
    );
  }
}

function News(props) {
  const { data, error, isLoading } = useMoralisQuery("Images", (query) =>
    query.equalTo("news", props.object).ascending("name")
  );

  if (error) {
    return <pre>Access denied</pre>;
  }

  if (isLoading) {
    return <pre>loading...</pre>;
  }

  return (
    <div>
      {data.map((image, index) => (
        <NewsImage key={index} src={image.get("file").url()} />
      ))}
    </div>
  );
}
