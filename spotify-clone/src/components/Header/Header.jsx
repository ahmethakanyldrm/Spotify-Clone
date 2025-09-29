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
const Header = ({ onMenuClick }) => {
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
      p: 2,
      height: 72,
      width: '1506px',
      maxWidth: '1506px',
      minWidth: '1506px',
      backgroundColor: alpha(theme.palette.background.paper, 0.7),
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      flexShrink: 0
    }}>
      {/* Sol Taraf: Navigasyon Okları ve Arama Çubuğu */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Mobil Görünüm İçin Menü Butonu */}
        {isMobile && (
          <IconButton onClick={onMenuClick} sx={{ color: 'white' }}>
            <MenuIcon />
          </IconButton>
        )}
        {/* Navigasyon Okları */}
        <IconButton sx={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton sx={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <ChevronRightIcon />
        </IconButton>
        {/* Arama Çubuğu */}
        <Box sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          backgroundColor: alpha(theme.palette.background.default, 0.7),
          borderRadius: 25,
          p: '4px 12px',
          width: 300,
          minWidth: 300,
          maxWidth: 300,
          flexShrink: 0
        }}>
          <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
          <InputBase
            placeholder="Ara"
            sx={{ ml: 1, flex: 1, color: 'white' }}
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
        </Box>
      </Box>

      {/* Kullanıcı Profili Bölümü */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: -8 }}>
        <Avatar
          src={user?.profile_picture}
          sx={{ width: 32, height: 32 }}
        />
        <Typography variant="body2" sx={{ color: 'white', display: { xs: 'none', md: 'block' } }}>
          {user?.name}
        </Typography>
      </Box>
    </Box>
  )
}

export default Header
