import axios from 'axios'

const API_URL = '/api/spotify.json'

export const getSpotifyData = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.error('Error fetching Spotify data:', error)
    throw error
  }
}
