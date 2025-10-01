import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  useTheme,
  useMediaQuery,
  IconButton,
  InputBase,
  Tooltip
} from '@mui/material'
import { HomeIcon, SearchIcon, LibraryIcon, SpotifyLogoIcon, FilterIcon, MenuIcon } from '../../assets/icons'
import { setPlaylistSearchQuery } from '../../store/slices/spotifySlice'

/**
 * Navigasyon, logo ve kullanıcı çalma listelerini içeren Sidebar bileşeni.
 */
const Sidebar = ({ isCollapsed = false, onToggle, onMobileClose }) => {
  // Tema, medya sorguları, navigasyon ve Redux state'i için hook'lar
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()
  const location = useLocation()
  const { playlists, playlistSearchQuery } = useSelector((state) => state.spotify)
  const dispatch = useDispatch()

  // Çalma listelerini Redux store'dan gelen arama sorgusuna göre filtrele
  const filteredPlaylists = playlists.filter(playlist => 
    playlist.title.toLowerCase().includes(playlistSearchQuery.toLowerCase())
  )

  // Navigasyon menü öğeleri
  const menuItems = [
    { text: 'Giriş', icon: <HomeIcon />, path: '/' },
    { text: 'Gözat', icon: <SearchIcon />, path: '/browse' },
    { text: 'Kitaplık', icon: <LibraryIcon /> },
  ]

  // Navigasyon tıklamalarını yönetir
  const handleNavigation = (path) => {
    navigate(path)
    if (isMobile && onMobileClose) {
      onMobileClose()
    }
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#000000',
      color: 'white',
      p: isCollapsed ? 1 : 2,
      transition: 'padding 0.3s ease',
      width: '100%',
      overflow: 'hidden'
    }}>
      {/* Spotify Logosu ve Toggle Butonu */}
      <Box sx={{ 
        px: 2,
        py: 2, 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2
      }}>
        <SpotifyLogoIcon />
        {onToggle && (
          <IconButton
            onClick={onToggle}
            size="small"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <MenuIcon sx={{ fontSize: 24 }} />
          </IconButton>
        )}
      </Box>

      {/* Ana Navigasyon (Giriş, Gözat, Kitaplık) */}
      <Box>
        <List dense>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <Tooltip title={isCollapsed ? item.text : ''} placement="right">
                <ListItemButton
                  onClick={item.path ? () => handleNavigation(item.path) : null}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    cursor: item.path ? 'pointer' : 'default',
                    justifyContent: isCollapsed ? 'center' : 'flex-start',
                    px: isCollapsed ? 1 : 2,
                    '&:hover': {
                      backgroundColor: item.path ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                    },
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: 'white', 
                    minWidth: isCollapsed ? 'auto' : 40,
                    justifyContent: 'center'
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  {!isCollapsed && (
                    <ListItemText
                      primary={item.text}
                      sx={{
                        '& .MuiListItemText-primary': {
                          fontSize: '0.9rem',
                          color: 'white',
                          fontWeight: location.pathname === item.path ? 'bold' : 'normal'
                        }
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Kullanıcının Çalma Listeleri Bölümü - Sadece collapsed değilse göster */}
      {!isCollapsed && (
        <Box sx={{ flex: 1, overflow: 'auto', mt: 2, px: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" sx={{
              color: 'text.secondary',
              fontWeight: 'bold',
              fontSize: '0.75rem',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}>
              ÇALMA LİSTELERİN
            </Typography>
          </Box>
          {/* Çalma Listesi Arama Girişi */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 1,
            px: 1,
            py: 0.5,
            mb: 1
          }}>
            <SearchIcon sx={{ color: 'text.secondary', fontSize: 16, mr: 1 }} />
            <InputBase
              placeholder="Ara"
              sx={{ ml: 1, flex: 1, color: 'white', fontSize: '0.8rem' }}
              value={playlistSearchQuery}
              onChange={(e) => dispatch(setPlaylistSearchQuery(e.target.value))}
            />
          </Box>
          {/* Filtrelenmiş Çalma Listelerinin Listesi */}
          <List dense>
            {filteredPlaylists.map((playlist, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Avatar
                      src={playlist.image}
                      sx={{ width: 32, height: 32 }}
                      variant="rounded"
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={playlist.title}
                    secondary={playlist.description}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: '0.85rem',
                        color: 'text.primary',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      },
                      '& .MuiListItemText-secondary': {
                        fontSize: '0.75rem',
                        color: 'text.secondary',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Collapsed durumda sadece çalma listeleri ikonları */}
      {isCollapsed && (
        <Box sx={{ flex: 1, overflow: 'auto', mt: 2 }}>
          <List dense>
            {filteredPlaylists.slice(0, 5).map((playlist, index) => (
              <ListItem key={index} disablePadding>
                <Tooltip title={playlist.title} placement="right">
                  <ListItemButton sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    justifyContent: 'center',
                    px: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}>
                    <Avatar
                      src={playlist.image}
                      sx={{ width: 24, height: 24 }}
                      variant="rounded"
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  )
}

export default Sidebar
