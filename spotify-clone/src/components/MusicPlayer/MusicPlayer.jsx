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
      padding: { xs: 1, sm: 1.5, md: 2 },
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: { xs: 70, sm: 80, md: 90 },
      gap: { xs: 0.5, sm: 1, md: 2 },
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1201,
      flexWrap: { xs: 'nowrap', sm: 'nowrap' },
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box'
    }}>
      {/* Track Info */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 0.5, sm: 1, md: 2 },
        flex: { xs: '1 1 50%', sm: '1 1 45%', md: '1 1 30%' },
        minWidth: { xs: 100, sm: 120, md: 180 },
        overflow: 'hidden'
      }}>
        <Avatar
          src={currentTrack.cover_image}
          sx={{ 
            width: { xs: 40, sm: 48, md: 56 }, 
            height: { xs: 40, sm: 48, md: 56 }, 
            borderRadius: 1 
          }}
          variant="rounded"
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'white', 
              fontWeight: 'bold',
              fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem' },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {currentTrack.title}
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'text.secondary',
              fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {currentTrack.artist}
          </Typography>
        </Box>
        <IconButton 
          size="small" 
          sx={{ 
            color: 'text.secondary', 
            display: { xs: 'none', lg: 'inline-flex' },
            p: 0.5
          }}
        >
          <FavoriteBorderIcon fontSize="small" />
        </IconButton>
        <IconButton 
          size="small" 
          sx={{ 
            color: 'text.secondary', 
            display: { xs: 'none', lg: 'inline-flex' },
            p: 0.5
          }}
        >
          <PictureInPictureIcon />
        </IconButton>
      </Box>

      {/* Player Controls */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        flex: { xs: '1 1 50%', sm: '1 1 55%', md: '1 1 40%' }, 
        maxWidth: { xs: '100%', md: 722 },
        minWidth: 0
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: { xs: 0.5, sm: 1, md: 2 } 
        }}>
          <IconButton 
            size="small" 
            sx={{ 
              color: 'white',
              p: { xs: 0.5, sm: 1 }
            }}
          >
            <SkipPreviousIcon sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }} />
          </IconButton>
          <IconButton 
            onClick={handlePlayPause} 
            sx={{ 
              backgroundColor: 'white', 
              color: 'black', 
              width: { xs: 32, sm: 36, md: 40 }, 
              height: { xs: 32, sm: 36, md: 40 }, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              '&:hover': { 
                backgroundColor: 'white', 
                transform: 'scale(1.05)' 
              } 
            }}
          >
            {isPlaying ? 
              <PauseIcon sx={{ fontSize: { xs: 20, sm: 24, md: 28 } }} /> : 
              <PlayArrowIcon sx={{ fontSize: { xs: 20, sm: 24, md: 28 } }} />
            }
          </IconButton>
          <IconButton 
            size="small" 
            sx={{ 
              color: 'white',
              p: { xs: 0.5, sm: 1 }
            }}
          >
            <SkipNextIcon sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }} />
          </IconButton>
        </Box>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: { xs: 0.5, sm: 0.75, md: 1 }, 
          width: '100%', 
          mt: { xs: 0.5, sm: 0.75, md: 1 } 
        }}>
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'text.secondary',
              fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
              minWidth: { xs: '28px', sm: '32px', md: '36px' }
            }}
          >
            {formatTime((progress / 100) * durationInSeconds)}
          </Typography>
          <Slider 
            value={progress} 
            onChange={(e, v) => setProgress(v)} 
            sx={{ 
              color: 'white', 
              height: { xs: 3, sm: 3.5, md: 4 }, 
              '& .MuiSlider-thumb': { 
                width: { xs: 8, sm: 10, md: 12 }, 
                height: { xs: 8, sm: 10, md: 12 } 
              } 
            }} 
          />
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'text.secondary',
              fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
              minWidth: { xs: '28px', sm: '32px', md: '36px' }
            }}
          >
            {currentTrack.duration}
          </Typography>
        </Box>
      </Box>

      {/* Empty Box for layout balance - hidden on mobile */}
      <Box sx={{ 
        display: { xs: 'none', lg: 'flex' }, 
        flex: '1 1 30%', 
        minWidth: 180 
      }} />
    </Box>
  )
}

export default MusicPlayer
