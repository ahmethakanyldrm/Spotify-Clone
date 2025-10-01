import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Drawer, useTheme, useMediaQuery, IconButton } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import MusicPlayer from '../MusicPlayer/MusicPlayer';
import { MenuIcon } from '../../assets/icons';

const drawerWidth = 240;
const collapsedDrawerWidth = 0;

const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { currentTrack } = useSelector((state) => state.spotify);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const getSidebarWidth = () => {
    if (isMobile) return 0;
    if (sidebarCollapsed) return collapsedDrawerWidth;
    return drawerWidth;
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#000', overflow: 'hidden' }}>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: '#000',
            borderRight: 'none',
          },
        }}
      >
        <Sidebar isCollapsed={false} onMobileClose={() => setMobileOpen(false)} />
      </Drawer>

      {/* Desktop Sidebar */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          width: sidebarCollapsed ? collapsedDrawerWidth : drawerWidth,
          flexShrink: 0,
          transition: 'width 0.3s ease',
          overflow: 'hidden',
          backgroundColor: '#000',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Box sx={{ 
          width: sidebarCollapsed ? collapsedDrawerWidth : drawerWidth, 
          height: '100%',
          transition: 'width 0.3s ease',
          overflow: 'hidden'
        }}>
          <Sidebar 
            isCollapsed={sidebarCollapsed} 
            onToggle={handleSidebarToggle}
            onMobileClose={() => setMobileOpen(false)}
          />
        </Box>
      </Box>
      
      {/* Sidebar Kapalıyken Açma Butonu - Header içinde göster */}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden',
          flex: 1,
          backgroundColor: '#121212',
          position: 'relative',
          minWidth: 0,
          width: { xs: '100vw', md: `calc(100vw - ${getSidebarWidth()}px)` },
          transition: 'width 0.3s ease',
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            position: 'relative',
            background: 'linear-gradient(180deg, rgba(40, 40, 40, 1) 0%, #121212 300px)',
            pb: currentTrack ? { xs: '100px', md: '110px' } : { xs: 2, md: 3 },
            minHeight: '100vh',
            width: '100%',
            '&::-webkit-scrollbar': {
              width: '12px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '10px',
              border: '3px solid transparent',
              backgroundClip: 'content-box',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
            },
          }}
        >
          <Header 
            onMenuClick={handleDrawerToggle} 
            onSidebarToggle={handleSidebarToggle}
            sidebarCollapsed={sidebarCollapsed}
          />
          <Box sx={{ 
            py: { xs: 2, md: 3 }, 
            px: { xs: 2, sm: 2.5, md: 3, lg: 4 }, 
            width: '100%',
            maxWidth: '100%',
            overflowX: 'hidden',
            boxSizing: 'border-box'
          }}>
            {children}
          </Box>
        </Box>

        {/* Music Player */}
        {currentTrack && (
          <Box
            sx={{
              position: 'fixed',
              bottom: 0,
              left: { xs: 0, md: getSidebarWidth() },
              right: 0,
              height: { xs: '80px', md: '90px' },
              backgroundColor: '#181818',
              borderTop: '1px solid #282828',
              zIndex: 1300,
              transition: 'left 0.3s ease, width 0.3s ease',
              boxSizing: 'border-box',
              width: { xs: '100vw', md: `calc(100vw - ${getSidebarWidth()}px)` }
            }}
          >
            <MusicPlayer />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Layout;
