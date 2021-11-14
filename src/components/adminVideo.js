import React from 'react';

import styled from "styled-components";

import { addVideo, getLastVideo } from "../lib/firebase/videoUpload";

const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  width: 500px;
`;

const Title = styled.div`
  margin 10px;
  color: white;
  font-weight: bold;
  font-size: 24px;
`;

const Input = styled.input`
  width: 100%;
  margin: 10px;
  height: 20px;
`;

const Button = styled.button`
  margin: 10px;
  background-color: black;
  color: white;
  border: 1px solid white;
  padding: 5px;
  max-width: 100px;
`;

const Event = styled.label`
  color: orange;
`;

export default class AdminVideo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      videoUrl: '',
      event: '',
      lastVideoUrl: '',
    }
  }

  handleChange(event) {
    this.setState({ videoUrl: event.target.value })
  }

  async saveUrl() {
    this.setState({ event: 'Creating video...' })
    await addVideo({ ...this.state })
    this.setState({ event: 'Video Saved!' })
    await this.getLastVideo()
  }

  async getLastVideo() {
    console.log('GettingLastVideo')
    const video = await getLastVideo()
    this.setState({ lastVideoUrl: video.videoUrl })
  }

  render() {
    return (
      <VideoContainer>
        <Title> Upload new video </Title>
        <Input
          type="text"
          value={this.state.videoUrl}
          onChange={(e) => this.handleChange(e)}
        />
        <Button disabled={this.state.loading} onClick={() => this.saveUrl()}>Create Video</Button>
        <Event>{this.state.event}</Event>
        <Event>{this.state.lastVideoUrl}</Event>
      </VideoContainer>
    );
  }
}


