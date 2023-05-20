import {
  Outlet,
  useNavigate,
  useRevalidator,
  useRouteLoaderData,
} from 'react-router-dom'
import { auth } from './firebaseConfig'
import tw from 'twin.macro'
import AuthAPI from './api/AuthAPI'
import { useEffect } from 'react'

export const appLoader = async () => auth.currentUser

/**@returns {import('firebase/auth').User} */
export const useAppData = () => useRouteLoaderData('app')

export default function App() {
  const { revalidate } = useRevalidator()
  useEffect(() => {
    auth.onAuthStateChanged(() => revalidate())
  }, [])

  return (
    <Body>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </Body>
  )
}

const Body = tw.div`[--header-height: 6.5rem] bg-gradient-to-b from-black via-fuchsia-900 to-amber-500`
const Main = tw.main`overflow-y-auto h-[calc(100vh - var(--header-height))] w-screen`

const Header = () => {
  const user = useAppData()
  const nav = useNavigate()

  const logout = async () => {
    const success = await AuthAPI.signOut()
    if (success) nav('/login')
  }

  return (
    <HeaderWrapper>
      {user && (
        <ProfileWrapper>
          <ProfileImg src={user.photoURL} alt='pfp' />
          <UserName>{user.displayName}</UserName>
          <SignOutButton onClick={logout}>Sign Out</SignOutButton>
        </ProfileWrapper>
      )}
    </HeaderWrapper>
  )
}

const HeaderWrapper = tw.div`h-[var(--header-height)] w-full flex items-center justify-between px-8 shadow-md bg-gradient-to-r from-fuchsia-700 to-amber-400`
const ProfileImg = tw.img`rounded-full w-12 h-12 border-2 border-white`
const UserName = tw.h6`text-lg text-white font-bold`
const ProfileWrapper = tw.div`flex items-center gap-4`
const SignOutButton = tw.button`px-4 py-1 bg-white border border-gray-300 rounded-lg text-lg transition-all duration-300 hover:bg-gray-100`
