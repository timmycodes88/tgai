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
  sendMessage: async (message, isAI) => {
    const { displayName, photoURL, uid: cuid } = auth.currentUser
    const col = collection(db, 'messages')

    const username = isAI ? 'tg-AI' : displayName
    const image = isAI
      ? 'https://tse1.mm.bing.net/th?id=OIP.duhHNy7oYUHAmZDkaMEidQHaHa&pid=Api&P=0&h=180'
      : photoURL
    const uid = isAI ? 'ai' : cuid

    await addDoc(col, {
      username,
      image,
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
