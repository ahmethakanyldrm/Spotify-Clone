import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
  Box,
  Typography,
  IconButton,
  Slider,
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material'
import {
  SkipPreviousIcon,
  PlayArrowIcon,
  PauseIcon,
  SkipNextIcon,

  FavoriteBorderIcon,
  
  PictureInPictureIcon
} from '../../assets/icons'
import { togglePlayPause } from '../../store/slices/spotifySlice'

/**
 * O anki parçayı gösteren ve oynatma kontrolleri sağlayan MusicPlayer bileşeni.
 */
const MusicPlayer = () => {
  // Tema, medya sorguları, Redux state'i ve yerel state için hook'lar
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { currentTrack, isPlaying } = useSelector((state) => state.spotify)
  const dispatch = useDispatch()
  const [progress, setProgress] = useState(0) // İlerleme çubuğu için yerel state
  const intervalRef = useRef() // Interval ID'sini tutmak için ref

  // Parçanın toplam süresini saniye cinsinden hesapla
  const durationInSeconds = currentTrack ? 
    parseInt(currentTrack.duration.split(':')[0]) * 60 + parseInt(currentTrack.duration.split(':')[1]) : 0

  // İlerleme çubuğu animasyonunu yönetmek için effect
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false)
            return 0
          }
          if (durationInSeconds > 0) {
            return prev + (100 / durationInSeconds)
          }
          return prev
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isPlaying, durationInSeconds])

  // Parça değiştiğinde ilerlemeyi sıfırlamak için effect
  useEffect(() => {
    setProgress(0)
  }, [currentTrack])

  // Çalacak bir parça yoksa bileşeni render etme
  if (!currentTrack) {
    return null
  }

  // Redux store'a bir eylem göndererek oynat/durdur durumunu değiştirir
  const handlePlayPause = () => {
    dispatch(togglePlayPause())
  }

  // Zamanı saniyeden aa:ss formatına dönüştüren yardımcı fonksiyon
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }


  return (
    <Box sx={{
      backgroundColor: '#181818',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      padding: isMobile ? 1 : 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: isMobile ? 80 : 90,
      gap: 2,
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1201
    }}>
      {/* Track Info */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        flex: '1 1 30%',
        minWidth: 180
      }}>
        <Avatar
          src={currentTrack.cover_image}
          sx={{ width: 56, height: 56, borderRadius: 1 }}
          variant="rounded"
        />
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
            {currentTrack.title}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {currentTrack.artist}
          </Typography>
        </Box>
        <IconButton size="small" sx={{ color: 'text.secondary', display: { xs: 'none', md: 'inline-flex' } }}>
          <FavoriteBorderIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" sx={{ color: 'text.secondary', display: { xs: 'none', md: 'inline-flex' } }}>
          <PictureInPictureIcon />
        </IconButton>
      </Box>

      {/* Player Controls */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1 1 40%', maxWidth: 722 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton size="small" sx={{ color: 'white' }}><SkipPreviousIcon /></IconButton>
          <IconButton onClick={handlePlayPause} sx={{ backgroundColor: 'white', color: 'black', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', '&:hover': { backgroundColor: 'white', transform: 'scale(1.05)' } }}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <IconButton size="small" sx={{ color: 'white' }}><SkipNextIcon /></IconButton>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1, width: '100%', mt: 1 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>{formatTime((progress / 100) * durationInSeconds)}</Typography>
          <Slider value={progress} onChange={(e, v) => setProgress(v)} sx={{ color: 'white', height: 4, '& .MuiSlider-thumb': { width: 12, height: 12 } }} />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>{currentTrack.duration}</Typography>
        </Box>
      </Box>

      {/* Empty Box for layout balance */}
      <Box sx={{ display: { xs: 'none', md: 'flex' }, flex: '1 1 30%', minWidth: 180 }} />
    </Box>
  )
}

export default MusicPlayer
