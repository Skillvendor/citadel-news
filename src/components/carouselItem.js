import React from 'react';
import Carousel from 'react-bootstrap/Carousel'

import styled from "styled-components";

const NewsImage = styled.img`
  border-style: groove;
  width: 582px;
  height: 821px;
  overflow: scroll;
`;

export default class CarouselItem extends React.Component {

  render() {
    return (
      <Carousel.Item>
        <NewsImage src={this.props.image.default} />
      </Carousel.Item>
    );
  }
}


