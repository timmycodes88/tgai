import { createBrowserRouter, redirect } from 'react-router-dom'
import App from './App'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '*', loader: () => redirect('/') },
])

export default router
