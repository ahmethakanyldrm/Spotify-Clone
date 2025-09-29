import { useSelector } from 'react-redux';
import { Box, Typography, Grid } from '@mui/material';

const Browse = () => {
  const { searchQuery } = useSelector((state) => state.spotify);
  const imageUrl = 'https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb';
  const categories = [
    { title: 'Müzik', color: 'rgb(220, 20, 140)', image: imageUrl },
    { title: 'Podcast\'ler', color: 'rgb(39, 133, 106)', image: imageUrl },
    { title: 'Canlı Etkinlikler', color: 'rgb(115, 88, 255)', image: imageUrl },
    { title: 'Senin için Hazırlandı', color: 'rgb(30, 50, 100)', image: imageUrl },
    { title: 'Yeni Çıkanlar', color: 'rgb(232, 17, 91)', image: imageUrl },
    { title: 'Pop', color: 'rgb(240, 55, 165)', image: imageUrl },
    { title: 'Hip Hop', color: 'rgb(188, 89, 0)', image: imageUrl },
    { title: 'Ruh Hali', color: 'rgb(141, 103, 171)', image: imageUrl },
    { title: 'Dans ve Elektronik', color: 'rgb(220, 20, 140)', image: imageUrl },
    { title: 'Listeler', color: 'rgb(13, 115, 236)', image: imageUrl },
    { title: 'Rock', color: 'rgb(230, 30, 50)', image: imageUrl },
    { title: 'Indie', color: 'rgb(175, 40, 150)', image: imageUrl },
    { title: 'Eğitim', color: 'rgb(71, 125, 149)', image: imageUrl },
    { title: 'Belgesel', color: 'rgb(119, 83, 119)', image: imageUrl },
    { title: 'Komedi', color: 'rgb(180, 80, 180)', image: imageUrl },
    { title: 'Country', color: 'rgb(215, 80, 0)', image: imageUrl },
    { title: 'Fitness', color: 'rgb(125, 125, 125)', image: imageUrl },
    { title: 'Keşfet', color: 'rgb(140, 100, 170)', image: imageUrl },
    { title: 'RnB', color: 'rgb(188, 89, 0)', image: imageUrl },
    { title: 'K-pop', color: 'rgb(220, 20, 60)', image: imageUrl },
    { title: 'Chill', color: 'rgb(180, 120, 90)', image: imageUrl },
    { title: 'Uyku', color: 'rgb(30, 50, 100)', image: imageUrl },
  ];

  return (
    <Box sx={{ 
      p: { xs: 1, md: 3 },
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Typography 
        variant="h4" 
        sx={{ 
          color: 'white', 
          fontWeight: 'bold', 
          mb: 4,
          fontSize: { xs: '1.5rem', md: '2rem' }
        }}
      >
        Hepsine göz at
      </Typography>
      <Grid container spacing={2} sx={{ width: '100%' }}>
        {categories
          .filter((category) =>
            category.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((category) => (
          <Grid item xs={6} sm={4} md={3} lg={2.4} xl={2} key={category.title}>
            <Box
              sx={{
                backgroundColor: category.color,
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative',
                height: '187px',
                width: '315px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                p: '12px',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
                }
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {category.title}
              </Typography>
              <Box
                component="img"
                src={category.image}
                alt={category.title}
                sx={{
                  position: 'absolute',
                  right: '-15px',
                  bottom: '-15px',
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  transform: 'rotate(25deg)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                  zIndex: 0,
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Browse;
