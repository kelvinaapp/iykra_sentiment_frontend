import React from "react";
import { Box, Typography, Card, CardContent, Grid, Paper } from "@mui/material";
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
import { Line, Bar, Pie } from "react-chartjs-2";
import ReactWordcloud from "react-wordcloud";
import CommentIcon from "@mui/icons-material/Comment";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

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

const SentimentDashboard = () => {
  // Sample data for platform sentiment distribution
  const platformSentimentData = {
    labels: ["Positif", "Negatif"],
    datasets: [
      {
        label: "Instagram",
        data: [45, 25],
        backgroundColor: "#E4405F",
      },
      {
        label: "TikTok",
        data: [25, 10],
        backgroundColor: "#000000",
      },
    ],
  };

  // Overview metrics
  const overviewData = {
    totalComments: 15789,
    totalPosts: 342,
    totalEngagement: 45678,
    sentimentDistribution: {
      positive: 65,
      negative: 20,
    },
  };

  // Sample data for time series sentiment
  const timeSeriesData = {
    labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
    datasets: [
      {
        label: "Positive",
        data: [65, 70, 75, 72, 78, 80, 76],
        borderColor: "#00897b",
        backgroundColor: "rgba(0, 137, 123, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Negative",
        data: [35, 30, 25, 28, 22, 20, 24],
        borderColor: "#f44336",
        backgroundColor: "rgba(244, 67, 54, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Sample data for content type sentiment
  const contentTypeSentiment = {
    labels: ["Instagram Video", "Instagram Image", "TikTok Video"],
    datasets: [
      {
        label: "Positive",
        data: [75, 65, 80],
        backgroundColor: "#00897b",
        stack: "stack0",
      },
      {
        label: "Negative",
        data: [25, 35, 20],
        backgroundColor: "#f44336",
        stack: "stack0",
      },
    ],
  };

  // Sample data for wordclouds
  const positiveWords = [
    { text: "bagus", value: 85 },
    { text: "keren", value: 78 },
    { text: "mantap", value: 72 },
    { text: "recommended", value: 68 },
    { text: "berkualitas", value: 65 },
    { text: "nyaman", value: 62 },
    { text: "memuaskan", value: 58 },
    { text: "ramah", value: 55 },
    { text: "cepat", value: 52 },
    { text: "terpercaya", value: 48 },
  ];

  const negativeWords = [
    { text: "mahal", value: 75 },
    { text: "lama", value: 68 },
    { text: "kecewa", value: 65 },
    { text: "buruk", value: 62 },
    { text: "rusak", value: 58 },
    { text: "jelek", value: 55 },
    { text: "lambat", value: 52 },
    { text: "tidak sesuai", value: 48 },
    { text: "tidak puas", value: 45 },
    { text: "tidak ramah", value: 42 },
  ];

  // Sample data for trending hashtags
  const trendingHashtags = [
    { tag: "#SustainableFashion", growth: "+245%" },
    { tag: "#LocalBrand", growth: "+182%" },
    { tag: "#OOTD", growth: "+156%" },
    { tag: "#StyleInspo", growth: "+134%" },
    { tag: "#FashionTrends", growth: "+112%" },
  ];

  // Sample data for top comments
  const topComments = [
    {
      text: "Brand lokal tapi kualitasnya udah internasional banget! 🔥 Desainnya keren, cocok buat anak muda. Keep up the good work! 👏",
      likes: 2450,
      replies: 342,
      sentiment: "positive",
      platform: "Instagram",
      timestamp: "2024-01-05 14:30",
    },
    {
      text: "Ini sih brand fashion paling aesthetic tahun ini! ✨ Tiap rilis koleksi baru selalu ditunggu. Sukses terus! 💫",
      likes: 1850,
      replies: 256,
      sentiment: "positive",
      platform: "TikTok",
      timestamp: "2024-01-04 15:45",
    },
    {
      text: "Yang bikin brand ini beda itu konsistensi kualitas sama inovasinya. Ga pernah mengecewakan! 💯",
      likes: 1620,
      replies: 189,
      sentiment: "positive",
      platform: "Instagram",
      timestamp: "2024-01-03 09:20",
    },
    {
      text: "Koleksi terbarunya keren banget! 🌟 Apalagi campaign videonya aesthetic parah. Goals banget sih! 😍",
      likes: 1480,
      replies: 167,
      sentiment: "positive",
      platform: "TikTok",
      timestamp: "2024-01-02 16:15",
    },
    {
      text: "Desainnya selalu fresh dan unik, ga pasaran. Brand lokal yang patut dibanggakan! 🙌",
      likes: 1350,
      replies: 145,
      sentiment: "positive",
      platform: "Instagram",
      timestamp: "2024-01-01 11:30",
    },
  ];

  const wordcloudOptions = {
    rotations: 0,
    rotationAngles: [0],
    fontSizes: [15, 35],
    padding: 2,
  };

  return (
    <Box sx={{ p: 3 }}>
      <DashboardTitle variant="h5">
        Social Media Sentiment Analysis
      </DashboardTitle>

      {/* Overview Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <MetricCard>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              <CommentIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Total Komentar</Typography>
            </Box>
            <Typography variant="h4">
              {overviewData.totalComments.toLocaleString()}
            </Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              <PostAddIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Total Postingan</Typography>
            </Box>
            <Typography variant="h4">
              {overviewData.totalPosts.toLocaleString()}
            </Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              <ThumbUpIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Total Engagement</Typography>
            </Box>
            <Typography variant="h4">
              {overviewData.totalEngagement.toLocaleString()}
            </Typography>
          </MetricCard>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Sentiment Distribution */}
        <Grid item xs={12} md={3}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Distribusi Sentimen
              </Typography>
              <Box sx={{ height: 300 }}>
                <Pie
                  data={{
                    labels: ["Positif", "Negatif"],
                    datasets: [
                      {
                        data: [
                          overviewData.sentimentDistribution.positive,
                          overviewData.sentimentDistribution.negative,
                        ],
                        backgroundColor: ["#00897b", "#f44336"],
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </Box>
            </CardContent>
          </ChartCard>
        </Grid>

        {/* Time Series Sentiment */}
        <Grid item xs={12} md={9}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Trend Sentimen
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
                        max: 100,
                        ticks: {
                          callback: (value) => value + "%",
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        position: "top",
                      },
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            return `${context.dataset.label}: ${context.raw}%`;
                          },
                        },
                      },
                    },
                  }}
                />
              </Box>
            </CardContent>
          </ChartCard>
        </Grid>

        {/* Platform Sentiment */}
        <Grid item xs={12} md={6}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sentimen per Platform
              </Typography>
              <Box sx={{ height: 300 }}>
                <Bar
                  data={platformSentimentData}
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

        {/* Content Type Sentiment */}
        <Grid item xs={12} md={6}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sentimen berdasarkan Jenis Konten
              </Typography>
              <Box sx={{ height: 300 }}>
                <Bar
                  data={contentTypeSentiment}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        grid: {
                          display: false,
                        },
                      },
                      y: {
                        stacked: true,
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                          callback: (value) => value + "%",
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        position: "top",
                      },
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            return `${context.dataset.label}: ${context.raw}%`;
                          },
                        },
                      },
                    },
                  }}
                />
              </Box>
            </CardContent>
          </ChartCard>
        </Grid>

        {/* Wordclouds and Trending Hashtags */}
        <Grid item xs={12} md={4}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Top 10 Positive Keywords
              </Typography>
              <Box sx={{ height: 300 }}>
                <ReactWordcloud
                  words={positiveWords}
                  options={wordcloudOptions}
                />
              </Box>
            </CardContent>
          </ChartCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom color="error">
                Top 10 Negative Keywords
              </Typography>
              <Box sx={{ height: 300 }}>
                <ReactWordcloud
                  words={negativeWords}
                  options={wordcloudOptions}
                />
              </Box>
            </CardContent>
          </ChartCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Trending Hashtags
              </Typography>
              <Box sx={{ mt: 2 }}>
                {trendingHashtags.map((hashtag, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 1.5,
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "primary.main",
                        fontWeight: 500,
                      }}
                    >
                      {hashtag.tag}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "success.main",
                        fontWeight: "bold",
                      }}
                    >
                      {hashtag.growth}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </ChartCard>
        </Grid>

        {/* Top Comments */}
        <Grid item xs={12}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Top 5 Komentar dengan Sentiment Tertinggi
              </Typography>
              {topComments.map((comment, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                    py: 2,
                    borderBottom:
                      index < topComments.length - 1
                        ? "1px solid #eee"
                        : "none",
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        color:
                          comment.sentiment === "positive"
                            ? "primary.main"
                            : "error.main",
                        mb: 0.5,
                      }}
                    >
                      {comment.text}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {comment.platform} •{" "}
                      {new Date(comment.timestamp).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography
                      variant="body2"
                      color="primary"
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      {comment.likes.toLocaleString()} likes
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      {comment.replies.toLocaleString()} replies
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </ChartCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SentimentDashboard;
