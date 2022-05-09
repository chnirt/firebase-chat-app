import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { Avatar, Button, Col, Input, Row, Typography } from 'antd'
import { FaInfoCircle } from 'react-icons/fa'
import { BsImage } from 'react-icons/bs'
import { FiHeart } from 'react-icons/fi'

import { capitalizeAvatarUsername } from '../../utils'
import { AiOutlineSmile } from 'react-icons/ai'
import { Bubble } from '../Bubble'

const { Title } = Typography

const MessagesHeader = ({ photoURL = '', username = 'xxx' }) => {
  const handleGetInfo = useCallback(() => {}, [])

  return (
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
        <Row>
          <Avatar
            shape="circle"
            size={24}
            // icon={<UserOutlined color="#eeeeee" />}
            src={photoURL}
            // src={
            //   'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
            // }
          >
            {capitalizeAvatarUsername(username)}
          </Avatar>
          {username && (
            <Title style={{ marginLeft: '14px', marginBottom: 0 }} level={5}>
              {username}
            </Title>
          )}
        </Row>
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
        icon={<FaInfoCircle size={24} color="#767676" />}
        onClick={handleGetInfo}
      />
    </Row>
  )
}

const MessagesBody = ({ messages, scrollSpanRef }: any) => {
  // const [messages, setMessages] = useState([])

  return (
    <Row
      style={{
        height: 'calc(100% - 144px)',
        overflow: 'hidden',
      }}
    >
      <Col
        style={{
          overflow: 'hidden auto',
          width: '100%',
          height: '100%',
          padding: '0 20px',
        }}
      >
        {messages.length > 0 &&
          messages.map((item: any, ri: number) => {
            const isOwner = ri % 2 === 0
            return (
              <Row
                key={`room-${ri}`}
                style={{
                  // padding: '8px 20px',
                  width: '100%',
                  // cursor: 'pointer',
                  justifyContent: isOwner ? 'flex-start' : 'flex-end',
                }}
              >
                {/* <Alert message="Success Text" type="success" /> */}
                {isOwner ? (
                  <Bubble content={item.message} />
                ) : (
                  <Bubble placement="right" content={item.message} />
                )}
              </Row>
            )
          })}
        <span ref={scrollSpanRef} />
      </Col>
    </Row>
  )
}

const MessagesFooter = ({ sendMessage = (text: string) => {} }) => {
  const [message, setMessage] = useState<string>('')
  const hasCharacter = message.length > 0

  const handleGetInfo = useCallback(() => {}, [])

  const onPressEnter = useCallback(
    async (e) => {
      const result: any = await sendMessage(message)
      if (result) {
        setMessage('')
      }
    },
    [message, sendMessage]
  )

  const handleUploadImage = useCallback(() => {}, [])

  const handleSendLove = useCallback(() => {}, [])

  return (
    <Row
      style={{
        padding: '20px',
      }}
      align="middle"
      justify="space-between"
    >
      <Row
        style={{
          borderRadius: 22,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: '#F0F0F0',
          width: '100%',
          paddingLeft: 11,
          paddingRight: 8,
          minHeight: '44px',
        }}
        justify="space-between"
        align="middle"
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
          onClick={handleGetInfo}
        />
        <Row
          style={{
            width: `calc(100% - ${hasCharacter ? '98px' : '96px'})`,
          }}
          align="middle"
        >
          <Input
            style={{
              borderWidth: 0,
            }}
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onPressEnter={onPressEnter}
          />
        </Row>
        {hasCharacter ? (
          <Button
            type="link"
            style={{
              color: '#0095f6',
            }}
            // loading={submitting}
            // onClick={onSubmit}
          >
            Send
          </Button>
        ) : (
          <Fragment>
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
              icon={<BsImage size={24} color="#767676" />}
              onClick={handleUploadImage}
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
              onClick={handleSendLove}
            />
          </Fragment>
        )}
      </Row>
    </Row>
  )
}

export const Messages = () => {
  const scrollSpanRef = useRef<HTMLSpanElement>(null)
  const [messages, setMessages] = useState<any>([])

  useEffect(() => {
    scrollSpanRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    setMessages(
      [...Array(20)].map((message, mi) => ({ message: `message-${mi}` }))
    )
  }, [])

  const handleSendMessage = useCallback(async (message: string) => {
    return await new Promise((resolve) =>
      setTimeout(() => {
        resolve(true)
        const newMessage = {
          message,
        }
        setMessages((prevState: any) => prevState.concat(newMessage))
      }, 1000)
    )
  }, [])

  return (
    <Fragment>
      <Col flex={1} style={{ height: '100%' }}>
        <MessagesHeader />
        <MessagesBody messages={messages} scrollSpanRef={scrollSpanRef} />
        <MessagesFooter sendMessage={handleSendMessage} />
      </Col>
    </Fragment>
  )
}
