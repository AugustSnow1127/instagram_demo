import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const apiForLogin = 'http://localhost:3000/profile/login';
const apiForSignUp = 'http://localhost:3000/profile/signUp';
const apiForProfile = 'http://localhost:3000/profile'

const initialState = {
  profile: [],
  logining: '',
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

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile', 
  async () => {
    console.log("fetchProfile")
    const response = await axios.get(apiForProfile);
    return response.data
  }
)

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    userLogining(state, action){
      state.logining = action.payload
      // console.log(state)
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProfile.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched profile to the array
        state.profile = state.profile.concat(action.payload)
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(asyncLogin.fulfilled, (state, action) => {
        state.profile.push(action.payload)
      })
      .addCase(asyncSignUp.fulfilled, (state, action) => {
        state.profile.push(action.payload)
      })
  }
})

export const { userLogining } = profileSlice.actions

export default profileSlice.reducer

export const selectAllProfile = (state) => state.profile.profile
