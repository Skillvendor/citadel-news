import React from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'

import events from '../events'
import moment from 'moment'

import 'react-big-calendar/lib/css/react-big-calendar.css';

export default class NTCalendar extends React.Component {

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
        events={events}
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
