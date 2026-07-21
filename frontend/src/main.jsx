import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login, { loader as loginLoader } from './pages/login.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Dashboard from './pages/dashboard.jsx'
import './index.css'
import Workspace, { workspaceLoader } from './pages/Workspace.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Create from './components/Create.jsx'
import Task from './pages/task.jsx'
import Profile from './pages/profile.jsx'
// import App from './App.jsx'
import ErrorPage from './components/Error.jsx'


const queryClient = new QueryClient()

const routes = createBrowserRouter([
  {
    path: 'login', element: <Login />, errorElement: <ErrorPage />, loader: loginLoader
  },
  {
    path: '/', element: <ProtectedRoute />, errorElement: <ErrorPage />,
    children: [
      {
        path: 'dashboard', element: <Dashboard />,
        children: [
          {
            path: ':wkName', element: <Workspace />, loader: workspaceLoader
          },
          {
            path: ':wkName/add-new-project', element: <Create />
          },
          {
            path: ':wkName/:prjName/add-new-task', element: <Create />
          },
          {
            path: 'create-new-workspace', element: <Create />
          },
          {
            path: ':wkName/:prjName/task/:id', element: <Task />,
          },
          { path: 'profile', element: <Profile /> }
        ]
      },
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  </StrictMode>,
)
