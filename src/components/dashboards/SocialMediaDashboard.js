import React, { useState, useEffect} from "react";
import { Box, Typography, Card, CardContent, Grid, Paper} from "@mui/material";
import { styled } from "@mui/material/styles";
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
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentIcon from "@mui/icons-material/Comment";
import AIDashboardSummary from "../AIDashboardSummary";
import { useBrand } from "../../context/BrandContext";
import { useDate } from "../../context/DateContext";

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
  color: "#fff",
  backgroundColor: "#00897b",
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

const ChartCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  height: "100%",
}));

const MetricCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
}));

const SocialMediaDashboard = () => {
  // Helper function to format numbers with K, M, B suffixes
  const formatNumber = (num) => {
    if (num === null || num === undefined) return "N/A";
    
    const absNum = Math.abs(Number(num));
    if (absNum >= 1.0e9) {
      return (absNum / 1.0e9).toFixed(2) + "B";
    } else if (absNum >= 1.0e6) {
      return (absNum / 1.0e6).toFixed(2) + "M";
    } else if (absNum >= 1.0e3) {
      return (absNum / 1.0e3).toFixed(2) + "K";
    }
    return absNum.toString();
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState({
    totalEngagement: null,
    reach: null,
    impressions: null,
    totalPosts: null
  });
  const [timeSeriesData, setTimeSeriesData] = useState({
    labels: [],
    datasets: []
  });
  const [contentPerformance, setContentPerformance] = useState({
    labels: [],
    datasets: []
  });
  const [platformPerformance, setPlatformPerformance] = useState({
    labels: [],
    datasets: []
  });
  
  // Dummy data for peak activity
  const [peakActivity] = useState({
    labels: ["6AM", "9AM", "12PM", "3PM", "6PM", "9PM"],
    datasets: [{
      label: "Engagement Level",
      data: [20, 45, 65, 85, 95, 75],
      backgroundColor: "#00695c",
      borderColor: "#00695c",
      tension: 0.4
    }]
  });
  
  const [topPosts, setTopPosts] = useState([]);  
  const [topHashtags, setTopHashtags] = useState({
    byReach: [],
    byEngagement: []
  });
  const [topCollaborators, setTopCollaborators] = useState({
    byReach: [],
    byEngagement: []
  });

  const { selectedBrand } = useBrand();
  const { getDateRange } = useDate();

  const fetchDataFromEndpoint = async (endpoint) => {
    try {
      const { startDate, endDate } = getDateRange();
      const response = await fetch(`http://localhost:8000/api/social-media/${endpoint}?brand=${encodeURIComponent(selectedBrand)}&startDate=${startDate}&endDate=${endDate}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching ${endpoint} data:`, error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [
          metricsData,
          timeSeriesResult,
          contentData,
          platformData,
          postsData,
          hashtagsData,
          collaboratorsData
        ] = await Promise.all([
          fetchDataFromEndpoint("metrics"),
          fetchDataFromEndpoint("timeseries"),
          fetchDataFromEndpoint("content-performance"),
          fetchDataFromEndpoint("platform-performance"),
          fetchDataFromEndpoint("top-posts/reach"),
          fetchDataFromEndpoint("top-hashtags"),
          fetchDataFromEndpoint("top-collaborators")
        ]);

        setMetrics(metricsData);
        setTimeSeriesData(timeSeriesResult);
        setContentPerformance(contentData);
        setPlatformPerformance(platformData);
        setTopPosts(Array.isArray(postsData) ? postsData : []);
        setTopHashtags(hashtagsData);
        setTopCollaborators(collaboratorsData);

      } catch (err) {
        setError(err.message);
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (selectedBrand) {
      fetchAllData();
    }
  }, [selectedBrand, getDateRange]);

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading dashboard data...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Error loading dashboard: {error}</Typography>
      </Box>
    );
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return formatNumber(value);
          }
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${formatNumber(context.raw)}`;
          }
        }
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <DashboardTitle variant="h5">
        Social Media Performance Tracking - {selectedBrand}
      </DashboardTitle>

      {/* Overview Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>

        <Grid item xs={12} md={4}>
          <MetricCard>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
              <VisibilityIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Reach</Typography>
            </Box>
            <Typography variant="h4">
              {metrics.reach ? formatNumber(parseFloat(metrics.reach.replace(/[KMB]/g, ""))) : "N/A"}
            </Typography>
            <Typography variant="body2">Total Viewers</Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
              <ThumbUpIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Total Engagement</Typography>
            </Box>
            <Typography variant="h4">
              {metrics.totalEngagement ? formatNumber(parseFloat(metrics.totalEngagement.replace(/[KMB]/g, ""))) : "N/A"}
            </Typography>
            <Typography variant="body2">Likes & Comments</Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
              <CommentIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Total Posts</Typography>
            </Box>
            <Typography variant="h4">
              {metrics.totalPosts ? formatNumber(parseInt(metrics.totalPosts)) : "N/A"}
            </Typography>
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
                Platform Statistics
              </Typography>
              <Box sx={{ height: 300 }}>
                <Bar
                  data={platformPerformance}

                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: "y",
                    scales: {
                      x: {
                        stacked: true,
                        ticks: {
                          callback: value => value + "%"
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
                Engagement and Reach Trends
              </Typography>
              <Box sx={{ height: 300 }}>
                <Line
                  data={timeSeriesData}
                  options={chartOptions}
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
                Performance by Content Type
              </Typography>
              <Box sx={{ height: 300 }}>
                <Bar
                  data={contentPerformance}
                  options={chartOptions}
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
                Total Engagement by Posting Time
              </Typography>
              <Box sx={{ height: 300 }}>
                <Bar
                  data={peakActivity}
                  options={chartOptions}
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
                {Array.isArray(topPosts) && topPosts.map((post, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 1,
                      borderBottom: index < topPosts.length - 1 ? "1px solid #eee" : "none"
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                    {post.platform} • {post.type}
                  </Typography>
                      <Typography variant="body2">
                        {post.caption}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {post.timestamp ? new Date(post.timestamp).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit"
                        }) : "N/A"}
                      </Typography>
                      <Typography variant="caption" color="primary.light" display="block">
                        {post.collabs} • {post.hashtags}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="primary" sx={{ ml: 2 }}>
                      {post.reach ? formatNumber(post.reach) : "N/A"} Reach
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
                {Array.isArray(topPosts) && topPosts.map((post, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 1,
                      borderBottom: index < topPosts.length - 1 ? "1px solid #eee" : "none"
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        {post.platform} • {post.type}
                      </Typography>
                      <Typography variant="body2">
                        {post.caption}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {post.timestamp ? new Date(post.timestamp).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit"
                        }) : "N/A"}
                      </Typography>
                      <Typography variant="caption" color="primary.light" display="block">
                        {post.collabs} • {post.hashtags}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="primary" sx={{ ml: 2 }}>
                      {post.engagement ? formatNumber(post.engagement) : "N/A"} engagement
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
                <Box>
                  {topHashtags.byReach.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 1,
                        borderBottom: index < topHashtags.byReach.length - 1 ? "1px solid #eee" : "none"
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
                        {formatNumber(item.reach)}
                      </Typography>
                    </Box>
                  ))}
                  {(!Array.isArray(topHashtags.byReach) || topHashtags.byReach.length === 0) && (
                    <Typography variant="body2" color="text.secondary" align="center">
                      No hashtag data available
                    </Typography>
                  )}
                </Box>
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
                <Box>
                  {topHashtags.byEngagement.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 1,
                        borderBottom: index < topHashtags.byEngagement.length - 1 ? "1px solid #eee" : "none"
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
                        {formatNumber(item.engagement)}
                      </Typography>
                    </Box>
                  ))}
                  {(!Array.isArray(topHashtags.byEngagement) || topHashtags.byEngagement.length === 0) && (
                    <Typography variant="body2" color="text.secondary" align="center">
                      No hashtag data available
                    </Typography>
                  )}
                </Box>
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
                <Box>
                  {topCollaborators.byReach.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 1,
                        borderBottom: index < topCollaborators.byReach.length - 1 ? "1px solid #eee" : "none"
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
                        {formatNumber(item.reach)}
                      </Typography>
                    </Box>
                  ))}
                  {(!Array.isArray(topCollaborators.byReach) || topCollaborators.byReach.length === 0) && (
                    <Typography variant="body2" color="text.secondary" align="center">
                      No collaborator data available
                    </Typography>
                  )}
                </Box>
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
                <Box>
                  {topCollaborators.byEngagement.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 1,
                        borderBottom: index < topCollaborators.byEngagement.length - 1 ? "1px solid #eee" : "none"
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
                        {formatNumber(item.engagement)}
                      </Typography>
                    </Box>
                  ))}
                  {(!Array.isArray(topCollaborators.byEngagement) || topCollaborators.byEngagement.length === 0) && (
                    <Typography variant="body2" color="text.secondary" align="center">
                      No collaborator data available
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </ChartCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* AI Summary Section */}
      {!loading && !error && (
        <AIDashboardSummary
          dashboardType="social"
          data={{
            metrics,
            timeSeriesData,
            contentPerformance,
            platformPerformance,
            selectedBrand: selectedBrand
          }}
          brand={selectedBrand}
        />
      )}
    </Box>
  );
};

export default SocialMediaDashboard;
