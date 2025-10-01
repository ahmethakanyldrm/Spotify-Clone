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
      // Generate random duration between 2:30 and 5:30
      const randomMinutes = Math.floor(Math.random() * 3) + 2; // 2, 3, or 4 minutes
      const randomSeconds = Math.floor(Math.random() * 60); // 0-59 seconds
      const duration = `${randomMinutes}:${randomSeconds.toString().padStart(2, '0')}`;
      
      const trackToPlay = {
        title: title,
        artist: subtitle,
        album: 'Album Name',
        duration: duration,
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
        width: { xs: 160, sm: 180, md: 200 },
        height: { xs: 240, sm: 260, md: 280 },
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
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
            width: { xs: 120, sm: 140, md: 160 },
            height: { xs: 120, sm: 140, md: 160 },
            objectFit: 'cover',
            borderRadius: 1,
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
          }}
        />
      </Box>

      <Box sx={{ px: 2, pb: 2, flex: 1 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'white', 
            fontWeight: 'bold', 
            fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            mb: 0.5
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'text.secondary', 
            fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.4
          }}
        >
          {subtitle}
        </Typography>
      </Box>

      <Fade in={isHovered || isThisCardPlaying}>
        <Box
          className="play-button"
          sx={{
            position: 'absolute',
            bottom: { xs: 60, sm: 65, md: 70 },
            right: { xs: 12, sm: 14, md: 16 },
            width: { xs: 44, sm: 46, md: 48 },
            height: { xs: 44, sm: 46, md: 48 },
            borderRadius: '50%',
            backgroundColor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            transition: 'transform 0.2s ease-in-out, background-color 0.2s ease',
            opacity: isThisCardPlaying ? 1 : 0,
            transform: isThisCardPlaying ? 'translateY(0)' : 'translateY(8px)',
            '&:hover': {
              transform: 'scale(1.05)',
              backgroundColor: '#1ed760',
            }
          }}
          onClick={handlePlayClick}
        >
          <IconButton sx={{ color: 'black', p: 0 }}>
            {isThisCardPlaying ? 
              <PauseIcon sx={{ fontSize: { xs: 28, sm: 30, md: 32 } }} /> : 
              <PlayArrowIcon sx={{ fontSize: { xs: 28, sm: 30, md: 32 } }} />
            }
          </IconButton>
        </Box>
      </Fade>
    </Box>
  )
}

export default PlaylistCard
