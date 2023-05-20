import { useLoaderData } from 'react-router-dom'
import { auth } from '../firebaseConfig'

export function homeLoader() {
  return auth.currentUser
}

/**@type {import('firebase/auth').User} */
export const useHomeData = () => useLoaderData()
