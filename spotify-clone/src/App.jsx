import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { CssBaseline, ThemeProvider, GlobalStyles, Box } from '@mui/material'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { fetchSpotifyData } from './store/slices/spotifySlice'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import Browse from './pages/Browse/Browse'
import './App.css'

const scrollbarStyles = (
  <GlobalStyles
    styles={{
      '*::-webkit-scrollbar': {
        width: '12px',
      },
      '*::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '10px',
        border: '3px solid transparent',
        backgroundClip: 'content-box',
      },
      '*::-webkit-scrollbar-thumb:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
      },
    }}
  />
);

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSpotifyData())
  }, [dispatch])

  return (
    <Router>
      {scrollbarStyles}
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
          </Routes>
        </Layout>
      </Box>
    </Router>
  )
}

export default App
