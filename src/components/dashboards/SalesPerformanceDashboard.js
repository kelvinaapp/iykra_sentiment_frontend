import React from 'react';
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

// Sample data - replace with actual data from your API
const dailySalesData = [
  { day: 'Mon', orderValue: 400000 },
  { day: 'Tue', orderValue: 350000 },
  { day: 'Wed', orderValue: 500000 },
  { day: 'Thu', orderValue: 450000 },
  { day: 'Fri', orderValue: 600000 },
  { day: 'Sat', orderValue: 750000 },
  { day: 'Sun', orderValue: 550000 },
];

const productCategoryData = [
  { category: 'Running Shoes', volume: 1200 },
  { category: 'Lifestyle Shoes', volume: 900 },
  { category: 'Training Shoes', volume: 600 },
  { category: 'Soccer Shoes', volume: 400 },
  { category: 'Basketball Shoes', volume: 350 },
];

const returnRateData = [
  { category: 'Running Shoes', value: 35 },
  { category: 'Lifestyle Shoes', value: 25 },
  { category: 'Training Shoes', value: 20 },
  { category: 'Soccer Shoes', value: 12 },
  { category: 'Basketball Shoes', value: 8 },
];

const locationData = [
  { city: 'Jakarta', customers: 1200 },
  { city: 'Surabaya', customers: 800 },
  { city: 'Bandung', customers: 600 },
  { city: 'Medan', customers: 450 },
  { city: 'Semarang', customers: 350 },
  { city: 'Yogyakarta', customers: 300 },
  { city: 'Malang', customers: 280 },
  { city: 'Makassar', customers: 250 },
  { city: 'Palembang', customers: 220 },
  { city: 'Denpasar', customers: 200 },
];

const genderData = [
  { name: 'Male', value: 55 },
  { name: 'Female', value: 45 },
];

const ageData = [
  { group: '18-24', value: 30 },
  { group: '25-34', value: 35 },
  { group: '35-44', value: 20 },
  { group: '45+', value: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const SalesPerformanceDashboard = () => {
  const { selectedBrand } = useBrand();
  // Calculate KPIs
  const totalSales = dailySalesData.reduce((sum, item) => sum + item.orderValue, 0);
  const avgOrderValue = totalSales / productCategoryData.reduce((sum, item) => sum + item.volume, 0);
  const overallReturnRate = returnRateData.reduce((sum, item) => sum + item.value, 0) / returnRateData.length;
  const repeatPurchaseScore = 78; // Example score, replace with actual calculation

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <DashboardTitle variant="h5">
        Sales Performance Dashboard - {selectedBrand}
      </DashboardTitle>
      
      <Grid container spacing={3}>
        {/* KPI Cards */}
        <Grid item xs={12} md={3}>
          <MetricCard>
            <Typography variant="h6">Total Sales</Typography>
            <Typography variant="h4">${(totalSales / 1000000).toFixed(2)}M</Typography>
            <Typography variant="body2">Overall sales performance</Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard>
            <Typography variant="h6">Average Order Value</Typography>
            <Typography variant="h4">${avgOrderValue.toFixed(2)}</Typography>
            <Typography variant="body2">Average value per transaction</Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard>
            <Typography variant="h6">Return Rate</Typography>
            <Typography variant="h4">{overallReturnRate.toFixed(1)}%</Typography>
            <Typography variant="body2">Overall product return rate</Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard>
            <Typography variant="h6">Repeat Purchase Score</Typography>
            <Typography variant="h4">{repeatPurchaseScore}%</Typography>
            <Typography variant="body2">Customer loyalty indicator</Typography>
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
