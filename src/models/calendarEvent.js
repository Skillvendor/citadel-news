export default class CalendarEvent {
  constructor(firebaseObject) {
    this.id = firebaseObject.id
    this.title = firebaseObject.title
    this.shortDescription = firebaseObject.shortDescription
    this.description = JSON.parse(firebaseObject.description)
    this.eventType = firebaseObject.eventType
    this.start = new Date(firebaseObject.start)
    this.end = new Date(firebaseObject.end)
  }
}
