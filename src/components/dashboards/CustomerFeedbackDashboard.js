import React, { useState, useEffect } from "react";
import { useBrand } from '../../context/BrandContext';
import { Box, Typography, Card, CardContent, Grid, Paper, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ReactWordcloud from "react-wordcloud";
import AIDashboardSummary from "../AIDashboardSummary";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const DashboardTitle = styled(Typography)(({ theme }) => ({
  color: "#fff",
  backgroundColor: "#00897b",
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
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

const ChartCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  height: "100%",
}));

const CustomerFeedbackDashboard = () => {
  const { selectedBrand } = useBrand();
  // Filter states
  const [filterCategory, setFilterCategory] = useState("Jenis Bahan");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data states
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalReviews: 0,
    positiveCount: 0,
    negativeCount: 0,
  });
  const [products, setProducts] = useState([]);
  const [sentimentData, setSentimentData] = useState({
    labels: ["Positive", "Negative"],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["#00897b", "#f44336"],
      },
    ],
  });
  const [aspectSentimentData, setAspectSentimentData] = useState({
    labels: [],
    datasets: [],
  });
  const [productSentimentData, setProductSentimentData] = useState({});
  const [wordCloudData, setWordCloudData] = useState({
    positive: [],
    negative: [],
  });
  const [categoryDataFilter, setCategoryDataFilter] = useState({});

  // Default chart data structure
  const defaultChartData = {
    labels: [],
    datasets: [
      {
        label: "Positive",
        data: [],
        backgroundColor: "#00897b",
      },
      {
        label: "Negative",
        data: [],
        backgroundColor: "#f44336",
      },
    ],
  };

  // Helper function to get chart data safely
  const getChartData = (category, aspect) => {
    if (!categoryDataFilter[category] || !categoryDataFilter[category][aspect]) {
      return defaultChartData;
    }
    return categoryDataFilter[category][aspect];
  };

  // Filter options
  const filterCategories = [
    "Jenis Bahan",
    "Material Sol",
    "Asal Produk",
    "Target Gender",
  ];

  const fetchDataFromEndpoint = async (endpoint) => {
    try {
      const response = await fetch(`http://localhost:8000/api/product-reviews/${endpoint}?brand=${encodeURIComponent(selectedBrand)}`);
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
      try {
        const [
          metricsData,
          sentimentDistData,
          aspectData,
          productsData,
          keywordsData,
        ] = await Promise.all([
          fetchDataFromEndpoint('metrics'),
          fetchDataFromEndpoint('sentiment-distribution'),
          fetchDataFromEndpoint('aspect-sentiment'),
          fetchDataFromEndpoint('products'),
          fetchDataFromEndpoint('top-keywords'),
        ]);

        setStats(metricsData);
        setSentimentData(sentimentDistData); // Backend already returns the correct format
        setAspectSentimentData(aspectData); // Backend already returns the correct format
        setProducts(productsData);
        
        if (productsData.length > 0) {
          setSelectedProduct(productsData[0].product_id); // Set only the product_id
        }

        setWordCloudData({
          positive: keywordsData.positive.map((k) => ({
            text: k[0],  // keyword
            value: k[1], // frequency
          })),
          negative: keywordsData.negative.map((k) => ({
            text: k[0],  // keyword
            value: k[1], // frequency
          })),
        });

        setError(null);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [selectedBrand]); // Re-fetch when selected brand changes

  // Fetch product-specific sentiment when product selection changes
  useEffect(() => {
    const fetchProductSentiment = async () => {
      if (selectedProduct) {
        try {
          const response = await fetch(
            `http://localhost:8000/api/product-reviews/products-review-sentiment/${selectedProduct}?brand=${encodeURIComponent(selectedBrand)}`
          );
          const data = await response.json();
          setProductSentimentData({
            [selectedProduct]: {
              comfort: {
                positive: data.comfort.positive,
                negative: data.comfort.negative,
              },
              quality: {
                positive: data.quality.positive,
                negative: data.quality.negative,
              },
              durability: {
                positive: data.durability.positive,
                negative: data.durability.negative,
              },
              design: {
                positive: data.design.positive,
                negative: data.design.negative,
              },
            },
          });
        } catch (err) {
          setError(err.message);
        }
      }
    };
    fetchProductSentiment();
  }, [selectedProduct, selectedBrand]);

  // Fetch category-based sentiment data when filter category changes
  useEffect(() => {
    const fetchCategorySentiment = async () => {
      try {
        let endpoint = "";
        switch (filterCategory) {
          case "Jenis Bahan":
            endpoint = "review-sentiment-by-upper-material";
            break;
          case "Material Sol":
            endpoint = "review-sentiment-by-sole-material";
            break;
          case "Asal Produk":
            endpoint = "review-sentiment-by-origin";
            break;
          case "Target Gender":
            endpoint = "review-sentiment-by-gender";
            break;
          default:
            break;
        }

        const response = await fetch(
          `http://localhost:8000/api/product-reviews/${endpoint}?brand=${encodeURIComponent(selectedBrand)}`
        );
        const data = await response.json();

        // Transform the data to match chart format
        const transformData = (aspectData) => {
          if (!aspectData) return null;
          
          const categories = Object.keys(aspectData);
          const positiveData = categories.map(cat => aspectData[cat].positive);
          const negativeData = categories.map(cat => aspectData[cat].negative);
          
          return {
            labels: categories,
            datasets: [
              {
                label: "Positive",
                data: positiveData,
                backgroundColor: "#00897b",
              },
              {
                label: "Negative",
                data: negativeData,
                backgroundColor: "#f44336",
              },
            ],
          };
        };

        // Create chart data for each aspect
        const chartData = {};
        for (const [aspect, sentiments] of Object.entries(data)) {
          const transformedData = transformData(sentiments);
          if (transformedData) {
            switch (aspect) {
              case 'Kenyamanan':
                chartData.comfort = transformedData;
                break;
              case 'Kualitas':
                chartData.quality = transformedData;
                break;
              case 'Durabilitas':
                chartData.durability = transformedData;
                break;
              case 'Desain':
                chartData.design = transformedData;
                break;
              default:
                break;
            }
          }
        }

        setCategoryDataFilter(prevState => ({
          ...prevState,
          [filterCategory]: chartData
        }));
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCategorySentiment();
  }, [filterCategory, selectedBrand]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <DashboardTitle variant="h5">
        Product Reviews SentimentDashboard - {selectedBrand}
      </DashboardTitle>

      {/* Overview Stats */}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <MetricCard elevation={2}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              <RateReviewIcon sx={{ mr: 1 }} />

              <Typography variant="body1">Total Products</Typography>
            </Box>

            <Typography variant="h4">{stats.totalProducts}</Typography>
          </MetricCard>
        </Grid>

        <Grid item xs={12} md={3}>
          <MetricCard elevation={2}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              <CommentIcon sx={{ mr: 1 }} />

              <Typography variant="body1">Total Reviews</Typography>
            </Box>

            <Typography variant="h4">{stats.totalReviews}</Typography>
          </MetricCard>
        </Grid>

        <Grid item xs={12} md={3}>
          <MetricCard elevation={2}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              <ThumbUpIcon sx={{ mr: 1 }} />

              <Typography variant="body1">Positive Reviews</Typography>
            </Box>

            <Typography variant="h4">{stats.positiveCount}</Typography>
          </MetricCard>
        </Grid>

        <Grid item xs={12} md={3}>
          <MetricCard elevation={2}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              <ThumbDownIcon sx={{ mr: 1 }} />

              <Typography variant="body1">Negative Reviews</Typography>
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

              <Box
                sx={{
                  height: 300,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Pie
                  data={sentimentData}
                  options={{
                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {
                      legend: {
                        position: "bottom",
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
                  data={{
                    labels: ["Produk", "Layanan", "Pengiriman"],
                    datasets: [
                      {
                        label: "Total Reviews",
                        data: [150, 200, 180],
                        backgroundColor: "#2196f3",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,

                    maintainAspectRatio: false,

                    indexAxis: "x",

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
                    {products &&
                      products.map((product) => (
                        <MenuItem
                          key={product.product_id}
                          value={product.product_id}
                        >
                          {product.product_name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>

              <Grid container spacing={2}>
                {["comfort", "quality", "durability", "design"].map(
                  (aspect) => (
                    <Grid item xs={12} sm={6} md={3} key={aspect}>
                      <Paper elevation={2} sx={{ p: 2 }}>
                        <Typography
                          variant="subtitle1"
                          gutterBottom
                          align="center"
                        >
                          <b>
                            {aspect === "comfort"
                              ? "Kenyamanan"
                              : aspect === "quality"
                              ? "Kualitas"
                              : aspect === "durability"
                              ? "Durabilitas"
                              : "Desain"}
                          </b>
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography variant="body2" color="success.main">
                              Positive
                            </Typography>

                            <Typography variant="body1" color="success.main">
                              {productSentimentData[selectedProduct] &&
                                productSentimentData[selectedProduct][aspect]
                                  .positive}
                              %
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography variant="body2" color="error.main">
                              Negative
                            </Typography>

                            <Typography variant="body1" color="error.main">
                              {productSentimentData[selectedProduct] &&
                                productSentimentData[selectedProduct][aspect]
                                  .negative}
                              %
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              width: "100%",
                              height: 4,
                              bgcolor: "#eee",
                              mt: 1,
                            }}
                          >
                            <Box
                              sx={{
                                width: `${
                                  productSentimentData[selectedProduct] &&
                                  productSentimentData[selectedProduct][aspect]
                                    .positive
                                }%`,

                                height: "100%",

                                bgcolor: "#00897b",
                              }}
                            />
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  )
                )}
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
                          <MenuItem
                            key={category}
                            value={category}
                          >
                            {category}
                          </MenuItem>
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
                      data={getChartData(filterCategory, 'comfort')}
                      options={{
                        responsive: true,

                        maintainAspectRatio: false,

                        indexAxis: "y",

                        scales: {
                          x: {
                            stacked: true,

                            beginAtZero: true,

                            max: 100,

                            ticks: {
                              callback: (value) => value + "%",
                            },
                          },

                          y: {
                            stacked: true,
                          },
                        },

                        plugins: {
                          legend: {
                            display: false,
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
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom align="center">
                    <b>Sentimen Kualitas</b>
                  </Typography>

                  <Box sx={{ height: 300 }}>
                    <Bar
                      data={getChartData(filterCategory, 'quality')}
                      options={{
                        responsive: true,

                        maintainAspectRatio: false,

                        indexAxis: "y",

                        scales: {
                          x: {
                            stacked: true,

                            beginAtZero: true,

                            max: 100,

                            ticks: {
                              callback: (value) => value + "%",
                            },
                          },

                          y: {
                            stacked: true,
                          },
                        },

                        plugins: {
                          legend: {
                            display: false,
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
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom align="center">
                    <b>Sentimen Durabilitas</b>
                  </Typography>

                  <Box sx={{ height: 300 }}>
                    <Bar
                      data={getChartData(filterCategory, 'durability')}
                      options={{
                        responsive: true,

                        maintainAspectRatio: false,

                        indexAxis: "y",

                        scales: {
                          x: {
                            stacked: true,

                            beginAtZero: true,

                            max: 100,

                            ticks: {
                              callback: (value) => value + "%",
                            },
                          },

                          y: {
                            stacked: true,
                          },
                        },

                        plugins: {
                          legend: {
                            display: false,
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
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom align="center">
                    <b>Sentimen Desain</b>
                  </Typography>

                  <Box sx={{ height: 300 }}>
                    <Bar
                      data={getChartData(filterCategory, 'design')}
                      options={{
                        responsive: true,

                        maintainAspectRatio: false,

                        indexAxis: "y",

                        scales: {
                          x: {
                            stacked: true,

                            beginAtZero: true,

                            max: 100,

                            ticks: {
                              callback: (value) => value + "%",
                            },
                          },

                          y: {
                            stacked: true,
                          },
                        },

                        plugins: {
                          legend: {
                            display: false,
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
                </Grid>
              </Grid>

              <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{ width: 16, height: 16, bgcolor: "#00897b", mr: 1 }}
                    />

                    <Typography variant="body2">Positive</Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{ width: 16, height: 16, bgcolor: "#f44336", mr: 1 }}
                    />

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

              <Box sx={{ height: 350 }}>
                <ReactWordcloud
                  words={wordCloudData.positive}
                  options={{
                    colors: ["#00897b", "#26a69a", "#4db6ac", "#80cbc4"],
                    enableTooltip: true,
                    rotations: 0,
                    rotationAngles: [0],
                    fontSizes: [25, 45],
                    padding: 2,
                  }}
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

              <Box sx={{ height: 350 }}>
                <ReactWordcloud
                  words={wordCloudData.negative}
                  options={{
                    colors: ["#f44336", "#ef5350", "#e57373", "#ef9a9a"],
                    enableTooltip: true,
                    rotations: 0,
                    rotationAngles: [0],
                    fontSizes: [25, 45],
                    padding: 2,
                  }}
                />
              </Box>
            </CardContent>
          </ChartCard>
        </Grid>
      </Grid>

      {/* AI Dashboard Summary */}
      {!loading && !error && (
        <AIDashboardSummary
          data={{
            metrics: {
              totalReviews: stats.totalReviews || 0,
              averageRating: stats.averageRating || 0,
              positiveCount: stats.positiveCount || 0,
              negativeCount: stats.negativeCount || 0,
              neutralCount: stats.neutralCount || 0
            },
            sentiment_distribution: {
              positive: stats.positiveCount || 0,
              negative: stats.negativeCount || 0,
              neutral: stats.neutralCount || 0
            },
            sentiment_trend: [{
              date: new Date().toISOString().split('T')[0],
              positive: sentimentData.datasets[0].data[0] || 0,
              negative: sentimentData.datasets[0].data[1] || 0,
              neutral: 0
            }],
            aspect_sentiments: Object.entries(productSentimentData).map(([aspect, data]) => ({
              aspect,
              sentiment: data.positive > data.negative ? 'positive' : 'negative',
              count: data.positive + data.negative
            })) || [],
            word_cloud: [
              ...(wordCloudData.positive || []).map(item => ({
                text: item.text,
                value: item.value
              })),
              ...(wordCloudData.negative || []).map(item => ({
                text: item.text,
                value: item.value
              }))
            ],
            top_reviews: [] // No top reviews data available
          }}
          brand={selectedBrand}
        />
      )}
    </Box>
  );
};

export default CustomerFeedbackDashboard;
