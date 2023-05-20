import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from 'firebase/firestore'
import { auth, db } from '../firebaseConfig'

/**
 * @typedef {Object} Message
 * @property {string | 'ai'} uid
 * @property {string} username
 * @property {string} image
 * @property {string} message
 * @property {number} timestamp
 */

const ChatAPI = {
  sendMessage: async message => {
    const { displayName, photoURL, uid } = auth.currentUser
    const col = collection(db, 'messages')
    await addDoc(col, {
      username: displayName,
      image: photoURL,
      message,
      timestamp: Date.now(),
      uid,
    })
  },
  listen: cb => {
    const col = collection(db, 'messages')
    const q = query(col, orderBy('timestamp', 'asc'))
    const unsubscribe = onSnapshot(q, snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          cb(change.doc.data())
        }
      })
    })

    return () => unsubscribe()
  },
}

export default ChatAPI
