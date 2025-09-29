import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Drawer } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import MusicPlayer from '../MusicPlayer/MusicPlayer';

const drawerWidth = 240;

const Layout = ({ children }) => {

  const [mobileOpen, setMobileOpen] = useState(false);
  const { currentTrack } = useSelector((state) => state.spotify);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#000' }}>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
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
          <Sidebar />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#000',
              borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            },
          }}
          open
        >
          <Sidebar />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'auto',
          width: '1506px',
          maxWidth: '1506px',
          minWidth: '1506px',
          flexShrink: 0,
          backgroundColor: '#121212'
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            position: 'relative',
            backgroundColor: '#121212',
            borderRadius: { md: '8px' },
            mb: currentTrack ? '200px' : '100px',
            width: '1506px',
            maxWidth: '1506px',
            minWidth: '1506px',
            flexShrink: 0,
            minHeight: '100vh',
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
          <Header onMenuClick={handleDrawerToggle} />
          <Box sx={{ 
            py: 3, 
            pl: 3, 
            pr: 3, 
            width: '100%',
            maxWidth: '100%',
            overflowX: 'hidden'
          }}>
            {children}
          </Box>
        </Box>

        {currentTrack && (
          <Box
            sx={{
              position: 'fixed',
              bottom: 0,
              left: { md: drawerWidth },
              right: 0,
              height: '90px',
              backgroundColor: '#181818',
              borderTop: '1px solid #282828',
              zIndex: 1300,
              m: { md: 1 },
              mt: 0,
              borderBottomLeftRadius: { md: '8px' },
              borderBottomRightRadius: { md: '8px' },
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
