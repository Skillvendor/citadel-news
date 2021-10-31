import db from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import CalendarEvent from '../../models/calendarEvent';

export const addCalendarEvent = async (data) => {
  if(!data.start || !data.end || !data.title) {
    console.log('events must have a date and title')
    return
  }

  try {
    const docRef = await addDoc(collection(db, "calendarEvents"), {
      title: data.title,
      shortDescription: data.shortDescription,
      description: data.description,
      start: data.start,
      end: data.end
    });
    console.log("Event written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding event to calendar: ", e);
  }
}

export const getCalendarEvents = async () => {
  const querySnapshot = await getDocs(collection(db, "calendarEvents"));

  const events = []
  querySnapshot.forEach((doc) => {
    events.push(new CalendarEvent(doc.data()))
  });

  return events
}
