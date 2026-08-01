import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/login.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import './index.css'
import Workspace from './pages/Workspace.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Create from './components/Create.jsx'
import Task from './pages/task.jsx'
import Profile from './pages/profile.jsx'
// import App from './App.jsx'
import ErrorPage from './components/Error.jsx'
import LandingPage from './pages/landing.jsx'
import Pricing from './pages/pricing.jsx'
import Home from './pages/home.jsx'
import ProjectOverview from './pages/projectOverview.jsx'
import Board from './pages/board.jsx'
import Discussion from './pages/discussion.jsx'
import { Files } from 'lucide-react'
import Settings from './pages/setting.jsx'
import Notifications from './pages/notification.jsx'
import CreateProject from './components/CreateProject.jsx'
import CreateTask from './components/CreateTask.jsx'
import Checkout from './pages/checkout.jsx'


const queryClient = new QueryClient()

const routes = createBrowserRouter([
  {
    path: 'login', element: <Login />, errorElement: <ErrorPage />,
  },
  { path: '/', element: <LandingPage /> },
  { path: '/pricing', element: <Pricing /> },
  {
    path: '/dashboard', element: <ProtectedRoute />, errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: ':wkName', element: <Workspace />, children: [
          { path: 'create-project', element: <CreateProject /> },
        ]
      },
      {
        path: ':wkName/add-new-project', element: <Create />
      },
      { path: 'workspace/project', element: <ProjectOverview /> },
      { path: 'workspace/project/board', element: <Board /> },
      {
        path: ':wkName/:prjName/add-new-task', element: <Create />
      },
      {
        path: 'create-new-workspace', element: <Create />
      },
      {
        path: 'tasks', element: <Task />,
      },
      { path: 'discussion', element: <Discussion /> },
      { path: 'profile', element: <Profile /> },
      { path: 'file', element: <Files /> },
      { path: 'setting', element: <Settings /> },
      { path: 'notification', element: <Notifications /> },
      { path: 'createtask', element: <CreateTask /> },
      { path: 'checkout', element: <Checkout /> },
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
