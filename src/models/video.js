export default class Video {
  constructor(firebaseObject) {
    this.id = firebaseObject.id
    this.videoUrl = firebaseObject.videoUrl
    this.createdAt = firebaseObject.createdAt
  }
}
