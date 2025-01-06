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
  RadialLinearScale,
} from 'chart.js';
import { Bar, Line, Radar } from 'react-chartjs-2';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
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

const CompetitorAnalysisDashboard = () => {
  // Sample data for market share
  const marketShareData = {
    labels: ['Nike', 'Adidas', 'Puma'],
    datasets: [{
      label: 'Market Share (%)',
      data: [45, 35, 20],
      backgroundColor: ['#00695c', '#2196f3', '#ff9800'],
    }],
  };

  // Sample data for engagement rates
  const engagementRateData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Nike',
        data: [5.2, 5.5, 5.8, 6.0, 6.2, 6.5],
        borderColor: '#00695c',
        tension: 0.4,
      },
      {
        label: 'Adidas',
        data: [4.8, 5.0, 5.2, 5.4, 5.6, 5.8],
        borderColor: '#2196f3',
        tension: 0.4,
      },
      {
        label: 'Puma',
        data: [4.0, 4.2, 4.5, 4.7, 4.9, 5.1],
        borderColor: '#ff9800',
        tension: 0.4,
      },
    ],
  };

  // Sample data for sentiment comparison
  const sentimentData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        label: 'Nike',
        data: [65, 25, 10],
        backgroundColor: '#00695c',
      },
      {
        label: 'Adidas',
        data: [60, 28, 12],
        backgroundColor: '#2196f3',
      },
      {
        label: 'Puma',
        data: [55, 30, 15],
        backgroundColor: '#ff9800',
      },
    ],
  };

  // Sample data for campaign performance
  const campaignPerformanceData = {
    labels: ['Reach', 'Engagement', 'Conversion', 'Brand Awareness', 'Hashtag Usage', 'Influencer Impact'],
    datasets: [
      {
        label: 'Nike',
        data: [90, 85, 80, 88, 82, 87],
        borderColor: '#00695c',
        backgroundColor: 'rgba(0, 105, 92, 0.2)',
      },
      {
        label: 'Adidas',
        data: [85, 80, 75, 82, 78, 83],
        borderColor: '#2196f3',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
      },
      {
        label: 'Puma',
        data: [75, 70, 65, 72, 68, 73],
        borderColor: '#ff9800',
        backgroundColor: 'rgba(255, 152, 0, 0.2)',
      },
    ],
  };

  // Sample data for content strategy comparison
  const contentStrategyData = {
    labels: ['Images', 'Videos', 'Stories', 'Reels', 'Live Streams'],
    datasets: [
      {
        label: 'Nike',
        data: [85, 90, 75, 88, 70],
        backgroundColor: '#00695c',
      },
      {
        label: 'Adidas',
        data: [80, 85, 70, 82, 65],
        backgroundColor: '#2196f3',
      },
      {
        label: 'Puma',
        data: [70, 75, 65, 78, 60],
        backgroundColor: '#ff9800',
      },
    ],
  };

  return (
    <Box sx={{ p: 3 }}>
      <DashboardTitle variant="h5">
        Competitive Analysis Snapshot
      </DashboardTitle>

      {/* Overview Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <MetricCard>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
              <TrendingUpIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Market Share</Typography>
            </Box>
            <Typography variant="h4">45%</Typography>
            <Typography variant="body2">Leading the market</Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
              <PeopleIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Engagement Rate</Typography>
            </Box>
            <Typography variant="h4">6.5%</Typography>
            <Typography variant="body2">vs. Industry Avg: 4.2%</Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
              <StarIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Brand Sentiment</Typography>
            </Box>
            <Typography variant="h4">85%</Typography>
            <Typography variant="body2">Positive Mentions</Typography>
          </MetricCard>
        </Grid>
      </Grid>

      {/* Market Share Comparison */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Market Share Distribution
              </Typography>
              <Box sx={{ height: 300 }}>
                <Bar
                  data={marketShareData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </Box>
            </CardContent>
          </ChartCard>
        </Grid>

        {/* Engagement Rate Trends */}
        <Grid item xs={12} md={6}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Engagement Rate Comparison
              </Typography>
              <Box sx={{ height: 300 }}>
                <Line
                  data={engagementRateData}
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
                  }}
                />
              </Box>
            </CardContent>
          </ChartCard>
        </Grid>

        {/* Sentiment Analysis */}
        <Grid item xs={12} md={6}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sentiment Comparison
              </Typography>
              <Box sx={{ height: 300 }}>
                <Bar
                  data={sentimentData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: 'Percentage (%)'
                        }
                      }
                    },
                  }}
                />
              </Box>
            </CardContent>
          </ChartCard>
        </Grid>

        {/* Campaign Performance */}
        <Grid item xs={12} md={6}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Campaign Performance Metrics
              </Typography>
              <Box sx={{ height: 300 }}>
                <Radar
                  data={campaignPerformanceData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      r: {
                        beginAtZero: true,
                        max: 100,
                      },
                    },
                  }}
                />
              </Box>
            </CardContent>
          </ChartCard>
        </Grid>

        {/* Content Strategy Comparison */}
        <Grid item xs={12}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Content Strategy Performance
              </Typography>
              <Box sx={{ height: 300 }}>
                <Bar
                  data={contentStrategyData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: 'Performance Score'
                        }
                      }
                    },
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

export default CompetitorAnalysisDashboard;
