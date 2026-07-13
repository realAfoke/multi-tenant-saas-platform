import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { dashboardLoader } from './pages/Dashboard.jsx'
import './index.css'
import Workspace, { workspaceLoader } from './pages/Workspace.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Create from './components/Create.jsx'
import Task from './pages/Task.jsx'
// import App from './App.jsx'


const queryClient = new QueryClient()

const routes = createBrowserRouter([
  {
    path: 'login', element: <Login />,
  },
  {
    path: '/', element: <ProtectedRoute />, children: [
      {
        path: 'dashboard', element: <Dashboard />, loader: dashboardLoader,
        children: [
          {
            path: ':id', element: <Workspace />, loader: workspaceLoader
          },
          {
            path: ':id/add-new-project', element: <Create />
          },
          {
            path: ':id/:prjId/add-new-task', element: <Create />
          },
          {
            path: 'create-new-workspace', element: <Create />
          },
          {
            path: 'task/:id', element: <Task />
          }


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
