import { PropsWithChildren, Fragment } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context'

type PublicRouteProps = {}

export function PublicRoute({ children }: PropsWithChildren<PublicRouteProps>) {
  let { isAuth } = useAuth()

  return isAuth ? (
    <Navigate
      to={{
        // pathname: '/home',
        pathname: '/chat',
      }}
    />
  ) : (
    <Fragment>{children}</Fragment>
  )
}
