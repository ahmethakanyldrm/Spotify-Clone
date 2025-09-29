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
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      pb: 20
    }}>
      {/* Yakında Çalınanlar Bölümü */}
      <Box sx={{ mb: 4, width: "100%" }}>
        <Typography
          variant="h5"
          sx={{ color: "white", fontWeight: "bold", mb: 2 }}
        >
          Yakında Çalanlar
        </Typography>
        <Box sx={{
          display: 'flex',
          gap: 2,
          width: '100%',
          overflowX: 'auto',
          pb: 1
        }}>
          {recentlyPlayed
            .filter((item) =>
              item.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .slice(0, 5)
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
      <Box sx={{ mb: 4, width: "100%" }}>
        <Typography
          variant="h5"
          sx={{ color: "white", fontWeight: "bold", mb: 1 }}
        >
          Tavsiye Edilenler
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
          Sevdiğin her şeyden biraz dinle.
        </Typography>
        <Box sx={{
          display: 'flex',
          gap: 2,
          width: '100%',
          overflowX: 'auto',
          pb: 1
        }}>
          {recommended
            .filter((item) =>
              item.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .slice(0, 5)
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
