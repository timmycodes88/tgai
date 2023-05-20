import tw from 'twin.macro'
import AuthAPI from '../api/AuthAPI'
import { useAppData } from '../App'

export default function Home() {
  const user = useAppData()
  const logout = () => AuthAPI.signOut()
  return <div></div>
}
