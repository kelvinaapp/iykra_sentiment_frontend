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
import { Line, Bar} from 'react-chartjs-2';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CommentIcon from '@mui/icons-material/Comment';

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
  backgroundColor: '#00897b',
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

const SocialMediaDashboard = () => {
  // Sample data for engagement metrics
  const engagementData = {
    totalEngagement: '125.4K',
    reach: '500.2K',
    impressions: '750.5K',
    totalPosts: '342'
  };

  // Sample data for engagement over time
  const timeSeriesData = {
    labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
    datasets: [
      {
        label: 'Engagement',
        data: [15000, 17500, 16800, 18900, 21000, 23500, 15000],
        borderColor: '#4caf50',
        tension: 0.4,
      },
      {
        label: 'Reach',
        data: [45000, 48000, 47000, 52000, 55000, 58000, 45000],
        borderColor: '#2196f3',
        tension: 0.4,
      },
    ],
  };

  // Sample data for content performance
  const contentPerformanceData = {
    labels: ['Video', 'Image'],
    datasets: [
      {
        label: 'Engagement Rate',
        data: [8.5, 5.2],
        backgroundColor: '#00695c',
      },
      {
        label: 'Reach Rate',
        data: [12.5, 8.5],
        backgroundColor: '#2196f3',
      },
    ],
  };

  // Sample data for platform performance
  const platformPerformanceData = {
    labels: ['Reach', 'Engagement',],
    datasets: [
      {
        label: 'Instagram',
        data: [45, 60],
        backgroundColor: '#E4405F',
      },
      {
        label: 'TikTok',
        data: [55, 40],
        backgroundColor: '#000000',
      },
    ],
  };

  // Sample data for peak activity times
  const peakActivityData = {
    labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
    datasets: [{
      label: 'Engagement Level',
      data: [20, 45, 65, 85, 95, 75],
      backgroundColor: '#00695c',
    }],
  };

  // Sample data for top posts by reach
  const topReachPosts = [
    {
      caption: "New Collection Summer 2024!",
      type: "Video",
      timestamp: "2024-01-05 14:30",
      reach: 25000,
      platform: "Instagram",
      collab: "@sportstation",
      hashtags: "#NewCollection #SummerFashion"
    },
    {
      caption: "Behind the scenes photoshoot",
      type: "Image",
      timestamp: "2024-01-04 10:15",
      reach: 22000,
      platform: "Instagram",
      collab: "@rossie",
      hashtags: "#BTS #FashionPhotography"
    },
    {
      caption: "Limited Edition Release Today",
      type: "Video",
      timestamp: "2024-01-03 16:45",
      reach: 20000,
      platform: "TikTok",
      collab: "@fashionweek",
      hashtags: "#LimitedEdition #Fashion"
    },
    {
      caption: "Style tips for winter season",
      type: "Image",
      timestamp: "2024-01-02 09:00",
      reach: 18500,
      platform: "Instagram",
      collab: "@styleinfluencer",
      hashtags: "#StyleTips #WinterFashion"
    },
    {
      caption: "Customer review highlights",
      type: "Video",
      timestamp: "2024-01-01 13:20",
      reach: 17800,
      platform: "TikTok",
      collab: "@fashionblogger",
      hashtags: "#Review #CustomerStories"
    }
  ];

  // Sample data for top posts by engagement
  const topEngagementPosts = [
    {
      caption: "Giveaway announcement!",
      type: "Image",
      timestamp: "2024-01-05 15:00",
      engagement: 12000,
      platform: "Instagram",
      collab: "@influencer",
      hashtags: "#Giveaway #Contest"
    },
    {
      caption: "Product tutorial video",
      type: "Video",
      timestamp: "2024-01-04 11:30",
      engagement: 10500,
      platform: "TikTok",
      collab: "@beautyguru",
      hashtags: "#Tutorial #HowTo"
    },
    {
      caption: "Customer success story",
      type: "Video",
      timestamp: "2024-01-03 14:20",
      engagement: 9800,
      platform: "Instagram",
      collab: "@customerstory",
      hashtags: "#Success #Testimonial"
    },
    {
      caption: "New product teaser",
      type: "Video",
      timestamp: "2024-01-02 16:15",
      engagement: 9200,
      platform: "TikTok",
      collab: "@productreview",
      hashtags: "#ComingSoon #Teaser"
    },
    {
      caption: "Fashion tips and tricks",
      type: "Image",
      timestamp: "2024-01-01 10:45",
      engagement: 8900,
      platform: "Instagram",
      collab: "@fashionista",
      hashtags: "#FashionTips #Style"
    }
  ];

  // Sample data for top hashtags by reach
  const topHashtagsByReach = [
    { tag: "#NewCollection", reach: 125000, count: 458 },
    { tag: "#SummerFashion", reach: 98000, count: 325 },
    { tag: "#StyleTips", reach: 85000, count: 289 },
    { tag: "#FashionTrends", reach: 76000, count: 234 },
    { tag: "#OOTD", reach: 72000, count: 567 }
  ];

  // Sample data for top hashtags by engagement
  const topHashtagsByEngagement = [
    { tag: "#Giveaway", engagement: 45000, count: 156 },
    { tag: "#Contest", engagement: 38000, count: 123 },
    { tag: "#LimitedEdition", engagement: 32000, count: 245 },
    { tag: "#Fashion", engagement: 28000, count: 678 },
    { tag: "#Style", engagement: 25000, count: 432 }
  ];

  // Sample data for top collaborators by reach
  const topCollabsByReach = [
    { tag: "@sportstation", reach: 250000, posts: 12 },
    { tag: "@rossie", reach: 180000, posts: 8 },
    { tag: "@fashionweek", reach: 165000, posts: 15 },
    { tag: "@styleinfluencer", reach: 142000, posts: 10 },
    { tag: "@fashionblogger", reach: 138000, posts: 18 }
  ];

  // Sample data for top collaborators by engagement
  const topCollabsByEngagement = [
    { tag: "@influencer", engagement: 85000, posts: 8 },
    { tag: "@beautyguru", engagement: 72000, posts: 12 },
    { tag: "@fashionista", engagement: 68000, posts: 15 },
    { tag: "@customerstory", engagement: 65000, posts: 6 },
    { tag: "@productreview", engagement: 58000, posts: 9 }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <DashboardTitle variant="h5">
        Social Media Performance Tracking
      </DashboardTitle>

      {/* Overview Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>

        <Grid item xs={12} md={4}>
          <MetricCard>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
              <VisibilityIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Reach</Typography>
            </Box>
            <Typography variant="h4">{engagementData.reach}</Typography>
            <Typography variant="body2">Total Viewers</Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
              <ThumbUpIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Total Engagement</Typography>
            </Box>
            <Typography variant="h4">{engagementData.totalEngagement}</Typography>
            <Typography variant="body2">Likes & Comments</Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
              <CommentIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Total Posts</Typography>
            </Box>
            <Typography variant="h4">{engagementData.totalPosts}</Typography>
            <Typography variant="body2">All Content Types</Typography>
          </MetricCard>
        </Grid>
      </Grid>



      {/* Engagement Trends */}
      <Grid container spacing={3}>
        {/* Platform Distribution */}
        <Grid item xs={12} md={4}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Statistik Platform
              </Typography>
              <Box sx={{ height: 300 }}>
                <Bar
                  data={platformPerformanceData}

                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    scales: {
                      x: {
                        stacked: true,
                        ticks: {
                          callback: value => value + '%'
                        }
                      },
                      y: {
                        stacked: true,
                      }
                    },
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            return `${context.dataset.label}: ${context.raw}%`;
                          }
                        }
                      }
                    }
                  }}
                />
              </Box>
            </CardContent>
          </ChartCard>
        </Grid>

        <Grid item xs={12} md={8}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Trend Engagement dan Reach
              </Typography>
              <Box sx={{ height: 300 }}>
                <Line
                  data={timeSeriesData}
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

        {/* Content Performance */}
        <Grid item xs={12} md={4}>
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
                          text: 'Rate (%)'
                        }
                      }
                    },
                  }}
                />
              </Box>
            </CardContent>
          </ChartCard>
        </Grid>

        {/* Peak Activity Times */}
        <Grid item xs={12} md={8}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Engagement per Waktu Posting
              </Typography>
              <Box sx={{ height: 300 }}>
                <Bar
                  data={peakActivityData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </Box>
            </CardContent>
          </ChartCard>
        </Grid>

        {/* Top Posts by Reach */}
        <Grid item xs={12} md={6}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Top 5 Posts by Reach
              </Typography>
              <Box>
                {topReachPosts.map((post, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      py: 1,
                      borderBottom: index < topReachPosts.length - 1 ? '1px solid #eee' : 'none'
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        {post.platform} • {post.type}
                      </Typography>
                      <Typography variant="body2" noWrap sx={{ maxWidth: '200px' }}>
                        {post.caption}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {new Date(post.timestamp).toLocaleDateString('id-ID', { 
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </Typography>
                      <Typography variant="caption" color="primary.light" display="block">
                        {post.collab} • {post.hashtags}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="primary" sx={{ ml: 2 }}>
                      {post.reach.toLocaleString()} reach
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </ChartCard>
        </Grid>

        {/* Top Posts by Engagement */}
        <Grid item xs={12} md={6}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Top 5 Posts by Engagement
              </Typography>
              <Box>
                {topEngagementPosts.map((post, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      py: 1,
                      borderBottom: index < topEngagementPosts.length - 1 ? '1px solid #eee' : 'none'
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        {post.platform} • {post.type}
                      </Typography>
                      <Typography variant="body2" noWrap sx={{ maxWidth: '200px' }}>
                        {post.caption}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {new Date(post.timestamp).toLocaleDateString('id-ID', { 
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </Typography>
                      <Typography variant="caption" color="primary.light" display="block">
                        {post.collab} • {post.hashtags}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="primary" sx={{ ml: 2 }}>
                      {post.engagement.toLocaleString()} engagement
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </ChartCard>
        </Grid>

        {/* Top Hashtags and Collaborators Section */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {/* Top Hashtags by Reach */}
            <Grid item xs={12} md={3}>
              <ChartCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Top Hashtags by Reach
                  </Typography>
                  {topHashtagsByReach.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 1,
                        borderBottom: index < topHashtagsByReach.length - 1 ? '1px solid #eee' : 'none'
                      }}
                    >
                      <Box>
                        <Typography variant="body2" color="primary">
                          {item.tag}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.count} posts
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        {(item.reach / 1000).toFixed(1)}K
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </ChartCard>
            </Grid>

            {/* Top Hashtags by Engagement */}
            <Grid item xs={12} md={3}>
              <ChartCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Top Hashtags by Engagement
                  </Typography>
                  {topHashtagsByEngagement.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 1,
                        borderBottom: index < topHashtagsByEngagement.length - 1 ? '1px solid #eee' : 'none'
                      }}
                    >
                      <Box>
                        <Typography variant="body2" color="primary">
                          {item.tag}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.count} posts
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        {(item.engagement / 1000).toFixed(1)}K
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </ChartCard>
            </Grid>

            {/* Top Collaborators by Reach */}
            <Grid item xs={12} md={3}>
              <ChartCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Top Collaborators by Reach
                  </Typography>
                  {topCollabsByReach.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 1,
                        borderBottom: index < topCollabsByReach.length - 1 ? '1px solid #eee' : 'none'
                      }}
                    >
                      <Box>
                        <Typography variant="body2" color="primary">
                          {item.tag}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.posts} posts
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        {(item.reach / 1000).toFixed(1)}K
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </ChartCard>
            </Grid>

            {/* Top Collaborators by Engagement */}
            <Grid item xs={12} md={3}>
              <ChartCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Top Collaborators by Engagement
                  </Typography>
                  {topCollabsByEngagement.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 1,
                        borderBottom: index < topCollabsByEngagement.length - 1 ? '1px solid #eee' : 'none'
                      }}
                    >
                      <Box>
                        <Typography variant="body2" color="primary">
                          {item.tag}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.posts} posts
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        {(item.engagement / 1000).toFixed(1)}K
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </ChartCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SocialMediaDashboard;
