import { Fragment, useCallback, useState } from 'react'
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Input,
  Modal,
  Row,
  // Select,
  // Tag,
  Typography,
} from 'antd'
import { FiEdit } from 'react-icons/fi'
import { UserOutlined } from '@ant-design/icons'

import { useAuth, useModal } from '../../context'
import { NewMessageForm, YourMessages } from '../../components'
import { IoCloseSharp } from 'react-icons/io5'

const { Title, Paragraph, Text } = Typography

// const options = [
//   { value: 'gold' },
//   { value: 'lime' },
//   { value: 'green' },
//   { value: 'cyan' },
// ]

export default function Chat() {
  const auth = useAuth()
  const modal = useModal()
  const [currentChat, setCurrentChat] = useState(null)

  const handleNewMessage = useCallback(() => {
    modal.show()
  }, [modal])

  const handleOk = useCallback(() => {
    modal.hide()
  }, [modal])

  const handleCancel = useCallback(() => {
    modal.hide()
  }, [modal])

  const handleJoinChat = useCallback((id: string) => {
    console.log(id)
  }, [])

  // const tagRender = (props: any) => {
  //   const { label, value, closable, onClose } = props
  //   const onPreventMouseDown = (event: any) => {
  //     event.preventDefault()
  //     event.stopPropagation()
  //   }
  //   return (
  //     <Tag
  //       color={value}
  //       onMouseDown={onPreventMouseDown}
  //       closable={closable}
  //       onClose={onClose}
  //       style={{ marginRight: 3 }}
  //     >
  //       {label}
  //     </Tag>
  //   )
  // }

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
                height: 60,
                padding: '0 20px',
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
            <Divider type="horizontal" style={{ width: 'auto', margin: 0 }} />
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
                {[...Array(20)].map((item, ri) => {
                  return (
                    <Row
                      key={`room-${ri}`}
                      style={{
                        padding: '8px 20px',
                        width: '100%',
                        cursor: 'pointer',
                        // ['&:hover']: {
                        //   background: '#efefef',
                        // },
                      }}
                      onClick={() => handleJoinChat(item.id)}
                    >
                      <Avatar
                        style={{ marginRight: 12 }}
                        shape="circle"
                        size={56}
                        icon={<UserOutlined color="#eeeeee" />}
                        // src={
                        //   'https://i.imgur.com/vLp3Xy8_d.webp?maxwidth=760&fidelity=grand'
                        // }
                      />
                      <Col>
                        <Paragraph style={{ marginBottom: 0 }} strong>
                          xxx
                        </Paragraph>
                        <Row>
                          <Paragraph
                            style={{
                              marginTop: 8,
                              paddingBottom: 0,
                            }}
                          >
                            xxx 🥲🥲
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
          <Col
            flex={1}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
            }}
          >
            {currentChat ? (
              <div>asd</div>
            ) : (
              <YourMessages handleNewMessage={handleNewMessage} />
            )}
          </Col>
        </Row>
      </Card>

      <NewMessageForm
        form={modal.form}
        visible={modal.visible}
        onCreate={handleOk}
        onCancel={handleCancel}
      />
    </Fragment>
  )
}
