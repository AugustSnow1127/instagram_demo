import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const apiForLogin = 'http://localhost:3000/profile/login';
const apiForSignUp = 'http://localhost:3000/profile/signUp';

const initialState = {
  profile: [],
  status: 'idle',
  error: null,
}

export const asyncLogin = createAsyncThunk(
  'profile/asyncLogin', 
  async (initialPost) => {
    console.log("asyncLogin")
    const response = await axios.post(apiForLogin, initialPost);
    return response.data
  }
)

export const asyncSignUp = createAsyncThunk(
  'profile/asyncSignUp',
  async (initialPost) => {
    console.log("asyncSignUp")
    const response = await axios.post(apiForSignUp, initialPost)
    return response.data
  }
)

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    
  },
  extraReducers(builder) {
    builder
      .addCase(asyncLogin.fulfilled, (state, action) => {
        state.profile.push(action.payload)
      })
      .addCase(asyncSignUp.fulfilled, (state, action) => {
        state.profile.push(action.payload)
      })
  }
})

// export const { } = profileSlice.actions

export default profileSlice.reducer