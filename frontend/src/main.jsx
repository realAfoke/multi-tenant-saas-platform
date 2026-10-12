import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login, { loader as loginLoader } from './pages/login.jsx'
import ProtectedRoute from './route/protectedRoute.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Task from './pages/task.jsx'
import Profiles from './pages/profile.jsx'
import Profile from './pages/mainProfile.jsx'
// import App from './App.jsx'
import ErrorPage from './components/Error.jsx'
import LandingPage from './pages/landing.jsx'
import Pricing from './pages/pricing.jsx'
import Notifications from './pages/notification.jsx'
import SignUp, { loader as signUpLoader } from './pages/signup.jsx'
import SignEmail from './components/SignEmail.jsx'
import VerifyEmail from './components/VerifyEmail.jsx'
import AccountDetails from './components/AccountDetails.jsx'
import AcceptInvite from './pages/acceptInvite.jsx'
import TeamChat from './experiment/TempChat.jsx'
import Chat from './components/ChatUi.jsx'
import DashboardHome from './pages/dashboardHome.jsx'
import CreateWorkspace from './pages/createWorkspace.jsx'
import CreateChannel from './pages/createChannel.jsx'
import WorkspaceSettings from './pages/settings/workspaceSettings.jsx'
import WorkspaceGeneral from './pages/settings/workspaceGeneral.jsx'
import WorkspaceMembers from './pages/settings/workspaceMember.jsx'
import WorkspaceInvitations from './pages/settings/workspaceInvite.jsx'
import WkChannel from './pages/settings/channels.jsx'
// import CreateTask from './components/Tsk.jsx'
import CreateTask from './components/CreateTask.jsx'
import ChannelMembers from './pages/channelMember.jsx'
import Channel from './pages/channel/channnel.jsx'
import ChannelInfo from './pages/channel/channelInfo.jsx'
import ChannelSettings from './pages/channel/setting.jsx'



const queryClient = new QueryClient()

const routes = createBrowserRouter([
  { path: 'team-chat', element: <TeamChat /> },

  { path: 'accept-invite', element: <AcceptInvite /> },

  {
    path: 'signup', element: <SignUp />, loader: signUpLoader, children: [
      { index: true, element: <SignEmail /> },

      { path: 'otp-verification', element: <VerifyEmail /> },

      { path: 'account-detail', element: <AccountDetails /> }
    ]
  },

  {
    path: 'login', element: <Login />, errorElement: <ErrorPage />, loader: loginLoader
  },

  { path: 'landing', element: <LandingPage /> },

  { path: '/pricing', element: <Pricing /> },

  {
    path: '/', element: <ProtectedRoute />, errorElement: <ErrorPage />,
    children: [
      { index: true, element: <DashboardHome /> },
      {
        path: ':wkName/:channelName', element: <Channel />, children: [
          { index: true, element: <Chat /> },
          { path: 'task/:taskName', element: <Task /> },
          { path: 'info', element: <ChannelInfo /> },
          { path: 'members', element: <ChannelMembers /> },
          { path: 'setting', element: <ChannelSettings /> },
          { path: 'create-task', element: <CreateTask /> }
        ]
      },
      { path: 'chat/:conversationId', element: <Chat /> },
      { path: 'create-workspace', element: <CreateWorkspace /> },
      { path: ':wkName/create-channel', element: <CreateChannel /> },
      { path: 'profile', element: <Profile /> },
      { path: 'profiles', element: <Profiles /> },
      {
        path: ':wkName/settings', element: <WorkspaceSettings />, children: [
          { index: true, element: <WorkspaceGeneral /> },
          { path: 'members', element: <WorkspaceMembers /> },
          { path: 'invitations', element: <WorkspaceInvitations /> },
          { path: 'channels', element: <WkChannel /> },
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

