const now = new Date()

const octEvents = [
  {
    id: 14,
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
    importance: 'warning'
  },
  {
    id: 15,
    title: 'Point in Time Event',
    start: now,
    end: now,
  },
]

export default octEvents;
