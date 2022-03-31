import { Button, Checkbox, Col, Form, Input, Row, Typography } from 'antd'
import { Fragment, useState } from 'react'
import { Loading } from '../../components'

const { Title, Text } = Typography

const USERNAME = ''
const PASSWORD = ''

export default function SignIn() {
  const [loading, setLoading] = useState(false)

  const onFinish = () => {}

  const onFinishFailed = () => {}

  const navigateRegister = () => {}

  return (
    <Fragment>
      {/* <Loading spinning={loading}> */}
      <Row>
        <Col
          xs={24}
          sm={{ span: 8, offset: 8 }}
          md={{ span: 12, offset: 6 }}
          lg={{ span: 8, offset: 8 }}
          xl={{ span: 6, offset: 9 }}
        >
          <Row
            style={{
              height: 'calc(100vh - 100px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Row
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '10vh',
              }}
            >
              {/* <FadeIn> */}
              {/* <Logo fill={PRIMARY_COLOR} /> */}
              {/* </FadeIn> */}
            </Row>
            <Row style={{ justifyContent: 'center' }}>
              <Title level={2}>
                {/* <SlideLeft>SendBird Messenger</SlideLeft> */}
              </Title>
            </Row>
            <Row
              style={{
                justifyContent: 'center',
                height: '5vh',
              }}
            >
              {/* <Text>{t('src.screens.login.SIWSTGS')}</Text> */}
            </Row>
            <Form
              style={{ padding: '0 5vw' }}
              name="normal_login"
              className="login-form"
              initialValues={{
                emailOrYourPhoneNumber: USERNAME,
                password: PASSWORD,
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="emailOrYourPhoneNumber"
                rules={[
                  {
                    required: true,
                    message: 'Please input Email or Your phone number!',
                  },
                ]}
              >
                <Input placeholder="Email or your phone number" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input type="password" placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Button type="link" htmlType="submit">
                    {/* {t('src.screens.login.Continue')} */}
                  </Button>
                </div>
              </Form.Item>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Form.Item
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                  name="remember"
                  valuePropName="checked"
                  noStyle
                >
                  <Checkbox>{/* {t('src.screens.login.KMSI')} */}</Checkbox>
                </Form.Item>
              </div>
            </Form>
          </Row>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: 100,
            }}
          >
            <Button onClick={navigateRegister} type="link">
              {/* {t('src.screens.login.NOS')} */}
            </Button>
          </div>
        </Col>
      </Row>
      {/* </Loading> */}
    </Fragment>
  )
}
