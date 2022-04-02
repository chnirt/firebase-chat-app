import { PropsWithChildren, Fragment } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../context'

type LayoutProps = {}

export const Layout = ({ children }: PropsWithChildren<LayoutProps>) => {
  const { signOut } = useAuth()

  const handleSignOut = () => {
    signOut()
  }
  return (
    <Fragment>
      {/* <Link to="/home">Home</Link> */}
      {/* <Link to="/profile">Profile</Link> */}
      {/* <button onClick={handleSignOut}>Sign Out</button> */}
      {children}
    </Fragment>
  )
}
