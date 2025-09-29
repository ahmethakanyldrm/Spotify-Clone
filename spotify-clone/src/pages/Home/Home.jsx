import { useSelector } from 'react-redux'
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Card,
  CardContent
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


  const renderPlaceholders = (count) => {
    const placeholders = [];
    for (let i = 0; i < count; i++) {
      placeholders.push(
        <Grid item xs={6} sm={4} md={2.4} key={`placeholder-${i}`} sx={{ width: 'auto', flex: '0 0 auto' }}>
          {/* <Box sx={{ width: 166, height: 320, visibility: 'hidden' }} /> */}
        </Grid>
      );
    }
    return placeholders;
  };

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
    <Box
      sx={{
        pt: { xs: 1, md: 3 },
        pb: { xs: 10, md: 16 },
        pl: { xs: 1, md: 3 },
        pr: { xs: 1, md: 66 },
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Yakında Çalınanlar Bölümü */}
      <Box sx={{ mb: 8, width: "100%" }}>
        <Typography
          variant="h5"
          sx={{ color: "white", fontWeight: "bold", mb: 2 }}
        >
          Yakında Çalanlar
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: "flex-start",
            width: "100%",
            margin: 0,
            flexWrap: "nowrap",
            overflowX: "auto",
          }}
        >
          {(() => {
            const filtered = recentlyPlayed
              .filter((item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .slice(0, 5);
            return (
              <>
                {filtered.map((item, index) => (
                  <Grid
                    item
                    xs={6}
                    sm={4}
                    md={2.4}
                    key={index}
                    sx={{ width: "auto", flex: "0 0 auto" }}
                  >
                    <PlaylistCard
                      title={item.title}
                      subtitle={item.subtitle || "Çalma Listesi"}
                      image={item.image}
                    />
                  </Grid>
                ))}
                {renderPlaceholders(5 - filtered.length)}
              </>
            );
          })()}
        </Grid>
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
        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: "flex-start",
            width: "100%",
            margin: 0,
            flexWrap: "nowrap",
            overflowX: "auto",
          }}
        >
          {(() => {
            const filtered = recommended
              .filter((item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .slice(0, 5);
            return (
              <>
                {filtered.map((item, index) => (
                  <Grid
                    item
                    xs={6}
                    sm={4}
                    md={2.4}
                    key={index}
                    sx={{ width: "auto", flex: "0 0 auto" }}
                  >
                    <PlaylistCard
                      title={item.title}
                      subtitle={item.description}
                      image={item.image}
                    />
                  </Grid>
                ))}
                {renderPlaceholders(5 - filtered.length)}
              </>
            );
          })()}
        </Grid>
      </Box>
    </Box>
  );
}

export default Home
