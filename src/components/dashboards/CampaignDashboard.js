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

const MetricCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
}));

const CampaignDashboard = () => {
  // Sample data for metrics
  const metrics = {
    engagementRate: '8.5%',
    conversionRate: '2.3%',
    totalReach: '1.2M',
    roi: '350%'
  };

  // Sample data for platform performance
  const platformPerformanceData = {
    labels: ['Instagram', 'Facebook', 'TikTok', 'Threads'],
    datasets: [
      {
        label: 'Engagement Rate',
        data: [4.2, 3.8, 5.1, 2.9],
        backgroundColor: '#4caf50',
      },
      {
        label: 'Conversion Rate',
        data: [1.8, 1.5, 2.2, 1.1],
        backgroundColor: '#2196f3',
      },
    ],
  };

  // Sample data for campaign performance over time
  const campaignTimeData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Engagement Rate',
        data: [3.2, 3.8, 4.5, 4.2, 4.8, 5.1],
        borderColor: '#4caf50',
        tension: 0.4,
        fill: false,
      },
      {
        label: 'Conversion Rate',
        data: [1.2, 1.5, 1.8, 1.6, 2.0, 2.3],
        borderColor: '#2196f3',
        tension: 0.4,
        fill: false,
      },
    ],
  };

  // Sample data for content performance
  const contentPerformanceData = {
    labels: ['Video', 'Image', 'Carousel', 'Story', 'Reels'],
    datasets: [
      {
        label: 'Engagement Rate',
        data: [5.2, 4.1, 4.8, 3.9, 5.5],
        backgroundColor: '#4caf50',
      }
    ],
  };

  return (
    <Box sx={{ p: 3 }}>
      <DashboardTitle variant="h5">
        Analisis Performa Campaign
      </DashboardTitle>

      {/* Overview Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <MetricCard>
            <Typography variant="h6">Total Reach</Typography>
            <Typography variant="h4">{metrics.totalReach}</Typography>
            <Typography variant="body2">Audiens yang melihat campaign</Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard>
            <Typography variant="h6">Engagement Rate</Typography>
            <Typography variant="h4">{metrics.engagementRate}</Typography>
            <Typography variant="body2">Interaksi / Reach</Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard>
            <Typography variant="h6">Conversion Rate</Typography>
            <Typography variant="h4">{metrics.conversionRate}</Typography>
            <Typography variant="body2">Konversi / Total Reach</Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard>
            <Typography variant="h6">ROI Campaign</Typography>
            <Typography variant="h4">{metrics.roi}</Typography>
            <Typography variant="body2">Return on Investment</Typography>
          </MetricCard>
        </Grid>
      </Grid>

      {/* Platform Performance */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Performa di Platform
              </Typography>
              <Box sx={{ height: 300 }}>
                <Bar
                  data={platformPerformanceData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: 'Rate (%)'
                        }
                      }
                    },
                    plugins: {
                      legend: {
                        position: 'top',
                      }
                    }
                  }}
                />
              </Box>
            </CardContent>
          </ChartCard>
        </Grid>

        {/* Campaign Performance Over Time */}
        <Grid item xs={12} md={6}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Performa Campaign Over Time
              </Typography>
              <Box sx={{ height: 300 }}>
                <Line
                  data={campaignTimeData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: 'Rate (%)'
                        }
                      }
                    },
                    plugins: {
                      legend: {
                        position: 'top',
                      }
                    }
                  }}
                />
              </Box>
            </CardContent>
          </ChartCard>
        </Grid>

        {/* Content Performance */}
        <Grid item xs={12}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Performa Berdasarkan Jenis Konten
              </Typography>
              <Box sx={{ height: 300 }}>
                <Bar
                  data={contentPerformanceData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: 'Engagement Rate (%)'
                        }
                      }
                    },
                    plugins: {
                      legend: {
                        position: 'top',
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

export default CampaignDashboard;
