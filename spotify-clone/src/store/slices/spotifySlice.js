import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSpotifyData } from '../../services/api'

// Spotify API'sinden başlangıç verilerini çekmek için asenkron thunk
export const fetchSpotifyData = createAsyncThunk(
  'spotify/fetchData',
  async () => {
    const response = await getSpotifyData()
    return response
  }
)

// Spotify slice'ının başlangıç durumunu tanımlar
const initialState = {
  user: null,
  playlists: [],
  recentlyPlayed: [],
  recommended: [],
  currentTrack: null,
  isPlaying: false,
  searchQuery: '',
  playlistSearchQuery: '',
  searchResults: [],
  loading: true,
  error: null,
}

// Reducer'lar ve action'lar dahil olmak üzere Spotify verileri için bir Redux slice'ı oluşturur
const spotifySlice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {
    // O an çalan parçayı ayarlar
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload
    },
    // Ana içerik için arama sorgusunu ayarlar (Header araması)
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    // Sidebar'daki çalma listeleri için arama sorgusunu ayarlar
    setPlaylistSearchQuery: (state, action) => {
      state.playlistSearchQuery = action.payload
    },
    // Genel oynat/durdur durumunu değiştirir
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
  },
  // Slice dışında tanımlanan eylemleri (asenkron thunk'lar gibi) yönetir
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpotifyData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSpotifyData.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.playlists = action.payload.playlists
        state.recentlyPlayed = action.payload.recently_played
        state.recommended = action.payload.recommended
        state.currentTrack = action.payload.current_track
      })
      .addCase(fetchSpotifyData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { setCurrentTrack, setSearchQuery, setPlaylistSearchQuery, togglePlayPause } = spotifySlice.actions

export default spotifySlice.reducer
