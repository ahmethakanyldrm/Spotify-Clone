import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Box,
  Drawer,
  useTheme,
  useMediaQuery
} from '@mui/material'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import MusicPlayer from '../MusicPlayer/MusicPlayer'

const drawerWidth = 240 // Sidebar genişliği

/**
 * Uygulamanın ana yerleşimini (Sidebar, Header, ana içerik, MusicPlayer) oluşturan bileşen.
 * Aynı zamanda mobil ve masaüstü görünümler arasındaki geçişi yönetir.
 */
const Layout = ({ children }) => {
  // Tema, medya sorguları ve mobil menü durumu için hook'lar
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false) // Mobil menünün açık/kapalı durumu
  const { currentTrack } = useSelector((state) => state.spotify)

  // Mobil menüyü açıp kapatan fonksiyon
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Masaüstü Görünüm için Kalıcı Sidebar */}
      {!isMobile && (
        <Box
          component="nav"
          sx={{ width: drawerWidth, flexShrink: 0 }}
        >
          <Drawer
            variant="permanent"
            sx={{
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                backgroundColor: '#000000',
                borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                boxSizing: 'border-box',
              },
            }}
          >
            <Sidebar />
          </Drawer>
        </Box>
      )}

      {/* Mobil Görünüm için Geçici Çekmece Menü */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              backgroundColor: '#000000',
              boxSizing: 'border-box',
            },
          }}
        >
          <Sidebar />
        </Drawer>
      )}

      {/* Ana İçerik Alanı */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: '#121212',
        }}
      >
        {/* Header */}
        <Header onMenuClick={handleDrawerToggle} />

        {/* Content Area */}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            paddingBottom: currentTrack ? '90px' : 0, // Müzik çalar varken içeriğin alttan boşluklu olması için
            backgroundColor: '#121212',
            p: 3,
          }}
        >
          {/* App.jsx'ten gelen ana sayfa içeriği (children) burada render edilir */}
          {children}
        </Box>

        {/* Müzik Çalar Alanı */}
        <Box>
          <MusicPlayer />
        </Box>
      </Box>
    </Box>
  )
}

export default Layout
