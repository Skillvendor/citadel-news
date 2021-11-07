import React from 'react';
import styled from "styled-components";
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import './calendarToolbar.css';

import moment from 'moment'

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { getCalendarEvents } from '../lib/firebase/calendarEvent';
import Header from '../components/header';
import PageContainer from '../components/pageContainer';
import BasicModal from '../components/basicModal';

import { eventTypes } from '../lib/constants';

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
  background: #000000;
  color: #FFFFFF;

  font-family: Orbitron !important;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  text-align: right;
  letter-spacing: 0.06em;
`;

const currentDate = new Date()
const currentMonth = currentDate.getMonth();
const currentDay = currentDate.getDate();

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
      case eventTypes['Incubator Discussions']:
        bgColor = '#92334E'
        break;
      case eventTypes['AMAs']:
        bgColor = '#4E4ECB'
        break;
      case eventTypes['Project Outreach']:
        bgColor = '#2ED3E7'
        break;
      case eventTypes['Project Support']:
        bgColor = '#EEF547'
        break;
      case eventTypes['Official NeoTokyo Event']:
        bgColor = '#FF3D2B'
        break;
      default:
        bgColor = '#79b473'
    }

    return bgColor;
  }

  getDayColor = (day, month) => {
    if(month === currentMonth) {
      if(day === currentDay) {
        return '#074ca8'
      }
      return '#000000'
    }

    return '#263130'
  }

  eventPropGetter = (props) => {
    return {
      style: {
        color: '#000000',
        background: this.getEventColor(props)
      }
    }
  }

  slotPropGetter = () => {
    return {
      style: {
        color: '#FFFFFF',
        background: '#000000'
      }
    }
  }

  dayPropGetter = (props) => {
    const date = new Date(props)
    return {
      style: {
        color: '#FFFFFF',
        background: this.getDayColor(
          date.getDate(),
          date.getMonth()
        )
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
            slotPropGetter={this.slotPropGetter}
            dayPropGetter={this.dayPropGetter}
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
