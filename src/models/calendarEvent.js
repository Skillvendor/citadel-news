export default class CalendarEvent {
  constructor(firebaseObject) {
    console.log('THIS IS THE FIREBASE OBJ', firebaseObject)
    this.id = firebaseObject.id
    this.title = firebaseObject.title
    this.shortDescription = firebaseObject.shortDescription
    this.description = firebaseObject.description
    this.eventType = firebaseObject.eventType
    this.start = this.toDateTime(firebaseObject.start.seconds)
    this.end = this.toDateTime(firebaseObject.end.seconds)
  }

  toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
  }
}
