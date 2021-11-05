import React from 'react';
import styled from "styled-components";
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';

import moment from 'moment'

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { getCalendarEvents } from '../lib/firebase/calendarEvent';
import Header from '../components/header';
import PageContainer from '../components/pageContainer';
import BasicModal from '../components/basicModal';

const TitleContainer = styled.div`
  font-family: Orbitron;
  font-style: normal;
  font-weight: 900;
  font-size: 56px;
  line-height: 70px;
  text-align: center;
  letter-spacing: 0.06em;

  color: #FFFFFF;
`;

const CalendarContainer = styled.div`
  background: #FFFFFF;
`;

export default class NTCalendar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      events: [],
      selectedEvent: {},
      openModal: false
    }
  }

  async componentDidMount() {
    const events = await getCalendarEvents();
    this.setState({ events })
  }

  handleCloseModal = () => {
    this.setState({ openModal: false })
  }

  handleOpenModal = (event) => {
    this.setState({ openModal: true, selectedEvent: event})
  }

  getEventColor = ({ eventType }) => {
    let bgColor;

    switch (eventType) {
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
      <PageContainer>
        <Header />
        <TitleContainer> Events </TitleContainer>
        <CalendarContainer>
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
            onSelectEvent={event => this.handleOpenModal(event)}
          />
        </CalendarContainer>
        <BasicModal
          open={this.state.openModal}
          handleClose={() => this.handleCloseModal()}
          event={this.state.selectedEvent}
          borderColor={this.getEventColor(this.state.selectedEvent)}
        />
      </PageContainer>
    )
  }
};
