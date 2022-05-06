import { PropsWithChildren, Fragment } from 'react'

type LayoutProps = {}

export const Layout = ({ children }: PropsWithChildren<LayoutProps>) => {
  return <Fragment>{children}</Fragment>
}
