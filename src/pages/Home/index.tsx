import { Fragment } from 'react'
import { Row, Col, Avatar, Button, Badge } from 'antd'
import { FiHeart } from 'react-icons/fi'
import { IoChatbubbleOutline, IoHomeOutline } from 'react-icons/io5'
import { AiOutlinePlusSquare, AiOutlineCompass } from 'react-icons/ai'
import { CgSearch } from 'react-icons/cg'
import { UserOutlined } from '@ant-design/icons'
import { ReactComponent as Logo } from '../../assets/logo/logo-standard.svg'
import { MyAutoComplete } from '../../components'

export default function Home() {
  const unreadCount = 9
  return (
    <Fragment>
      <Row
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          borderBottom: '1px solid #dbdbdb',
        }}
      >
        <Row
          style={{
            height: 60,
            // borderWidth: 1,
            // borderStyle: 'solid',
            padding: '0 20px',
            display: 'flex',
            justifyContent: 'center',
            maxWidth: 975,
            width: '100%',
          }}
          justify="center"
          align="middle"
        >
          <Col
            style={{
              // borderWidth: 1,
              // borderStyle: 'solid',
              display: 'flex',
              alignItems: 'center',
            }}
            // span={18}
            xs={24}
            sm={24}
            // md={18}
            // lg={24}
            // xl={24}
          >
            <Col
              style={
                {
                  // borderWidth: 1,
                  // borderStyle: 'solid',
                }
              }
              xs={8}
            >
              <Logo
                width={(29 * 938) / 264}
                height={29}
                // fill={PRIMARY_COLOR}
              />
            </Col>

            <Col xs={0} sm={8}>
              <MyAutoComplete />
            </Col>

            <Col
              style={{
                // borderWidth: 1,
                // borderStyle: 'solid',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: '24px',
              }}
              xs={16}
              sm={8}
            >
              <Button
                style={{
                  border: 0,
                  boxShadow: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                ghost
                shape="circle"
                icon={<IoHomeOutline size={24} color="#767676" />}
              />
              <Button
                style={{
                  border: 0,
                  boxShadow: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                ghost
                shape="circle"
                icon={
                  <Badge count={unreadCount} overflowCount={99}>
                    <IoChatbubbleOutline size={24} color="#767676" />
                  </Badge>
                }
              />
              <Button
                style={{
                  border: 0,
                  boxShadow: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                ghost
                shape="circle"
                icon={<AiOutlinePlusSquare size={24} color="#767676" />}
              />
              <Button
                style={{
                  border: 0,
                  boxShadow: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                ghost
                shape="circle"
                icon={<AiOutlineCompass size={24} color="#767676" />}
              />
              <Button
                style={{
                  border: 0,
                  boxShadow: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                ghost
                icon={<FiHeart size={24} color="#767676" />}
              />
              <Button
                style={{
                  border: 0,
                  boxShadow: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                ghost
                shape="circle"
                // icon={<FaUserCircle size={24} color="#767676" />}
                icon={
                  <Avatar
                    shape="circle"
                    size={24}
                    icon={<UserOutlined color="#eeeeee" />}
                  />
                }
              />
              {/* <Avatar shape="circle" size={24} icon={<UserOutlined />} /> */}
            </Col>
          </Col>
        </Row>
      </Row>
    </Fragment>
  )
}
