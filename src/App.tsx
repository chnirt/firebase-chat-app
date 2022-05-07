import { lazy } from 'react'
// import logo from './logo.svg'
import './App.less'

import { useRoutes } from 'react-router-dom'
import { PublicRoute, PrivateRoute } from './helper'
import { Layout } from './layout'

const LazySignInScreen = lazy(() => import('./pages/SignIn'))
const LazySignUpScreen = lazy(() => import('./pages/SignUp'))
const LazyHomeScreen = lazy(() => import('./pages/Home'))
const LazyProfileScreen = lazy(() => import('./pages/Profile'))
const LazyChatScreen = lazy(() => import('./pages/Chat'))
const LazyNotFoundScreen = lazy(() => import('./pages/NotFound'))

function App() {
  // We removed the <BrowserRouter> element from App because the
  // useRoutes hook needs to be in the context of a <BrowserRouter>
  // element. This is a common pattern with React Router apps that
  // are rendered in different environments. To render an <App>,
  // you'll need to wrap it in your own <BrowserRouter> element.
  let element = useRoutes([
    // A route object has the same properties as a <Route>
    // element. The `children` is just an array of child routes.
    {
      path: '/',
      element: (
        <PublicRoute>
          <LazySignInScreen />
        </PublicRoute>
      ),
    },
    {
      path: '/sign-up',
      element: (
        <PublicRoute>
          <LazySignUpScreen />
        </PublicRoute>
      ),
    },
    {
      path: '/home',
      element: (
        <PrivateRoute>
          <Layout>
            <LazyHomeScreen />
          </Layout>
        </PrivateRoute>
      ),
    },
    {
      path: '/profile',
      element: (
        <PrivateRoute>
          <Layout>
            <LazyProfileScreen />
          </Layout>
        </PrivateRoute>
      ),
    },
    {
      path: '/chat',
      element: (
        <PrivateRoute>
          <Layout>
            <LazyChatScreen />
          </Layout>
        </PrivateRoute>
      ),
    },
    { path: '*', element: <LazyNotFoundScreen /> },
  ])

  return element
}

export default App
