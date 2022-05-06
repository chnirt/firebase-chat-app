import { Fragment, useEffect, useState } from 'react'
import { Row, Col } from 'antd'

import { MyNavbar, PostCreateForm, Post } from '../../components'
import { useLoading } from '../../context'
import { onSnapshotPosts, savePostToFirestore } from '../../firebase'

export default function Home() {
  const { show, hide } = useLoading()
  const [visible, setVisible] = useState(false)
  const [posts, setPosts] = useState([])

  console.log(process.env.NODE_ENV)

  useEffect(() => {
    const unsubscribePosts: any = onSnapshotPosts((querySnapshot: any) => {
      const data = querySnapshot.docs.map((docSnapshot: any) => {
        return {
          id: docSnapshot.id,
          ...docSnapshot.data(),
        }
      })
      setPosts(data)
    })

    return () => unsubscribePosts()
  }, [])

  const handleCreatePost = () => setVisible(true)

  const onCreate = async (values: any) => {
    show()
    // console.log('Received values of form: ', values)
    try {
      await savePostToFirestore(values)
    } catch (error) {
    } finally {
      hide()
      setVisible(false)
    }
  }

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
                {posts.length > 0 &&
                  posts.map((post: any, ci: any) => {
                    return <Post key={`card-${ci}`} {...post} />
                  })}
              </Col>
            </Row>
          </section>
        </div>
      </section>

      <MyNavbar handleCreatePost={handleCreatePost} />

      <PostCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false)
        }}
      />
    </Fragment>
  )
}
