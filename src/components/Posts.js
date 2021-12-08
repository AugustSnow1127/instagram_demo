import React, { useEffect } from 'react'
import './Posts.scss';
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPosts, fetchPosts } from '../features/posts/postsSlice'
import { Spinner } from './Spinner'

export const Posts = (props) => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)

  const postStatus = useSelector(state => state.posts.status)
  const error = useSelector((state) => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let renderedPosts

  if (postStatus === 'loading') {
    console.log("loading")
    renderedPosts = <Spinner text="Loading..." />
  } else if (postStatus === 'succeeded') {
    console.log("succeeded");
    console.log(posts);
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    renderedPosts = orderedPosts.map(post => (
      <div className="wrapPost">
        <div className="post">
          <img id={post.id} src={post.img_url} alt=""></img>
        </div>
      </div>
    ))
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