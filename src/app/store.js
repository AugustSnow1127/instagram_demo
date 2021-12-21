import { configureStore } from '@reduxjs/toolkit'

import postsReducer from '../features/posts/postsSlice'
import profileReducer from '../features/profile/profileSlice'

export default configureStore({
  reducer: {
    posts: postsReducer,
    profile: profileReducer
  }
})