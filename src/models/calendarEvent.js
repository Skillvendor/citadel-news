export default class CalendarEvent {
  constructor(firebaseObject) {
    this.id = firebaseObject.id
    this.title = firebaseObject.title
    this.description = firebaseObject.description
    this.eventType = firebaseObject.eventType
    this.start = new Date(firebaseObject.start)
    this.end = new Date(firebaseObject.end)
  }
}
