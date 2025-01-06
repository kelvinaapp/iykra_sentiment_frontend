import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import SearchIcon from '@mui/icons-material/Search';
import TimelineIcon from '@mui/icons-material/Timeline';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashboardTitle = styled(Typography)(({ theme }) => ({
  color: '#fff',
  backgroundColor: '#00695c',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

const ChartCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  height: '100%',
}));

const TrendCard = styled(Paper)(({ theme, trending }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: trending === 'up' ? '#e8f5e9' : trending === 'down' ? '#ffebee' : '#fff',
}));

const MarketTrendDashboard = () => {
  // Sample data for trend analysis
  const trendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sustainable Fashion',
        data: [30, 45, 55, 65, 75, 85],
        borderColor: '#4caf50',
        tension: 0.4,
      },
      {
        label: 'Seasonal Colors',
        data: [40, 35, 45, 50, 65, 70],
        borderColor: '#2196f3',
        tension: 0.4,
      },
    ],
  };

  const searchVolumeData = {
    labels: ['#sustainable', '#ecofashion', '#vintage', '#minimal', '#streetwear'],
    datasets: [{
      label: 'Search Volume',
      data: [85, 72, 65, 55, 45],
      backgroundColor: '#00695c',
    }],
  };

  const demographicTrendData = {
    labels: ['Gen Z', 'Millennials', 'Gen X', 'Boomers'],
    datasets: [
      {
        label: 'Sustainable Fashion Interest',
        data: [80, 65, 45, 30],
        backgroundColor: '#4caf50',
      },
      {
        label: 'Fast Fashion Interest',
        data: [40, 45, 55, 60],
        backgroundColor: '#f44336',
      },
    ],
  };

  return (
    <Box sx={{ p: 3 }}>
      <DashboardTitle variant="h5">
        Tren dan Prediksi Pasar
      </DashboardTitle>

      <Grid container spacing={3}>
        {/* Current Trends */}
        <Grid item xs={12} md={6}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Topik Populer di Industri
              </Typography>
              <Box sx={{ height: 300 }}>
                <Line
                  data={trendData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: 'Popularity Score'
                        }
                      }
                    }
                  }}
                />
              </Box>
            </CardContent>
          </ChartCard>
        </Grid>

        {/* Search Volume Analysis */}
        <Grid item xs={12} md={6}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Volume Pencarian & Hashtag Populer
              </Typography>
              <Box sx={{ height: 300 }}>
                <Bar
                  data={searchVolumeData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                  }}
                />
              </Box>
            </CardContent>
          </ChartCard>
        </Grid>

        {/* Trend Cards */}
        <Grid item xs={12} md={4}>
          <TrendCard trending="up">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TrendingUpIcon color="success" />
              <Typography variant="h6" sx={{ ml: 1 }}>Trending Up</Typography>
            </Box>
            <Typography variant="body1" gutterBottom>• Sustainable Fashion</Typography>
            <Typography variant="body1" gutterBottom>• Minimalist Style</Typography>
            <Typography variant="body1">• Earth-tone Colors</Typography>
          </TrendCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <TrendCard trending="down">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TrendingDownIcon color="error" />
              <Typography variant="h6" sx={{ ml: 1 }}>Trending Down</Typography>
            </Box>
            <Typography variant="body1" gutterBottom>• Fast Fashion</Typography>
            <Typography variant="body1" gutterBottom>• Neon Colors</Typography>
            <Typography variant="body1">• Oversized Logos</Typography>
          </TrendCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <TrendCard>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TimelineIcon color="primary" />
              <Typography variant="h6" sx={{ ml: 1 }}>Predictions</Typography>
            </Box>
            <Typography variant="body1" gutterBottom>• Rise in Eco-friendly Materials</Typography>
            <Typography variant="body1" gutterBottom>• Growth in Second-hand Market</Typography>
            <Typography variant="body1">• Increase in Local Brands</Typography>
          </TrendCard>
        </Grid>

        {/* Demographic Analysis */}
        <Grid item xs={12}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tren berdasarkan Demografi
              </Typography>
              <Box sx={{ height: 300 }}>
                <Bar
                  data={demographicTrendData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: 'Interest Level (%)'
                        }
                      }
                    }
                  }}
                />
              </Box>
            </CardContent>
          </ChartCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MarketTrendDashboard;
