import { Fragment } from 'react'
import {
  Row,
  Col,
  Avatar,
  Button,
  Badge,
  Menu,
  Card,
  Image,
  Dropdown,
} from 'antd'
import { FiBookmark, FiHeart, FiMoreHorizontal } from 'react-icons/fi'
import {
  IoChatbubbleEllipsesOutline,
  IoChatbubbleOutline,
  IoHomeOutline,
  IoPaperPlaneOutline,
  IoSettingsOutline,
} from 'react-icons/io5'
import {
  AiOutlinePlusSquare,
  AiOutlineCompass,
  AiOutlineSmile,
} from 'react-icons/ai'
import { UserOutlined } from '@ant-design/icons'
import Title from 'antd/lib/typography/Title'
import Paragraph from 'antd/lib/typography/Paragraph'
import Input from 'antd/lib/input/Input'
import { CgBookmark, CgProfile } from 'react-icons/cg'
import { ReactComponent as Logo } from '../../assets/logo/logo-standard.svg'
import { MyAutoComplete } from '../../components'
import { useAuth } from '../../context'

const unreadCount = 9

const MyNavbar = () => {
  const auth = useAuth()

  const handleMenuClick = (e: any) => {
    switch (e.key) {
      case '4':
        return handleSignOut()
      default:
        return null
    }
  }

  const handleSignOut = () => {
    try {
      auth.signOut()
    } catch (error) {
      console.log(error)
    }
  }

  const menu = (
    <Menu
      style={{
        width: '200px',
      }}
      onClick={handleMenuClick}
    >
      <Menu.Item key={1} icon={<CgProfile size={16} />}>
        Profile
      </Menu.Item>
      <Menu.Item key={2} icon={<CgBookmark size={16} />}>
        Saved
      </Menu.Item>
      <Menu.Item key={3} icon={<IoSettingsOutline size={16} />}>
        Setting
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key={4}>Log Out</Menu.Item>
    </Menu>
  )

  return (
    <Row
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        borderBottom: '1px solid #dbdbdb',
        position: 'fixed',
        top: 0,
        background: '#fff',
      }}
    >
      <Row
        style={{
          height: 60,
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
                  <IoChatbubbleEllipsesOutline size={24} color="#767676" />
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
              shape="circle"
              icon={<FiHeart size={24} color="#767676" />}
            />
            <Dropdown
              overlay={menu}
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}
              trigger={['click']}
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
              >
                <Avatar
                  shape="circle"
                  size={24}
                  icon={<UserOutlined color="#eeeeee" />}
                  src={
                    'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
                  }
                />
              </Button>
            </Dropdown>
          </Col>
        </Col>
      </Row>
    </Row>
  )
}

export default function Home() {
  return (
    <Fragment>
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
                {Array(10)
                  .fill(0)
                  .map((card, ci) => (
                    <Card
                      key={`card-${ci}`}
                      style={{
                        maxWidth: 935,
                        width: '100%',
                        marginBottom: '24px',
                        borderRadius: '8px',
                      }}
                      bodyStyle={{
                        padding: 0,
                      }}
                    >
                      <Row justify="space-between" align="middle">
                        <Row
                          style={{
                            padding: '14px 4px 14px 16px',
                          }}
                          align="middle"
                        >
                          <Avatar
                            shape="circle"
                            size={24}
                            icon={<UserOutlined color="#eeeeee" />}
                            src={
                              'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
                            }
                          />
                          <Title
                            style={{ marginLeft: '14px', marginBottom: 0 }}
                            level={5}
                          >
                            trinhchinchin
                          </Title>
                        </Row>
                        <div
                          style={{
                            justifyContent: 'center',
                            paddingRight: '8px',
                          }}
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
                            icon={
                              <FiMoreHorizontal size={24} color="#767676" />
                            }
                          />
                        </div>
                      </Row>
                      <Image src="https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg" />
                      <Row
                        style={{
                          marginTop: '4px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                        }}
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
                          icon={
                            <IoChatbubbleOutline size={24} color="#767676" />
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
                          icon={
                            <IoPaperPlaneOutline size={24} color="#767676" />
                          }
                        />
                        <Button
                          style={{
                            border: 0,
                            boxShadow: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 'auto',
                            marginRight: '-10px',
                          }}
                          ghost
                          shape="circle"
                          icon={<FiBookmark size={24} color="#767676" />}
                        />
                      </Row>

                      <Row
                        style={{
                          marginBottom: '8px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                        }}
                      >
                        <Title style={{ marginBottom: 0 }} level={5}>
                          6789 likes
                        </Title>
                      </Row>
                      <Row
                        style={{
                          margin: '0 0 auto',
                          padding: '0 16px',
                        }}
                        align="middle"
                      >
                        <Title style={{ marginBottom: 0 }} level={5}>
                          trinhchinchin
                        </Title>
                        &nbsp;
                        <Paragraph style={{ marginBottom: 0 }} ellipsis={false}>
                          Lorem Ipsum is simply dummy text of the printing and
                          {/* typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has
                          survived not only five centuries, but also the leap
                          into electronic typesetting, remaining essentially
                          unchanged. It was popularised in the 1960s with the
                          release of Letraset sheets containing Lorem Ipsum
                          passages, and more recently with desktop publishing
                          software like Aldus PageMaker including versions of
                          Lorem Ipsum */}
                        </Paragraph>
                      </Row>

                      <Row
                        style={{
                          paddingLeft: '16px',
                          paddingRight: '16px',
                        }}
                        align="middle"
                      >
                        <div
                          style={{
                            padding: '8px 16px 8px 0',
                          }}
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
                            icon={<AiOutlineSmile size={24} color="#767676" />}
                          />
                        </div>

                        <Input
                          style={{ flex: 1, borderWidth: 0 }}
                          placeholder="Add a comment…"
                        />
                        <Button type="link">Post</Button>
                      </Row>
                    </Card>
                  ))}
              </Col>
            </Row>
          </section>
        </div>
      </section>

      <MyNavbar />
    </Fragment>
  )
}
