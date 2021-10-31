import React from 'react';

import DatePicker from './datepicker';
import { addCalendarEvent } from '../lib/firebase/calendarEvent';

export default class AdminEvents extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      shortDescription: '',
      description: '',
      start: '',
      end: '',
    }
  }

  handleChange(event, field) {
    this.setState({[`${field}`]: event.target.value});
  }

  handleDateChange(value, field) {
    this.setState({[`${field}`]: value});
  }

  async saveEvent() {
    await addCalendarEvent({...this.state})
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.title} onChange={(e) => this.handleChange(e, 'title')} />
        <input type="text" value={this.state.shortDescription} onChange={(e) => this.handleChange(e, 'shortDescription')} />
        <textarea type="text" value={this.state.description} onChange={(e) => this.handleChange(e, 'description')} />
        <DatePicker
          label='Date&Time start'
          value={this.state.start}
          handleChange={(value) => this.handleDateChange(value, 'start')}
        />
        <DatePicker
          label='Date&Time end'
          value={this.state.end}
          handleChange={(value) => this.handleDateChange(value, 'end')}
        />
        <button onClick={() => this.saveEvent()}>Create Event</button>
      </div>
    );
  }
}


