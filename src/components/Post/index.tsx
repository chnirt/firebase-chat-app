import { useCallback, useEffect, useState } from 'react'
import {
  Avatar,
  Button,
  Card,
  Col,
  Comment,
  Image,
  Input,
  List,
  Row,
  Typography,
} from 'antd'
import { FiBookmark, FiHeart, FiMoreHorizontal } from 'react-icons/fi'
import { IoChatbubbleOutline, IoPaperPlaneOutline } from 'react-icons/io5'
import { AiOutlineSmile } from 'react-icons/ai'
import Moment from 'react-moment'
import {
  auth,
  deleteLikeFromFirestore,
  onSnapshotComments,
  onSnapshotLikes,
  saveCommentToFiretore,
  saveLikeToFirestore,
} from '../../firebase'

const { Title, Paragraph } = Typography

const CommentList = ({ comments = [] }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
)

const Editor = ({ onChange, onSubmit, submitting, value }: any) => (
  <Row align="middle">
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
      onChange={onChange}
      value={value}
    />
    <Button type="link" loading={submitting} onClick={onSubmit}>
      Post
    </Button>
  </Row>
)

export const Post = ({
  id,
  avatar,
  username,
  caption,
  files,
  createdAt,
}: any) => {
  const [likes, setLikes] = useState([])
  const [liked, setLiked] = useState<any | null>(null)
  const [comments, setComments] = useState<any>([])
  const [submitting, setSubmitting] = useState(false)
  const [value, setValue] = useState('')

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

  useEffect(() => {
    const unsubscribeComments: any = onSnapshotComments(
      id,
      (querySnapshot: any) => {
        const data = querySnapshot.docs.map((docSnapshot: any) => {
          return {
            id: docSnapshot.id,
            ...docSnapshot.data(),
          }
        })
        const formatComments = data.map((item: any) => ({
          avatar: (
            <Avatar
              shape="circle"
              size={24}
              // icon={<UserOutlined color="#eeeeee" />}
              src={item.avatar}
              // src={
              //   'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
              // }
            >
              {item.username.split(' ').map((char: string) => char.charAt(0))}
            </Avatar>
          ),
          author: item.username,
          content: <p>{item.content}</p>,
          datetime: (
            <Paragraph style={{ marginBottom: 0 }} ellipsis={true}>
              <Moment fromNow>{item.createdAt?.toDate()}</Moment>
            </Paragraph>
          ),
        }))
        setComments(formatComments)
      }
    )
    return () => unsubscribeComments()
  }, [id])

  const handleLike = useCallback(async () => {
    const likeInput = {
      ...(liked ? { id: liked.id } : {}),
      postId: id,
    }
    try {
      if (!liked) {
        // create
        const newLike: any = await saveLikeToFirestore(likeInput)
        setLiked(newLike)
      } else {
        // delete
        await deleteLikeFromFirestore(likeInput)
        setLiked(null)
      }
    } catch (error) {}
  }, [liked, id])

  const handleChange = useCallback((e) => {
    setValue(e.target.value)
  }, [])

  const handleSubmit = useCallback(async () => {
    try {
      if (!value) {
        return
      }

      setSubmitting(true)

      // call api
      const commentData = {
        postId: id,
        content: value,
      }
      await saveCommentToFiretore(commentData)

      setSubmitting(false)
      setValue('')
    } catch (error) {
    } finally {
    }
  }, [value])

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
          {username}
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
        <Paragraph style={{ marginBottom: 0 }} ellipsis={true}>
          <Moment fromNow>{createdAt?.toDate()}</Moment>
        </Paragraph>
      </Row>

      <Row
        style={{
          margin: '0 0 auto',
          padding: '0 16px',
        }}
        align="middle"
      >
        <Col flex={1}>
          {comments.length > 0 && <CommentList comments={comments} />}
          <Comment
            content={
              <Editor
                onChange={handleChange}
                onSubmit={handleSubmit}
                submitting={submitting}
                value={value}
              />
            }
          />
        </Col>
      </Row>
    </Card>
  )
}
