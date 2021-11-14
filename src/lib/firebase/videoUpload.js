import db from './firebase';
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import Video from '../../models/video';

const isValid = (data) => {
  if(!data.videoUrl) {
    return false
  }

  return true;
}

export const addVideo = async (data) => {
  if(!isValid(data)) {
    return
  }

  try {
    const docRef = await addDoc(collection(db, "ntVideos"), {
      videoUrl: data.videoUrl,
      createdAt: new Date()
    });
    console.log("Event written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding event to calendar: ", e);
  }
}

export const getLastVideo = async (data) => {
  const q = query(collection(db, "ntVideos"), orderBy("createdAt", "desc"), limit(1))

  const querySnapshot = await getDocs(q);

  let video
  querySnapshot.forEach((doc) => {
    video = new Video({ id: doc.id, ...doc.data() })
  });

  return video
}
