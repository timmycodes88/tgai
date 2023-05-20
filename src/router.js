import { createBrowserRouter, redirect } from 'react-router-dom'
import App, { appLoader } from './App'
import Login from './pages/Login'
import Home from './pages/Home'
import { auth } from './firebaseConfig'

const redirectLoader = (loader, path) => async () => {
  if (path === '/login' && auth.currentUser) return redirect('/')
  if (path === '/' && !auth.currentUser) return redirect('/login')
  return await loader()
}

const router = createBrowserRouter([
  {
    id: 'app',
    path: '/',
    loader: appLoader,
    element: <App />,
    children: [
      {
        index: true,
        loader: redirectLoader(() => null, '/'),
        element: <Home />,
      },
      {
        path: 'login',
        loader: redirectLoader(() => null, '/login'),
        element: <Login />,
      },
    ],
  },
  { path: '*', loader: () => redirect('/') },
])

export default router
