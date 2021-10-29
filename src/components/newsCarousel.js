import React from 'react';
import Modal from '@mui/material/Modal';

import CarouselItem from './carouselItem';

import styled from "styled-components";

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  overflow: scroll;
  margin-top: 50px;
  align-content: center;
`;

const CarouselContainer = styled.div`
  display: flex;
  justify-content: center;
  overflow: scroll;
  align-content: center;
`;

// const NewsImage = styled.img`
//   border-style: groove;
//   width: 582px;
//   height: 821px;
//   self-align: center;
// `;

export default class NewsCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: props.selectedNewsPiece
    };
  }

  render() {
    return (
      <StyledModal
        open={this.props.isOpen}
        onClose={this.props.closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CarouselContainer>
          {/* <StyledCarousel> */}
            {
              this.props.newsPieces.map((image, index) => <CarouselItem key={`image_${index}`} image={image} />)
            }
          {/* </StyledCarousel> */}
        </CarouselContainer>
      </StyledModal>
    );
  }
}


