import { useCallback, useEffect, useState } from 'react'
import { Avatar, Button, Card, Image, Input, Row, Typography } from 'antd'
import { FiBookmark, FiHeart, FiMoreHorizontal } from 'react-icons/fi'
import { IoChatbubbleOutline, IoPaperPlaneOutline } from 'react-icons/io5'
import { AiOutlineSmile } from 'react-icons/ai'
import Moment from 'react-moment'
import {
  auth,
  deleteLikeFromFirestore,
  onSnapshotLikes,
  saveLikeToFirestore,
} from '../../firebase'

const { Title, Paragraph } = Typography

export const Post = ({
  id,
  avatar,
  username,
  caption,
  files,
  createdAt,
}: any) => {
  const [likes, setLikes] = useState([])
  const [liked, setLiked] = useState<any>(null)

  useEffect(() => {
    const hasLike: any = likes.find(
      (like: any) =>
        like.postId === id && like.userId === auth!.currentUser!.uid
    )
    setLiked(hasLike)
  }, [likes, id])

  useEffect(() => {
    const unsubscribeLikes: any = onSnapshotLikes(id, (querySnapshot: any) => {
      const data = querySnapshot.docs.map((docSnapshot: any) => {
        return {
          id: docSnapshot.id,
          ...docSnapshot.data(),
        }
      })
      setLikes(data)
    })
    return () => unsubscribeLikes()
  }, [id])

  const handleLike = useCallback(async () => {
    const likeInput = {
      ...(liked ? { id: liked.id } : {}),
      postId: id,
    }
    try {
      if (!liked) {
        // create
        await saveLikeToFirestore(likeInput)
        setLiked(true)
      } else {
        // delete
        await deleteLikeFromFirestore(likeInput)
        setLiked(false)
      }
    } catch (error) {}
  }, [liked, id])

  return (
    <Card
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
            // icon={<UserOutlined color="#eeeeee" />}
            src={avatar}
            // src={
            //   'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
            // }
          >
            {username.split(' ').map((char: string) => char.charAt(0))}
          </Avatar>
          {username && (
            <Title style={{ marginLeft: '14px', marginBottom: 0 }} level={5}>
              {username}
            </Title>
          )}
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
            icon={<FiMoreHorizontal size={24} color="#767676" />}
          />
        </div>
      </Row>
      <Row align="middle" justify="center" style={{ minHeight: 300 }}>
        {files && files[0] && <Image src={files[0]} />}
      </Row>
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
          icon={
            liked ? (
              <FiHeart size={24} color="#ff4d4f" fill="#ff4d4f" />
            ) : (
              <FiHeart size={24} color="#767676" />
            )
          }
          onClick={handleLike}
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
          icon={<IoChatbubbleOutline size={24} color="#767676" />}
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
          icon={<IoPaperPlaneOutline size={24} color="#767676" />}
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

      {likes.length > 0 && (
        <Row
          style={{
            marginBottom: '8px',
            paddingLeft: '16px',
            paddingRight: '16px',
          }}
        >
          <Title style={{ marginBottom: 0 }} level={5}>
            {`${likes.length} like${likes.length > 1 ? 's' : ''}`}
          </Title>
        </Row>
      )}
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
        {caption && (
          <Paragraph style={{ marginBottom: 0 }} ellipsis={true}>
            {caption}
          </Paragraph>
        )}
      </Row>

      <Row
        style={{
          margin: '0 0 auto',
          padding: '0 16px',
        }}
        align="middle"
      >
        <Paragraph
          style={{ marginBottom: 0, fontSize: '10px' }}
          ellipsis={true}
        >
          <Moment fromNow>{createdAt?.toDate()}</Moment>
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
  )
}
