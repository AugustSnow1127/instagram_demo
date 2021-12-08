import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const apiForProfile = 'http://localhost:3000';

const initialState = {
  profile: [],
  status: 'idle',
  error: null,
}

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async () => {
  const response = await axios.get(apiForProfile);
  console.log(response.data);
  return response.data
})

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    
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
  }
})

// export const { } = profileSlice.actions

export default profileSlice.reducer

export const selectAllProfile = (state) => state.profile.profile

export const selectprofileById = (state, profileId) =>
  state.profile.profile.find((profile) => profile.id === profileId)