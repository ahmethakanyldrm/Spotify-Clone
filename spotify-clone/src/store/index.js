import { configureStore } from '@reduxjs/toolkit'
import spotifyReducer from './slices/spotifySlice'

const store = configureStore({
  reducer: {
    spotify: spotifyReducer,
  },
})

export default store
