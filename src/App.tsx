import React, { lazy } from 'react'
import logo from './logo.svg'
import './App.less'

import { useRoutes } from 'react-router-dom'
import { PublicRoute, PrivateRoute } from './helper'
import { Layout } from './layout'

import SignUpScreen from './pages/SignUp'
import SignInScreen from './pages/SignIn'
import HomeScreen from './pages/Home'
const LazySignInScreen = lazy(() => import('./pages/SignIn'))
const LazySignUpScreen = lazy(() => import('./pages/SignUp'))
const LazyHomeScreen = lazy(() => import('./pages/Home'))
const LazyProfileScreen = lazy(() => import('./pages/Profile'))
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
          {/* <LazySignInScreen /> */}
          <SignInScreen />
        </PublicRoute>
      ),
    },
    {
      path: '/sign-up',
      element: (
        <PublicRoute>
          {/* <LazySignUpScreen /> */}
          <SignUpScreen />
        </PublicRoute>
      ),
    },
    {
      path: '/home',
      element: (
        <PrivateRoute>
          <Layout>
            {/* <LazyHomeScreen /> */}
            <HomeScreen />
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
    { path: '*', element: <LazyNotFoundScreen /> },
  ])

  return element
}

export default App
