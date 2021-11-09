import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styled from "styled-components";

import Output from 'editorjs-react-renderer';

const StyledBox = styled(Box)`
  word-wrap: break-word
`;

const TitleContainer = styled.div`
  font-family: Orbitron;
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  letter-spacing: 0.06em;

  color: #FFFFFF;
`;

const EventDescriptionContainer = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  letter-spacing: 0.06em;

  color: #FFFFFF;
`;

export default function BasicModal(props) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'black',
    border: `4px solid ${props.borderColor}`,
    boxShadow: 24,
    p: 4,
  };


  const parsedDescription = props.event?.description ? JSON.parse(props.event.description) : {}
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledBox sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <TitleContainer>
              {props.event.title}
            </TitleContainer>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <EventDescriptionContainer>
              <Output data={ parsedDescription } />
            </EventDescriptionContainer>
          </Typography>
        </StyledBox>
      </Modal>
    </div>
  );
}
