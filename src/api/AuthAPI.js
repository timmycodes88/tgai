import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { auth } from '../firebaseConfig'

const provider = new GoogleAuthProvider()

const AuthAPI = {
  /**
   * Triggers Sign in Popup with Google
   * @returns {Promise<boolean>} true if successful, false if not
   */
  googleSignIn: async () => {
    try {
      await signInWithPopup(auth, provider)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  },
  /**
   * Signs out the current user
   */
  signOut: async () => {
    try {
      await signOut(auth)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  },
}

export default AuthAPI
