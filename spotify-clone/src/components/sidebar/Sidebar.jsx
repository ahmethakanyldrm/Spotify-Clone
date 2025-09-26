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
  InputBase
} from '@mui/material'
import { HomeIcon, SearchIcon, LibraryIcon, SpotifyLogoIcon, FilterIcon } from '../../assets/icons'
import { setPlaylistSearchQuery } from '../../store/slices/spotifySlice'

/**
 * Navigasyon, logo ve kullanıcı çalma listelerini içeren Sidebar bileşeni.
 */
const Sidebar = () => {
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
    { text: 'Gözat', icon: <SearchIcon />},
    { text: 'Kitaplık', icon: <LibraryIcon /> },
  ]

  // Navigasyon tıklamalarını yönetir
  const handleNavigation = (path) => {
    navigate(path)
    if (isMobile) {
      setMobileOpen(false)
    }
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#000000',
      color: 'white',
      p: 1
    }}>
      {/* Spotify Logosu */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <SpotifyLogoIcon />
      </Box>

      {/* Ana Navigasyon (Giriş, Gözat, Kitaplık) */}
      <Box>
        <List dense>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={item.path === '/' ? () => handleNavigation(item.path) : null}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  cursor: item.path === '/' ? 'pointer' : 'default',
                  '&:hover': {
                    backgroundColor: item.path === '/' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
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
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Kullanıcının Çalma Listeleri Bölümü */}
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
    </Box>
  )
}

export default Sidebar
