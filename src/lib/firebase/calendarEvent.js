import db from './firebase';
import { doc, collection, addDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import CalendarEvent from '../../models/calendarEvent';

const isValid = (data) => {
  if(!data.start || !data.end || !data.title || !data.eventType) {
    return false
  }

  return true;
}
export const addCalendarEvent = async (data) => {
  if(!isValid(data)) {
    return
  }

  try {
    const docRef = await addDoc(collection(db, "calendarEvents"), {
      title: data.title,
      shortDescription: data.shortDescription,
      description: data.description,
      eventType: data.eventType,
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
    events.push(new CalendarEvent({ id: doc.id, ...doc.data() }))
  });

  return events
}

export const updateCalendarEvent = async (data) => {
  try {
    await updateDoc(doc(db, "calendarEvents", data.id), {
      title: data.title,
      shortDescription: data.shortDescription,
      description: data.description,
      eventType: data.eventType,
      start: data.start,
      end: data.end
    });
    console.log("Event updated");
  } catch (e) {
    console.error("Error updating event in calendar: ", e);
  }
  // db.collection("users").doc(doc.id).update({foo: "bar"});
}

export const deleteCalendarEvent = async (id) => {
  // const response = await deleteDoc
  try {
    await deleteDoc(doc(db, "calendarEvents", id));
    console.log("Event deleted");
  } catch (e) {
    console.error("Error deleting event in calendar: ", e);
  }
}
