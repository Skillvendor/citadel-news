import React from "react";
import styled from "styled-components";

import DatePicker from "./datepicker";
import { addCalendarEvent } from "../lib/firebase/calendarEvent";

const Container = styled.div`
  margin: 20px;
  color: white;
`;

const Label = styled.label`
  display: block;
  margin: 10px;
  width: 500px;
`;

const Input = styled.input`
  width: 100%;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 200px;
`;

const PickerContainer = styled.div`
  background-color: white;
  margin: 10px;
  width: fit-content;
`;

const Button = styled.button`
  margin: 10px;
  background-color: black;
  color: white;
  border: 1px solid white;
  padding: 5px;
`;

const Event = styled.label`
  color: orange;
`;

export default class AdminEvents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      shortDescription: "",
      description: "",
      start: new Date(),
      end: (new Date()).setHours((new Date()).getHours() + 2),
      event: "",
    };
  }

  handleChange(event, field) {
    this.setState({ [`${field}`]: event.target.value });
  }

  handleDateChange(value, field) {
    this.setState({ [`${field}`]: value });
  }

  async saveEvent() {
    this.setState({event: "Creating event..."});
    await addCalendarEvent({ ...this.state });
    this.setState({event: "Event created!", title: "", shortDescription: "", description: "", start: new Date(), end: (new Date()).setHours((new Date()).getHours() + 2)});
  }

  render() {
    return (
      <Container>
        <Label>
          Title{" "}
          <Input
            type="text"
            value={this.state.title}
            onChange={(e) => this.handleChange(e, "title")}
          />
        </Label>
        <Label>
          Short Description{" "}
          <Input
            type="text"
            value={this.state.shortDescription}
            onChange={(e) => this.handleChange(e, "shortDescription")}
          />
        </Label>
        <Label>
          Text
          <Textarea
            type="text"
            value={this.state.description}
            onChange={(e) => this.handleChange(e, "description")}
          />
        </Label>
        <PickerContainer>
          <DatePicker
            label="Date&Time start"
            value={this.state.start}
            handleChange={(value) => this.handleDateChange(value, "start")}
          />
        </PickerContainer>
        <PickerContainer>
          <DatePicker
            label="Date&Time end"
            value={this.state.end}
            handleChange={(value) => this.handleDateChange(value, "end")}
          />
        </PickerContainer>
        <Button onClick={() => this.saveEvent()}>Create Event</Button>
        <Event>{this.state.event}</Event>
      </Container>
    );
  }
}
