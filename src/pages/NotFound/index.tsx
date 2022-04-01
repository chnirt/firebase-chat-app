import { Fragment } from 'react'
import { Button, Col, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { ReactComponent as Background } from '../../assets/pages/undraw_not_found_-60-pq.svg'

const { Title, Paragraph } = Typography

export default function NotFound() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  function navigateHome() {
    navigate('/')
  }
  return (
    <Fragment>
      <Col
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100vh',
          justifyContent: 'center',
        }}
      >
        <Background width={'20%'} height={'20%'} />
        <Title level={3}>404</Title>
        <Paragraph type="secondary">
          {t('src.screens.notfound.STPYVDNE')}
        </Paragraph>
        <Button onClick={navigateHome} type="primary">
          {t('src.screens.notfound.BH')}
        </Button>
      </Col>
    </Fragment>
  )
}
