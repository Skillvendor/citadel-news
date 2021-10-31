const now = new Date()

const octEvents = [
  {
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
    importance: 'warning'
  },
  {
    title: 'Point in Time Event',
    start: now,
    end: now,
  },
]

export default octEvents;
