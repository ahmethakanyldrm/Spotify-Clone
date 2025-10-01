import { useSelector, useDispatch } from 'react-redux'
import {
  Box,
  IconButton,
  Avatar,
  Typography,
  useTheme,
  useMediaQuery,
  InputBase,
  alpha
} from '@mui/material'
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon, MenuIcon } from '../../assets/icons'
import { setSearchQuery } from '../../store/slices/spotifySlice'

/**
 * Uygulamanın üst kısmında yer alan, navigasyon okları, arama çubuğu ve kullanıcı profilini içeren Header bileşeni.
 */
const Header = ({ onMenuClick, onSidebarToggle, sidebarCollapsed }) => {
  // Tema, medya sorguları, Redux state'i ve dispatch için hook'lar
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { user, searchQuery } = useSelector((state) => state.spotify)
  const dispatch = useDispatch()

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      px: { xs: 2, sm: 2.5, md: 3, lg: 4 },
      py: { xs: 1.5, md: 2 },
      height: 'auto',
      minHeight: { xs: 60, sm: 64, md: 72 },
      width: '100%',
      maxWidth: '100%',
      backgroundColor: 'transparent',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      flexShrink: 0,
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      {/* Sol Taraf: Navigasyon Okları ve Arama Çubuğu */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: { xs: 1, sm: 1, md: 1.5 },
        flex: 1,
        minWidth: 0,
        maxWidth: { xs: 'calc(100% - 50px)', sm: '100%' }
      }}>
        {/* Mobil Görünüm İçin Menü Butonu */}
        {isMobile && (
          <IconButton 
            onClick={onMenuClick} 
            sx={{ 
              color: 'white',
              p: 0.5,
              flexShrink: 0
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        
        {/* Sidebar Toggle - Sadece kapalıyken görünür */}
        {!isMobile && sidebarCollapsed && (
          <IconButton
            onClick={onSidebarToggle}
            sx={{
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(10px)',
              width: 40,
              height: 40,
              mr: 0.5,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                transform: 'scale(1.05)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            <MenuIcon sx={{ fontSize: 20 }} />
          </IconButton>
        )}
        
        {/* Navigasyon Okları - Desktop */}
        {!isMobile && (
          <>
            <IconButton 
              sx={{ 
                color: 'white', 
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(10px)',
                width: 40,
                height: 40,
                mr: 0.5,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  transform: 'scale(1.05)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              <ChevronLeftIcon sx={{ fontSize: 20 }} />
            </IconButton>
            <IconButton 
              sx={{ 
                color: 'white', 
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(10px)',
                width: 40,
                height: 40,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  transform: 'scale(1.05)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              <ChevronRightIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </>
        )}
        
        {/* Arama Çubuğu */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '500px',
          px: { xs: 1.5, sm: 2, md: 2.5 },
          py: { xs: 0.8, sm: 1, md: 1.2 },
          width: { xs: '100%', sm: 'auto' },
          minWidth: { sm: 240, md: 300, lg: 360 },
          maxWidth: { xs: '100%', sm: 360 },
          flex: { xs: 1, sm: 0 },
          flexShrink: 0,
          ml: { xs: 0, sm: 2, md: 3 },
          border: '1px solid transparent',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            borderColor: 'rgba(255, 255, 255, 0.2)'
          },
          '&:focus-within': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderColor: 'rgba(255, 255, 255, 0.3)'
          }
        }}>
          <SearchIcon sx={{ 
            color: 'rgba(255, 255, 255, 0.7)', 
            fontSize: { xs: 18, sm: 20, md: 22 },
            flexShrink: 0
          }} />
          <InputBase
            placeholder="Ne dinlemek istiyorsun?"
            sx={{ 
              ml: { xs: 1, sm: 1.5 }, 
              flex: 1, 
              color: 'white', 
              fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
              minWidth: 0,
              '& input': {
                padding: 0,
                '&::placeholder': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  opacity: 1
                }
              }
            }}
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
        </Box>
      </Box>

      {/* Kullanıcı Profili Bölümü */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1,
        flexShrink: 0,
        ml: { xs: 1, sm: 2 },
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '500px',
        px: { xs: 0.25, sm: 1, md: 1.5 },
        py: { xs: 0.25, sm: 0.75 },
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          transform: 'scale(1.02)'
        }
      }}>
        <Avatar
          src={user?.profile_picture}
          sx={{ 
            width: { xs: 32, sm: 32, md: 36 }, 
            height: { xs: 32, sm: 32, md: 36 },
            border: '2px solid rgba(255, 255, 255, 0.1)'
          }}
        />
        <Typography variant="body2" sx={{ 
          color: 'white', 
          display: { xs: 'none', md: 'block' },
          fontSize: { md: '0.9rem', lg: '0.95rem' },
          fontWeight: 600,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: { md: 100, lg: 150 },
          pr: { xs: 0, md: 1 }
        }}>
          {user?.name}
        </Typography>
      </Box>
    </Box>
  )
}

export default Header
