import { Col, Row } from 'antd'
import { PropsWithChildren, Fragment } from 'react'
import { MyNavbar } from '../components'

type LayoutProps = {}

export const Layout = ({ children }: PropsWithChildren<LayoutProps>) => {
  return (
    <Fragment>
      <MyNavbar />
      <section
        style={{
          minHeight: '100vh',
          overflow: 'hidden',
        }}
      >
        <div>
          <section style={{ paddingTop: '90px' }}>
            <Row>
              <Col
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
                // span={18}
                xs={24}
                sm={24}
                // md={18}
                // lg={24}
                // xl={24}
              >
                {children}
              </Col>
            </Row>
          </section>
        </div>
      </section>
    </Fragment>
  )
}
