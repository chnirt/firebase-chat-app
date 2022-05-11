import { Fragment, useCallback, useEffect, useState } from 'react'
import { Avatar, Button, Card, Col, Divider, Form, Row, Typography } from 'antd'
// import { UserOutlined } from '@ant-design/icons'
import { FiEdit } from 'react-icons/fi'

import { useAuth } from '../../context'
import { NewMessageForm, YourMessages, Messages } from '../../components'
import { capitalizeAvatarUsername } from '../../utils'

const { Title, Paragraph } = Typography

export default function Chat() {
  const auth = useAuth()
  const [newMessageForm] = Form.useForm()
  const [newMessageVisible, setNewMessageVisible] = useState(false)
  const [chats, setChats] = useState<any>([])
  const [currentChat, setCurrentChat] = useState<any>(null)

  useEffect(() => {
    setChats(
      [...Array(20)].map((chat: any, ci: number) => ({
        name: `chat-${ci}`,
        lastMessage: 'xxx 🥲🥲',
        unreadMessageCount: 1,
      }))
    )
  }, [])

  const handleNewMessage = useCallback(() => {
    setNewMessageVisible(true)
  }, [])

  const handleOnCreate = useCallback(async (values) => {
    console.log(values)
    setNewMessageVisible(false)
  }, [])

  const handleOnCancel = useCallback(() => {
    setNewMessageVisible(false)
  }, [])

  const handleJoinChat = useCallback((id: string) => {
    setCurrentChat({
      id,
    })
  }, [])

  return (
    <Fragment>
      <Card
        style={{
          maxWidth: 935,
          width: '100%',
          height: 'calc(100vh - 120px)',
          borderRadius: '8px',
        }}
        bodyStyle={{
          padding: 0,
          height: '100%',
        }}
      >
        <Row style={{ height: '100%' }}>
          <Col
            style={{
              width: 350,
              height: '100%',
              overflow: 'hidden',
            }}
          >
            <Row
              style={{
                height: 59,
                padding: '0 20px',
                borderBottomWidth: 1,
                borderBottomStyle: 'solid',
                borderBottomColor: '#F0F0F0',
              }}
              align="middle"
              justify="space-between"
            >
              <Col flex={1}>
                <Title
                  style={{
                    marginLeft: '14px',
                    marginBottom: 0,
                    textAlign: 'center',
                  }}
                  level={5}
                >
                  {auth.user?.username}
                </Title>
              </Col>
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
                icon={<FiEdit size={24} color="#767676" />}
                onClick={handleNewMessage}
              />
            </Row>
            <Row
              style={{
                // borderWidth: 1,
                // borderStyle: 'solid',
                height: 'calc(100% - 63px)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  paddingTop: 8,
                  overflow: 'hidden auto',
                  height: '100%',
                  width: '100%',
                }}
              >
                {chats.length > 0 &&
                  chats.map((item: any, ri: number) => {
                    return (
                      <Row
                        key={`room-${ri}`}
                        style={{
                          padding: '8px 20px',
                          width: '100%',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleJoinChat(ri + '')}
                      >
                        <Avatar
                          style={{ marginRight: 12 }}
                          shape="circle"
                          size={56}
                          // icon={<UserOutlined color="#eeeeee" />}
                          // src={
                          //   'https://i.imgur.com/vLp3Xy8_d.webp?maxwidth=760&fidelity=grand'
                          // }
                        >
                          {capitalizeAvatarUsername(item.name)}
                        </Avatar>
                        <Col>
                          <Paragraph style={{ marginBottom: 0 }} strong>
                            {item.name}
                          </Paragraph>
                          <Row>
                            <Paragraph
                              style={{
                                marginTop: 8,
                                paddingBottom: 0,
                              }}
                            >
                              {item.lastMessage}
                            </Paragraph>
                            <Paragraph
                              style={{
                                marginTop: 8,
                                paddingBottom: 0,
                                marginLeft: 4,
                                marginRight: 4,
                              }}
                            >
                              ·
                            </Paragraph>
                            <Paragraph
                              style={{
                                marginTop: 8,
                                paddingBottom: 0,
                              }}
                            >
                              1d
                            </Paragraph>
                          </Row>
                        </Col>
                      </Row>
                    )
                  })}
              </div>
            </Row>
          </Col>
          <Divider type="vertical" style={{ height: 'auto', margin: 0 }} />
          {currentChat ? (
            <Col
              flex={1}
              style={{
                height: '100%',
                overflow: 'hidden',
              }}
            >
              <Messages />
            </Col>
          ) : (
            <Col
              flex={1}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 24,
              }}
            >
              <YourMessages handleNewMessage={handleNewMessage} />
            </Col>
          )}
        </Row>
      </Card>

      <NewMessageForm
        form={newMessageForm}
        visible={newMessageVisible}
        onCreate={handleOnCreate}
        onCancel={handleOnCancel}
      />
    </Fragment>
  )
}
