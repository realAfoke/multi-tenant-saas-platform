import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Dashboard from './pages/Dashboard.jsx'
import './index.css'
// import App from './App.jsx'

const routes = createBrowserRouter([
  {
    path: 'login', element: <Login />,
  },
  { path: 'dashboard', element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
  { path: '/', element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)
