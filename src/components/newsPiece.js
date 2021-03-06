import React from "react";
import styled from "styled-components";

import DownArrow from "../images/ArrowDown.png";
import RightArrow from "../images/ArrowRight.png";
import NewsCarousel from "./newsCarousel";

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

const NewsImage = styled.img`
  border-style: groove;
  margin: 8px;
  width: 361px;
  height: 510px;
`;

export default class NewsPiece extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
      isModalOpen: false,
      newsIndexSelected: 0,
    };
  }

  invertAccordion() {
    this.setState({ clicked: !this.state.clicked });
  }

  openModal(index) {
    this.setState({ isModalOpen: true, newsIndexSelected: index });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
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
          <TextContainer>Issue #{this.props.id} </TextContainer>
          {/* <TextContainer>
            Issue #{this.props.object.get("title")}{" "}
          </TextContainer> */}
        </AccordionButtonRow>
        <NewsContainer clicked={this.state.clicked}>
          {
            this.props.images.map((image, index) => <NewsImage src={image.default} onClick={() => this.openModal(index)}/>)
          }
          <NewsCarousel
            isOpen={this.state.isModalOpen}
            closeModal={() => this.closeModal()}
            selectedNewsPiece={this.state.newsIndexSelected}
            newsPieces={this.props.images}
          />
          {/* <News object={this.props.object} /> */}
        </NewsContainer>
      </AccordionContainer>
    );
  }
}
