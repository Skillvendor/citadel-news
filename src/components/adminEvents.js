import React from "react";
import styled from "styled-components";

import DatePicker from "./datepicker";
import DropdownPicker from './dropdownPicker';
import { addCalendarEvent, updateCalendarEvent, deleteCalendarEvent } from "../lib/firebase/calendarEvent";
import { eventTypes } from "../lib/constants";


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
  padding: 10px;
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

const DropDownContainer = styled.div`
  background-color: #FFFFFF;
  margin: 10px;
  padding: 10px;
  width: fit-content;
`;

export default class AdminEvents extends React.Component {
  constructor(props) {
    super(props);

    const {
      event
    } = props

    this.state = {
      id: event?.id || "",
      title: event?.title || "",
      shortDescription: event?.shortDescription || "",
      description: event?.description || "",
      start: event?.start || new Date(),
      end: event?.end || new Date((new Date()).setHours((new Date()).getHours() + 2)),
      eventType: event?.eventType || "",
      event: "",
      loading: false
    };
  }

  handleChange(event, field) {
    this.setState({ [`${field}`]: event.target.value });
  }

  handleDateChange(value, field) {
    this.setState({ [`${field}`]: value });
  }

  async saveEvent() {
    if(this.state.loading) {
      return
    }
    this.setState({event: "Creating event...", loading: true});
    await addCalendarEvent({ ...this.state });
    this.setState({event: "Event created!", loading: false, title: "", shortDescription: "", description: "", eventType: "", start: new Date(), end: new Date((new Date()).setHours((new Date()).getHours() + 2))});
  }

  async updateEvent() {
    if(this.state.loading) {
      return
    }
    this.setState({event: "Updating event...", loading: true});
    await updateCalendarEvent({ ...this.state });
    this.setState({event: "Event updated!", loading: false });
  }

  async deleteEvent() {
    if(this.state.loading) {
      return
    }
    this.setState({event: "Deleting event...", loading: true});
    await deleteCalendarEvent( this.state.id );
    this.setState({event: "Event deleted!", loading: false });
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
        <DropDownContainer>
          <DropdownPicker
            name="Event Type"
            value={this.state.eventType}
            handleChange={(event) => this.setState({ eventType: event.target.value })}
            items={eventTypes}
          />
        </DropDownContainer>
        { this.props.event?.id ?
          (
            <React.Fragment>
              <Button disabled={this.state.loading} onClick={() => this.updateEvent()}>Update Event</Button>
              <Button disabled={this.state.loading} onClick={() => this.deleteEvent()}>Delete Event</Button>
            </React.Fragment>
          ) :
          (
            <Button disabled={this.state.loading} onClick={() => this.saveEvent()}>Create Event</Button>
          )
        }

        <Event>{this.state.event}</Event>
      </Container>
    );
  }
}
