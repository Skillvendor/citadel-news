import { app } from './firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

class AdminAuth {
  constructor() {
    this.auth = getAuth();
  }

  async signIn(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      console.log('Properly Authed')
      return true
    } catch(e) {
      console.log('Not Authed')
      return false
    }
  }
}

const admin = new AdminAuth();

export default admin
