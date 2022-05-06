import { Button, Checkbox, Col, Form, Input, Row, Typography } from 'antd'
import { Fragment, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { ReactComponent as Logo } from '../../assets/logo/logo-logomark.svg'
import { signInAccount } from '../../mock'
import { useAuth } from '../../context'

const { Title, Text } = Typography

interface IValues {
  emailOrYourPhoneNumber: string
  password: string
}

export default function SignIn() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const auth = useAuth()

  const onFinish = useCallback(
    (values: IValues) => {
      // console.log('Success:', values)
      const { emailOrYourPhoneNumber, password } = values
      try {
        auth.signIn({
          email: emailOrYourPhoneNumber,
          password,
        })
      } catch (error) {}
    },
    [auth]
  )

  const onFinishFailed = useCallback((errorInfo: any) => {
    // console.log('Failed:', errorInfo)
  }, [])

  const navigateRegister = useCallback(() => {
    navigate('/sign-up')
  }, [navigate])

  return (
    <Fragment>
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
              <Logo
                width={50}
                height={68}
                // fill={PRIMARY_COLOR}
              />
              {/* </FadeIn> */}
            </Row>
            <Row style={{ justifyContent: 'center' }}>
              <Title level={2}>
                {/* <SlideLeft>SendBird Messenger</SlideLeft> */}
                {process.env.REACT_APP_APP_NAME} Messenger
              </Title>
            </Row>
            <Row
              style={{
                justifyContent: 'center',
                height: '5vh',
              }}
            >
              <Text>
                {t('src.screens.login.SIWSTGS', {
                  appName: process.env.REACT_APP_APP_NAME,
                })}
              </Text>
            </Row>
            <Form
              style={{ padding: '0 5vw' }}
              name="normal_login"
              className="login-form"
              initialValues={{
                emailOrYourPhoneNumber: signInAccount.emailOrYourPhoneNumber,
                password: signInAccount.password,
                remember: signInAccount.remember,
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
                    {t('src.screens.login.Continue')}
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
                  <Checkbox>{t('src.screens.login.KMSI')}</Checkbox>
                </Form.Item>
              </div>
            </Form>
          </Row>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: '5vh',
            }}
          >
            <Button onClick={navigateRegister} type="link">
              {t('src.screens.login.NOS', {
                appName: process.env.REACT_APP_APP_NAME,
              })}
            </Button>
          </div>
        </Col>
      </Row>
    </Fragment>
  )
}
