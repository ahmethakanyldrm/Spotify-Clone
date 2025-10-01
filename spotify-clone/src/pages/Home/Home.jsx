import { useSelector } from 'react-redux'
import {
  Box,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material'
import PlaylistCard from '../../components/PlaylistCard/PlaylistCard'

/**
 * Yakında çalınanları ve tavsiye edilen çalma listelerini gösteren ana sayfa bileşeni.
 */
const Home = () => {
  // Redux store'dan ilgili verileri seç
  const { 
    recentlyPlayed, 
    recommended, 
    loading, 
    error, 
    searchQuery 
  } = useSelector((state) => state.spotify)



  // Veri çekilirken bir yükleme animasyonu göster
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  // Veri çekme başarısız olursa bir hata mesajı göster
  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">Veri yüklenirken bir hata oluştu: {error}</Alert>
      </Box>
    )
  }

  return (
    <Box sx={{ 
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Yakında Çalınanlar Bölümü */}
      <Box sx={{ mb: { xs: 3, md: 4 }, width: "100%", maxWidth: "100%", overflow: "hidden" }}>
        <Typography
          variant="h5"
          sx={{ 
            color: "white", 
            fontWeight: "bold", 
            mb: 2,
            fontSize: { xs: '1.2rem', md: '1.5rem' }
          }}
        >
          Yakında Çalanlar
        </Typography>
        <Box sx={{
          display: 'flex',
          gap: { xs: 1.5, sm: 2, md: 2.5 },
          width: '100%',
          maxWidth: '100%',
          overflowX: 'auto',
          overflowY: 'hidden',
          pb: 1,
          justifyContent: 'flex-start',
          '&::-webkit-scrollbar': {
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
          },
        }}>
          {recentlyPlayed
            .filter((item) =>
              item.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((item, index) => (
              <Box key={index} sx={{ flexShrink: 0 }}>
                <PlaylistCard
                  title={item.title}
                  subtitle={item.subtitle || "Çalma Listesi"}
                  image={item.image}
                />
              </Box>
            ))}
        </Box>
      </Box>

      {/* Tavsiye Edilenler Bölümü */}
      <Box sx={{ mb: { xs: 3, md: 4 }, width: "100%", maxWidth: "100%", overflow: "hidden" }}>
        <Typography
          variant="h5"
          sx={{ 
            color: "white", 
            fontWeight: "bold", 
            mb: 1,
            fontSize: { xs: '1.2rem', md: '1.5rem' }
          }}
        >
          Tavsiye Edilenler
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: "text.secondary", 
            mb: 2,
            fontSize: { xs: '0.9rem', md: '1rem' }
          }}
        >
          Sevdiğin her şeyden biraz dinle.
        </Typography>
        <Box sx={{
          display: 'flex',
          gap: { xs: 1.5, sm: 2, md: 2.5 },
          width: '100%',
          maxWidth: '100%',
          overflowX: 'auto',
          overflowY: 'hidden',
          pb: 1,
          justifyContent: 'flex-start',
          '&::-webkit-scrollbar': {
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
          },
        }}>
          {recommended
            .filter((item) =>
              item.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((item, index) => (
              <Box key={index} sx={{ flexShrink: 0 }}>
                <PlaylistCard
                  title={item.title}
                  subtitle={item.description}
                  image={item.image}
                />
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Home
