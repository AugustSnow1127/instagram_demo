import React, { useEffect } from 'react'
import Cover from 'react-cover'

import './Posts.scss';
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from '../features/posts/postsSlice'

export const Posts = (props) => {
  const dispatch = useDispatch()

  const posts = useSelector(state =>
    state.posts.posts.filter(post => post.fullname === props.userFullName)
  )

  const postStatus = useSelector(state => state.posts.status)
  const error = useSelector((state) => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
  let renderedPosts = orderedPosts.map(post => (
    <div className="wrapPost">
      <div className="post">
        <img id={post.id} src={post.img_url} alt=""></img>
      </div>
    </div>
  ))

  if (postStatus === 'loading') {
    console.log("loading")
    renderedPosts = <Cover on>{renderedPosts}</Cover>
  } else if (postStatus === 'succeeded') {
    console.log("succeeded");
  } else if (postStatus === 'failed') {
    console.log("fail")
    renderedPosts = <div>{error}</div>
  }

  return (
    <div className="posts">
      {renderedPosts}
    </div>
  );
}