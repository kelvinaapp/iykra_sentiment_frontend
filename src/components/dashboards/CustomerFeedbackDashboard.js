import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ReactWordcloud from 'react-wordcloud';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const DashboardTitle = styled(Typography)(({ theme }) => ({
  color: '#fff',
  backgroundColor: '#00897b',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
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

const ChartCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  height: '100%',
}));


const CustomerFeedbackDashboard = () => {
  // Filter states
  const [filterCategory, setFilterCategory] = useState('Jenis Bahan');
  const [selectedProduct, setSelectedProduct] = useState('adidas Men\'s Grand Court 2.0');

  // Filter options
  const filterCategories = ['Jenis Bahan', 'Material Sol', 'Asal Produk', 'Target Gender'];

  // Product list
  const products = [
    'adidas Men\'s Daily 4.0 Shoes',
    'adidas Men\'s Grand Court 2.0',
    'adidas Men\'s Samba Classic Soccer Shoes',
    'adidas Men\'s Ultraboost 1.0 Shoe',
    'adidas Women\'s Cloudfoam Pure Sportswear',
    'adidas Women\'s Kaptur Flow Sneaker',
    'adidas Women\'s VL Court 3.0'
  ];

  // Overview stats
  const stats = {
    totalPosts: 50,
    totalReviews: 1250,
    positiveCount: 813,
    negativeCount: 437,
  };

  // Sample data for sentiment distribution
  const sentimentData = {
    labels: ['Positive', 'Negative'],
    datasets: [{
      data: [stats.positiveCount, stats.negativeCount],
      backgroundColor: ['#00897b', '#f44336'],
    }],
  };

  // Sample data for aspect sentiment
  const aspectSentimentData = {
    labels: ['Kenyamanan', 'Harga', 'Kualitas', 'Desain'],
    datasets: [
      {
        label: 'Positive',
        data: [80, 65, 75, 70],
        backgroundColor: '#00897b',
        stack: 'Stack 0',
      },
      {
        label: 'Negative',
        data: [20, 35, 25, 30],
        backgroundColor: '#f44336',
        stack: 'Stack 0',
      }
    ],
  };

  // Sample data for category volume
  const categoryData = {
    labels: ['Produk', 'Layanan', 'Pengiriman'],
    datasets: [{
      label: 'Total Reviews',
      data: [150, 200, 180],
      backgroundColor: '#2196f3',
    }],
  };

  // Sample data for word clouds
  const wordCloudData = {
    positive: [
      { text: 'Comfortable', value: 85 },
      { text: 'Stylish', value: 78 },
      { text: 'Durable', value: 72 },
      { text: 'Quality', value: 68 },
      { text: 'Affordable', value: 65 },
      { text: 'Lightweight', value: 60 },
      { text: 'Fashionable', value: 55 },
      { text: 'Elegant', value: 50 },
      { text: 'Perfect', value: 48 },
      { text: 'Recommended', value: 45 }
    ],
    negative: [
      { text: 'Expensive', value: 75 },
      { text: 'Uncomfortable', value: 70 },
      { text: 'Poor Quality', value: 65 },
      { text: 'Heavy', value: 60 },
      { text: 'Tight', value: 55 },
      { text: 'Overpriced', value: 50 },
      { text: 'Defective', value: 45 },
      { text: 'Stiff', value: 40 },
      { text: 'Disappointing', value: 38 },
      { text: 'Unreliable', value: 35 }
    ]
  };

  // Sample data for product sentiment by aspect
  const productSentimentData = {
    'adidas Men\'s Daily 4.0 Shoes': {
      comfort: { positive: 85, negative: 15 },
      quality: { positive: 80, negative: 20 },
      durability: { positive: 75, negative: 25 },
      design: { positive: 90, negative: 10 }
    },
    'adidas Men\'s Grand Court 2.0': {
      comfort: { positive: 88, negative: 12 },
      quality: { positive: 85, negative: 15 },
      durability: { positive: 82, negative: 18 },
      design: { positive: 87, negative: 13 }
    },
    'adidas Men\'s Samba Classic Soccer Shoes': {
      comfort: { positive: 80, negative: 20 },
      quality: { positive: 85, negative: 15 },
      durability: { positive: 90, negative: 10 },
      design: { positive: 85, negative: 15 }
    },
    'adidas Men\'s Ultraboost 1.0 Shoe': {
      comfort: { positive: 92, negative: 8 },
      quality: { positive: 88, negative: 12 },
      durability: { positive: 85, negative: 15 },
      design: { positive: 90, negative: 10 }
    },
    'adidas Women\'s Cloudfoam Pure Sportswear': {
      comfort: { positive: 90, negative: 10 },
      quality: { positive: 85, negative: 15 },
      durability: { positive: 80, negative: 20 },
      design: { positive: 88, negative: 12 }
    },
    'adidas Women\'s Kaptur Flow Sneaker': {
      comfort: { positive: 85, negative: 15 },
      quality: { positive: 82, negative: 18 },
      durability: { positive: 78, negative: 22 },
      design: { positive: 86, negative: 14 }
    },
    'adidas Women\'s VL Court 3.0': {
      comfort: { positive: 86, negative: 14 },
      quality: { positive: 84, negative: 16 },
      durability: { positive: 80, negative: 20 },
      design: { positive: 85, negative: 15 }
    }
  };

  const wordcloudOptions = {
    colors: ['#00897b', '#26a69a', '#4db6ac', '#80cbc4'],
    enableTooltip: true,
    deterministic: false,
    fontFamily: 'impact',
    fontSizes: [20, 60],
    fontStyle: 'normal',
    fontWeight: 'normal',
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90],
    scale: 'sqrt',
    spiral: 'archimedean',
    transitionDuration: 1000
  };

  const negativeWordcloudOptions = {
    ...wordcloudOptions,
    colors: ['#f44336', '#ef5350', '#e57373', '#ef9a9a']
  };

  // Sample data for different categories
  const categoryDataFilter = {
    'Jenis Bahan': {
      comfort: {
        labels: ['Canvas', 'Leather', 'Mesh', 'Suede', 'Knit', 'Synthetic', 'Nylon'],
        datasets: [
          {
            label: 'Positive',
            data: [75, 80, 70, 65, 85, 60, 75],
            backgroundColor: '#00897b',
          },
          {
            label: 'Negative',
            data: [25, 20, 30, 35, 15, 40, 25],
            backgroundColor: '#f44336',
          }
        ]
      },
      quality: {
        labels: ['Canvas', 'Leather', 'Mesh', 'Suede', 'Knit', 'Synthetic', 'Nylon'],
        datasets: [
          {
            label: 'Positive',
            data: [70, 85, 65, 75, 80, 70, 75],
            backgroundColor: '#00897b',
          },
          {
            label: 'Negative',
            data: [30, 15, 35, 25, 20, 30, 25],
            backgroundColor: '#f44336',
          }
        ]
      },
      durability: {
        labels: ['Canvas', 'Leather', 'Mesh', 'Suede', 'Knit', 'Synthetic', 'Nylon'],
        datasets: [
          {
            label: 'Positive',
            data: [80, 85, 75, 70, 75, 65, 70],
            backgroundColor: '#00897b',
          },
          {
            label: 'Negative',
            data: [20, 15, 25, 30, 25, 35, 30],
            backgroundColor: '#f44336',
          }
        ]
      },
      design: {
        labels: ['Canvas', 'Leather', 'Mesh', 'Suede', 'Knit', 'Synthetic', 'Nylon'],
        datasets: [
          {
            label: 'Positive',
            data: [85, 80, 75, 85, 70, 75, 80],
            backgroundColor: '#00897b',
          },
          {
            label: 'Negative',
            data: [15, 20, 25, 15, 30, 25, 20],
            backgroundColor: '#f44336',
          }
        ]
      }
    },
    'Material Sol': {
      comfort: {
        labels: ['Rubber', 'EVA', 'PU', 'TPR', 'Phylon'],
        datasets: [
          {
            label: 'Positive',
            data: [85, 80, 75, 70, 85],
            backgroundColor: '#00897b',
          },
          {
            label: 'Negative',
            data: [15, 20, 25, 30, 15],
            backgroundColor: '#f44336',
          }
        ]
      },
      quality: {
        labels: ['Rubber', 'EVA', 'PU', 'TPR', 'Phylon'],
        datasets: [
          {
            label: 'Positive',
            data: [80, 75, 85, 75, 80],
            backgroundColor: '#00897b',
          },
          {
            label: 'Negative',
            data: [20, 25, 15, 25, 20],
            backgroundColor: '#f44336',
          }
        ]
      },
      durability: {
        labels: ['Rubber', 'EVA', 'PU', 'TPR', 'Phylon'],
        datasets: [
          {
            label: 'Positive',
            data: [90, 75, 80, 70, 85],
            backgroundColor: '#00897b',
          },
          {
            label: 'Negative',
            data: [10, 25, 20, 30, 15],
            backgroundColor: '#f44336',
          }
        ]
      },
      design: {
        labels: ['Rubber', 'EVA', 'PU', 'TPR', 'Phylon'],
        datasets: [
          {
            label: 'Positive',
            data: [75, 85, 80, 75, 80],
            backgroundColor: '#00897b',
          },
          {
            label: 'Negative',
            data: [25, 15, 20, 25, 20],
            backgroundColor: '#f44336',
          }
        ]
      }
    },
    'Asal Produk': {
      comfort: {
        labels: ['Local', 'Import'],
        datasets: [
          {
            label: 'Positive',
            data: [75, 85],
            backgroundColor: '#00897b',
          },
          {
            label: 'Negative',
            data: [25, 15],
            backgroundColor: '#f44336',
          }
        ]
      },
      quality: {
        labels: ['Local', 'Import'],
        datasets: [
          {
            label: 'Positive',
            data: [80, 85],
            backgroundColor: '#00897b',
          },
          {
            label: 'Negative',
            data: [20, 15],
            backgroundColor: '#f44336',
          }
        ]
      },
      durability: {
        labels: ['Local', 'Import'],
        datasets: [
          {
            label: 'Positive',
            data: [85, 80],
            backgroundColor: '#00897b',
          },
          {
            label: 'Negative',
            data: [15, 20],
            backgroundColor: '#f44336',
          }
        ]
      },
      design: {
        labels: ['Local', 'Import'],
        datasets: [
          {
            label: 'Positive',
            data: [75, 90],
            backgroundColor: '#00897b',
          },
          {
            label: 'Negative',
            data: [25, 10],
            backgroundColor: '#f44336',
          }
        ]
      }
    },
    'Target Gender': {
      comfort: {
        labels: ['Men', 'Women', 'Unisex'],
        datasets: [
          {
            label: 'Positive',
            data: [80, 85, 75],
            backgroundColor: '#00897b',
          },
          {
            label: 'Negative',
            data: [20, 15, 25],
            backgroundColor: '#f44336',
          }
        ]
      },
      quality: {
        labels: ['Men', 'Women', 'Unisex'],
        datasets: [
          {
            label: 'Positive',
            data: [85, 80, 75],
            backgroundColor: '#00897b',
          },
          {
            label: 'Negative',
            data: [15, 20, 25],
            backgroundColor: '#f44336',
          }
        ]
      },
      durability: {
        labels: ['Men', 'Women', 'Unisex'],
        datasets: [
          {
            label: 'Positive',
            data: [85, 75, 80],
            backgroundColor: '#00897b',
          },
          {
            label: 'Negative',
            data: [15, 25, 20],
            backgroundColor: '#f44336',
          }
        ]
      },
      design: {
        labels: ['Men', 'Women', 'Unisex'],
        datasets: [
          {
            label: 'Positive',
            data: [75, 90, 80],
            backgroundColor: '#00897b',
          },
          {
            label: 'Negative',
            data: [25, 10, 20],
            backgroundColor: '#f44336',
          }
        ]
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <DashboardTitle variant="h5">
        Product Review Sentiment Analysis
      </DashboardTitle>

      {/* Overview Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <MetricCard elevation={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
              <RateReviewIcon sx={{mr: 1 }} />
              <Typography variant="h6">Total Products</Typography>
            </Box>
            <Typography variant="h4">{stats.totalPosts}</Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard elevation={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
              <CommentIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Total Reviews</Typography>
            </Box>
            <Typography variant="h4">{stats.totalReviews}</Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard elevation={2} >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
              <ThumbUpIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Positive Reviews</Typography>
            </Box>
            <Typography variant="h4">{stats.positiveCount}</Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard elevation={2} >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
              <ThumbDownIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Negative Reviews</Typography>
            </Box>
            <Typography variant="h4">{stats.negativeCount}</Typography>
          </MetricCard>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Sentiment Distribution */}
        <Grid item xs={12} md={4}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Distribusi Sentimen
              </Typography>
              <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Pie
                  data={sentimentData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                    },
                  }}
                />
              </Box>
            </CardContent>
          </ChartCard>
        </Grid>

        {/* Volume Feedback per Kategori */}
        <Grid item xs={12} md={4}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Feedback per Kategori
              </Typography>
              <Box sx={{ height: 300 }}>
                <Bar
                  data={categoryData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'x',
                    scales: {
                      y: {
                        beginAtZero: true,
                      }
                    }
                  }}
                />
              </Box>
            </CardContent>
          </ChartCard>
        </Grid>

        {/* Aspect Sentiment */}
        <Grid item xs={12} md={4}>
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Sentimen per Aspek
              </Typography>
              <Box sx={{ height: 300 }}>
                <Bar
                  data={aspectSentimentData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        grid: {
                          display: false
                        }
                      },
                      y: {
                        stacked: true,
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                          callback: value => value + '%'
                        }
                      }
                    },
                    plugins: {
                      legend: {
                        position: 'top'
                      },
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

        {/* Product Sentiment Analysis */}
        <Grid item xs={12}>
          <ChartCard>
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Sentimen Produk per Aspek
                </Typography>
                <FormControl fullWidth size="small">
                  <InputLabel>Pilih Produk</InputLabel>
                  <Select
                    value={selectedProduct}
                    label="Pilih Produk"
                    onChange={(e) => setSelectedProduct(e.target.value)}
                  >
                    {products.map((product) => (
                      <MenuItem key={product} value={product}>{product}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Grid container spacing={2}>
                {['comfort', 'quality', 'durability', 'design'].map((aspect) => (
                  <Grid item xs={12} sm={6} md={3} key={aspect}>
                    <Paper elevation={2} sx={{ p: 2 }}>
                      <Typography variant="subtitle1" gutterBottom align="center">
                        <b>{aspect === 'comfort' ? 'Kenyamanan' :
                           aspect === 'quality' ? 'Kualitas' :
                           aspect === 'durability' ? 'Durabilitas' : 'Desain'}</b>
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Typography variant="body2" color="success.main">
                            Positive
                          </Typography>
                          <Typography variant="body1" color="success.main">
                            {productSentimentData[selectedProduct][aspect].positive}%
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Typography variant="body2" color="error.main">
                            Negative
                          </Typography>
                          <Typography variant="body1" color="error.main">
                            {productSentimentData[selectedProduct][aspect].negative}%
                          </Typography>
                        </Box>
                        <Box sx={{ width: '100%', height: 4, bgcolor: '#eee', mt: 1 }}>
                          <Box
                            sx={{
                              width: `${productSentimentData[selectedProduct][aspect].positive}%`,
                              height: '100%',
                              bgcolor: '#00897b'
                            }}
                          />
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </ChartCard>
        </Grid>

        {/* Aspect Sentiment Analysis with Filters */}
        <Grid item xs={12}>
          <ChartCard>
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Analisis Sentimen berdasarkan Kategori
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Kategori</InputLabel>
                      <Select
                        value={filterCategory}
                        label="Kategori"
                        onChange={(e) => setFilterCategory(e.target.value)}
                      >
                        {filterCategories.map((category) => (
                          <MenuItem key={category} value={category}>{category}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom align="center">
                    <b>Sentimen Kenyamanan</b>
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <Bar
                      data={categoryDataFilter[filterCategory].comfort}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        indexAxis: 'y',
                        scales: {
                          x: {
                            stacked: true,
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                              callback: value => value + '%'
                            }
                          },
                          y: {
                            stacked: true,
                          }
                        },
                        plugins: {
                          legend: {
                            display: false
                          },
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
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom align="center">
                    <b>Sentimen Kualitas</b>
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <Bar
                      data={categoryDataFilter[filterCategory].quality}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        indexAxis: 'y',
                        scales: {
                          x: {
                            stacked: true,
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                              callback: value => value + '%'
                            }
                          },
                          y: {
                            stacked: true,
                          }
                        },
                        plugins: {
                          legend: {
                            display: false
                          },
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
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom align="center">
                    <b>Sentimen Durabilitas</b>
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <Bar
                      data={categoryDataFilter[filterCategory].durability}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        indexAxis: 'y',
                        scales: {
                          x: {
                            stacked: true,
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                              callback: value => value + '%'
                            }
                          },
                          y: {
                            stacked: true,
                          }
                        },
                        plugins: {
                          legend: {
                            display: false
                          },
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
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom align="center">
                    <b>Sentimen Desain</b>
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <Bar
                      data={categoryDataFilter[filterCategory].design}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        indexAxis: 'y',
                        scales: {
                          x: {
                            stacked: true,
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                              callback: value => value + '%'
                            }
                          },
                          y: {
                            stacked: true,
                          }
                        },
                        plugins: {
                          legend: {
                            display: false
                          },
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
                </Grid>
              </Grid>

              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 16, height: 16, bgcolor: '#00897b', mr: 1 }} />
                    <Typography variant="body2">Positive</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 16, height: 16, bgcolor: '#f44336', mr: 1 }} />
                    <Typography variant="body2">Negative</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </ChartCard>
        </Grid>

        

        {/* Top Keywords */}

                <Grid item xs={12} md={6}>
                  <ChartCard>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Top 10 Positive Keywords
                      </Typography>
                      <Box sx={{ height: 400 }}>
                        <ReactWordcloud
                          words={wordCloudData.positive}
                          options={wordcloudOptions}
                        />
                      </Box>
                    </CardContent>
                  </ChartCard>
                </Grid>

                {/* Negative Keywords Word Cloud */}
                <Grid item xs={12} md={6}>
                  <ChartCard>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Top 10 Negative Keywords
                      </Typography>
                      <Box sx={{ height: 400 }}>
                        <ReactWordcloud
                          words={wordCloudData.negative}
                          options={negativeWordcloudOptions}
                        />
                      </Box>
                    </CardContent>
                  </ChartCard>
                </Grid>
              </Grid>


      
    </Box>
  );
};

export default CustomerFeedbackDashboard;
