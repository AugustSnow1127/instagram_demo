import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const apiForPosts = 'http://localhost:3000/posts';

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
}

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts', 
  async () => {
    const response = await axios.get(apiForPosts);
    return response.data
  }
)

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost) => {
    const response = await axios.post(apiForPosts, initialPost)
    return response.data
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      
    },
    postUpdated(state, action) {

    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.posts = state.posts.concat(action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload)
      })
  }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = (state) => state.posts.posts

export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId)