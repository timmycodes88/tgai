import tw from 'twin.macro'
import AuthAPI from '../api/AuthAPI'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const nav = useNavigate()
  const login = async () => {
    const success = await AuthAPI.googleSignIn()
    if (success) nav('/')
  }

  return (
    <LoginWrapper>
      <SignInButton onClick={login}>Sign In</SignInButton>
    </LoginWrapper>
  )
}

const LoginWrapper = tw.div`w-full h-full flex items-center justify-center`
const SignInButton = tw.button`px-4 py-1 bg-white border border-gray-300 rounded-lg text-lg transition-all duration-300 hover:bg-gray-100`
