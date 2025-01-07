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
  RadialLinearScale,
} from 'chart.js';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import GaugeChart from 'react-gauge-chart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

const DashboardTitle = styled(Typography)(({ theme }) => ({
  color: '#1a237e',
  borderBottom: `2px solid ${theme.palette.primary.main}`,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

const ChartCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  height: '100%',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}));

const MetricCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    transform: 'translateY(-2px)',
    transition: 'transform 0.3s ease-in-out',
  },
}));

const CampaignDashboard = () => {
  // Campaign Overview Data
  const campaignInfo = {
    name: 'Summer Collection 2024',
    budget: '$50,000',
    reach: '2.5M',
    targetEngagement: 0.75, // 75% of target
    actualEngagement: 0.65, // 65% achieved
  };

  // Performance Metrics
  const metrics = {
    cpe: '$1.25',
    ctr: '4.2%',
    conversionRate: '2.8%',
    revenueGenerated: '$150,000',
    roi: '200%',
  };

  // Platform Performance Data
  const platformData = {
    labels: ['Facebook', 'Instagram', 'TikTok', 'Twitter', 'LinkedIn'],
    datasets: [{
      label: 'Engagement Rate',
      data: [4.2, 5.1, 6.3, 3.8, 2.9],
      backgroundColor: [
        '#4267B2',
        '#E1306C',
        '#69C9D0',
        '#1DA1F2',
        '#0077B5',
      ],
    }],
  };

  // Engagement Trend Data
  const engagementTrendData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [{
      label: 'Engagement',
      data: [1200, 1900, 2100, 2800, 2400, 2900],
      borderColor: '#3f51b5',
      tension: 0.4,
      fill: false,
    }],
  };

  // Sentiment Analysis Data
  const sentimentData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [{
      data: [65, 25, 10],
      backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
    }],
  };

  // Demographics Data
  const ageGroupData = {
    labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
    datasets: [{
      label: 'Age Distribution',
      data: [25, 35, 20, 15, 5],
      backgroundColor: [
        '#7986cb',
        '#64b5f6',
        '#4fc3f7',
        '#4dd0e1',
        '#4db6ac',
      ],
    }],
  };

  return (
    <Box sx={{ p: 3 }}>
      <DashboardTitle variant="h4">
        Campaign Performance Dashboard
      </DashboardTitle>

      {/* Campaign Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <MetricCard>
            <Typography variant="h6">Campaign Name</Typography>
            <Typography variant="h5">{campaignInfo.name}</Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard>
            <Typography variant="h6">Total Budget</Typography>
            <Typography variant="h5">{campaignInfo.budget}</Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard>
            <Typography variant="h6">Total Reach</Typography>
            <Typography variant="h5">{campaignInfo.reach}</Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard>
            <Typography variant="h6">Engagement Progress</Typography>
            <Box sx={{ width: '100%', mt: 2 }}>
              <GaugeChart
                id="engagement-gauge"
                nrOfLevels={3}
                percent={campaignInfo.actualEngagement}
                colors={['#ff0000', '#ffbf00', '#00ff00']}
              />
            </Box>
          </MetricCard>
        </Grid>
      </Grid>

      {/* Performance Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={2.4}>
          <MetricCard>
            <Typography variant="h6">CPE</Typography>
            <Typography variant="h5">{metrics.cpe}</Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={2.4}>
          <MetricCard>
            <Typography variant="h6">CTR</Typography>
            <Typography variant="h5">{metrics.ctr}</Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={2.4}>
          <MetricCard>
            <Typography variant="h6">Conversion Rate</Typography>
            <Typography variant="h5">{metrics.conversionRate}</Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={2.4}>
          <MetricCard>
            <Typography variant="h6">Revenue</Typography>
            <Typography variant="h5">{metrics.revenueGenerated}</Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={2.4}>
          <MetricCard>
            <Typography variant="h6">ROI</Typography>
            <Typography variant="h5">{metrics.roi}</Typography>
          </MetricCard>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        {/* Platform Performance */}
        <Grid item xs={12} md={6}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Platform Performance
              </Typography>
              <Box sx={{ height: 300 }}>
                <Bar
                  data={platformData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              </Box>
            </CardContent>
          </ChartCard>
        </Grid>

        {/* Engagement Trend */}
        <Grid item xs={12} md={6}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Engagement Trend
              </Typography>
              <Box sx={{ height: 300 }}>
                <Line
                  data={engagementTrendData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
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
                Sentiment Analysis
              </Typography>
              <Box sx={{ height: 300 }}>
                <Doughnut
                  data={sentimentData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </Box>
            </CardContent>
          </ChartCard>
        </Grid>

        {/* Age Demographics */}
        <Grid item xs={12} md={6}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Age Demographics
              </Typography>
              <Box sx={{ height: 300 }}>
                <Pie
                  data={ageGroupData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
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
