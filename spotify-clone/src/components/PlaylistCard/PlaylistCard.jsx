import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Typography,
  IconButton,
  Fade
} from '@mui/material'
import {
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon
} from '@mui/icons-material'
import { setCurrentTrack, togglePlayPause } from '../../store/slices/spotifySlice'

/**
 * Tek bir çalma listesini veya albümü gösteren PlaylistCard bileşeni.
 */
const PlaylistCard = ({ title, subtitle, image }) => {
  // Hover efekti için yerel state ve genel state için Redux hook'ları
  const [isHovered, setIsHovered] = useState(false)
  const dispatch = useDispatch()
  const { currentTrack, isPlaying } = useSelector((state) => state.spotify)

  // Bu kartla ilişkili parçanın o anda çalıp çalmadığını kontrol et
  const isThisCardPlaying = isPlaying && currentTrack?.title === title

  // Oynat butonuna tıklamayı yönetir
  const handlePlayClick = (e) => {
    e.stopPropagation()

    if (isThisCardPlaying) {
      dispatch(togglePlayPause())
    } else {
      const trackToPlay = {
        title: title,
        artist: subtitle,
        album: 'Album Name',
        duration: '3:45',
        cover_image: image
      }
      dispatch(setCurrentTrack(trackToPlay))
      if (!isPlaying) {
        dispatch(togglePlayPause())
      }
    }
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: '166px',
        height: '320px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        borderRadius: '10px',
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          '& .play-button': {
            opacity: 1,
            transform: 'translateY(0)',
          }
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cover Picture */}
      <Box sx={{ p: 2 }}>
        <Box
          component="img"
          src={image}
          alt={title}
          sx={{
            height: 171,
            width: '100%',
            objectFit: 'cover',
            borderRadius: 1,
            mb: 2,
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
          }}
        />
      </Box>

      <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem', px: 2, mt: -2 }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', px: 2, mt: 0.5 }}>
        {subtitle}
      </Typography>

      <Fade in={isHovered}>
        <IconButton
          className="play-button"
          onClick={handlePlayClick}
          sx={{
            position: 'absolute',
            bottom: 90,
            right: 20,
            backgroundColor: 'primary.main',
            color: 'black',
            boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
            '&:hover': {
              backgroundColor: '#1ed760',
              transform: 'scale(1.05)'
            }
          }}
        >
          {isThisCardPlaying ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
        </IconButton>
      </Fade>
    </Box>
  )
}

export default PlaylistCard
