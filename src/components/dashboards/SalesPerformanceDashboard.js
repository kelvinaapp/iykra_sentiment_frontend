import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useBrand } from '../../context/BrandContext';
import { useDate } from '../../context/DateContext';

const API_BASE_URL = 'http://localhost:8000/api/sales'

const DashboardTitle = styled(Typography)(({ theme }) => ({
  color: '#fff',
  backgroundColor: '#00695c',
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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const SalesPerformanceDashboard = () => {
  const { selectedBrand } = useBrand();
  const { dateFilter, setDateFilter, getDateRange } = useDate();

  // Helper function to format currency in IDR
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // State declarations
  const [dailySalesData, setDailySalesData] = useState([]);
  const [productCategoryData, setProductCategoryData] = useState([]);
  const [returnRateData, setReturnRateData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [ageData, setAgeData] = useState([]);

  const handleDateFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setDateFilter(newFilter);
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const params = new URLSearchParams();
        if (selectedBrand) params.append('brand', selectedBrand);
        
        // Add date range parameters
        const { startDate, endDate } = getDateRange();
        params.append('startDate', startDate);
        params.append('endDate', endDate);
        
        // Fetch daily sales data
        const salesResponse = await fetch(`${API_BASE_URL}/daily-sales?${params}`);
        const salesData = await salesResponse.json();
        setDailySalesData(salesData);

        // Fetch product category data
        const categoryResponse = await fetch(`${API_BASE_URL}/product-categories?${params}`);
        const categoryData = await categoryResponse.json();
        setProductCategoryData(categoryData);

        // Fetch return rate data
        const returnResponse = await fetch(`${API_BASE_URL}/return-rates?${params}`);
        const returnData = await returnResponse.json();
        setReturnRateData(returnData);

        // Fetch location data
        const locationResponse = await fetch(`${API_BASE_URL}/customer-locations?${params}`);
        const locationData = await locationResponse.json();
        setLocationData(locationData);

        // Fetch demographics data
        const demographicsResponse = await fetch(`${API_BASE_URL}/demographics?${params}`);
        const demographicsData = await demographicsResponse.json();
        setGenderData(demographicsData.gender);
        setAgeData(demographicsData.age);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, [selectedBrand, dateFilter]);

  // Calculate KPIs
  const totalSales = dailySalesData.reduce((sum, item) => sum + item.orderValue, 0);
  const avgOrderValue = totalSales / productCategoryData.reduce((sum, item) => sum + item.volume, 0) || 0;
  const overallReturnRate = returnRateData.reduce((sum, item) => sum + item.value, 0) / returnRateData.length || 0;
  const repeatPurchaseScore = 75; // This should come from the API

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <DashboardTitle variant="h4" gutterBottom>
        Sales Performance Dashboard
      </DashboardTitle>

      <Grid container spacing={3}>
        {/* KPI Cards */}
        <Grid item xs={12} md={3}>
          <MetricCard sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
            <Typography variant="h6">Total Sales</Typography>
            <Typography variant="h5" sx={{ mt: '16px' }}>{formatCurrency(totalSales)}</Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
            <Typography variant="h6">Average Order Value</Typography>
            <Typography variant="h5" sx={{ mt: '16px' }}>{formatCurrency(avgOrderValue)}</Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
            <Typography variant="h6">Return Rate</Typography>
            <Typography variant="h5" sx={{ mt: '16px' }}>{overallReturnRate.toFixed(1)}%</Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
            <Typography variant="body1"><b>Repeat Purchase Score</b></Typography>
            <Typography variant="h5" sx={{ mt: '16px' }}>{repeatPurchaseScore}%</Typography>
          </MetricCard>
        </Grid>

        {/* Daily Sales Trend */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#1a237e' }} gutterBottom>Daily Sales Trend</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailySalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis 
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip 
                    contentStyle={{ fontSize: 11 }}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: 11 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="orderValue" 
                    stroke="#8884d8" 
                    name="Sales Value" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Order Volume by Category */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#1a237e' }} gutterBottom>Order Volume by Category</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productCategoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="category" 
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    tick={{ fontSize: 11 }}
                    dy={10}
                  />
                  <YAxis 
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip 
                    contentStyle={{ fontSize: 11 }}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: 11 }}
                  />
                  <Bar dataKey="volume" fill="#82ca9d" name="Order Volume" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Return Rate Donut Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#1a237e' }} gutterBottom>Return Rate by Category</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={returnRateData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="category"
                    label={({ category, value }) => `${category} (${value}%)`}
                    style={{ fontSize: '11px' }}
                  >
                    {returnRateData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ fontSize: 11 }}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: 11 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Customer Location Map */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#1a237e' }} gutterBottom>Customer Locations</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={locationData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    type="number"
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis 
                    dataKey="city" 
                    type="category"
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip 
                    contentStyle={{ fontSize: 11 }}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: 11 }}
                  />
                  <Bar dataKey="customers" fill="#8884d8" name="Customers" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Customer Demographics */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#1a237e' }} gutterBottom>Gender Distribution</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} (${value}%)`}
                    style={{ fontSize: '11px' }}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ fontSize: 11 }}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: 11 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Age Distribution */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#1a237e' }} gutterBottom>Age Distribution</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="group"
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis 
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip 
                    contentStyle={{ fontSize: 11 }}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: 11 }}
                  />
                  <Bar dataKey="value" fill="#8884d8" name="Percentage" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SalesPerformanceDashboard;
