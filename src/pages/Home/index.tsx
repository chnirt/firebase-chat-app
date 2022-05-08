import { Fragment, useEffect, useState } from 'react'

import { Post } from '../../components'
import { onSnapshotPosts } from '../../firebase'

export default function Home() {
  const [posts, setPosts] = useState([])

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

  const Suggestions = () => {
    return <div>Suggestions</div>
  }

  return (
    <Fragment>
      {posts.length > 0 ? (
        posts.map((post: any, ci: any) => {
          return <Post key={`card-${ci}`} {...post} />
        })
      ) : (
        <Suggestions />
      )}
      {/* ListEmptyComponent */}
    </Fragment>
  )
}
