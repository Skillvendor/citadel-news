import React from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';

import moment from 'moment'

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { getCalendarEvents } from '../lib/firebase/calendarEvent';

export default class NTCalendar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      events: []
    }
  }

  async componentDidMount() {
    const events = await getCalendarEvents();
    this.setState({ events })
  }

  getEventColor = ({ importance }) => {
    let bgColor;

    switch (importance) {
      case 'urgent':
        bgColor = 'red'
        break;
      case 'warning':
        bgColor = 'yellow'
        break;
      default:
        bgColor = '#79b473'
    }

    return bgColor;
  }

  eventPropGetter = (props) => {
    return {
      style: {
        color: 'black',
        background: this.getEventColor(props)
      }
    }
  }

  render() {
    const localizer = momentLocalizer(moment)
    let allViews = [Views.MONTH, Views.AGENDA, Views.DAY]

    return(
      <Calendar
        localizer={localizer}
        events={this.state.events}
        views={allViews}
        startAccessor="start"
        endAccessor="end"
        // eslint-disable-next-line no-restricted-globals
        style={{ height: screen.height }}
        showMultiDayTimes
        eventPropGetter={this.eventPropGetter}
      />
    )
  }
};
