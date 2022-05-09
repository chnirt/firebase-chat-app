import { Avatar, Col, Row, Typography } from 'antd'
import { Fragment } from 'react'
import { BsCheckCircleFill, BsCircle } from 'react-icons/bs'
import { capitalizeAvatarUsername } from '../../utils'

const { Paragraph } = Typography

export const User = ({ user, onClick = () => {} }: any) => {
  return (
    <Fragment>
      <Row
        style={{
          // margin: 16,
          cursor: 'pointer',
          outline: 'none',
          padding: '8px 16px',
        }}
        onClick={() => onClick(user)}
      >
        <Col>
          <Avatar
            style={{
              marginRight: 12,
              display: 'flex',
              alignItems: 'center',
            }}
            shape="circle"
            size={44}
            // icon={<UserOutlined color="#eeeeee" />}
            // src={
            //   'https://i.imgur.com/vLp3Xy8_d.webp?maxwidth=760&fidelity=grand'
            // }
          >
            {capitalizeAvatarUsername(user.username)}
          </Avatar>
        </Col>
        <Col flex={1}>
          <Paragraph style={{ marginBottom: 0 }} strong>
            {user.username}
          </Paragraph>
          <Paragraph
            style={{
              marginBottom: 0,
            }}
          >
            {user.fullName}
          </Paragraph>
        </Col>
        <Col style={{ marginLeft: 8, display: 'flex', alignItems: 'center' }}>
          {user.isChecked ? (
            <BsCheckCircleFill size={24} color="#0095f6" />
          ) : (
            <BsCircle size={24} color="#767676" />
          )}
        </Col>
      </Row>
    </Fragment>
  )
}
