import React, { useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: '360px',
  height: 'calc(100vh - 64px)',
  borderLeft: '1px solid #e0e0e0',
  backgroundColor: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
}));

const ScrollableSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555',
  },
}));

const BrandSection = styled(ScrollableSection)({
  flex: '0 0 360px', // Fixed height for brand section
});

const HighlightSection = styled(ScrollableSection)({
  flex: 1, // Takes remaining space
});

const StyledTableCell = styled(TableCell)({
  padding: '8px',
  borderBottom: '1px solid #e0e0e0',
  '&.header': {
    borderBottom: '2px solid #e0e0e0',
    backgroundColor: 'transparent',
    fontWeight: 600,
    color: '#666',
  }
});

const BrandCell = styled(TableCell)({
  display: 'flex',
  alignItems: 'center',
  padding: '8px',
  cursor: 'pointer',
  borderBottom: '1px solid #e0e0e0',
});

const StyledTableRow = styled(TableRow)(({ theme, selected }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  ...(selected && {
    backgroundColor: theme.palette.action.selected,
    '& .MuiTableCell-root': {
      color: theme.palette.primary.main,
    }
  })
}));

const brandData = [
  { name: 'Adidas', logo: '/assets/brands/adidas.png', latestSent: '9252', posSent: '90.5%', negSent: '9.5%' },
  { name: 'Nike', logo: '/assets/brands/nike.png', latestSent: '8547', posSent: '88.2%', negSent: '11.8%' },
  { name: 'Reebok', logo: '/assets/brands/reebok.png', latestSent: '7823', posSent: '85.7%', negSent: '14.3%' },
  { name: 'Puma', logo: '/assets/brands/puma.png', latestSent: '6954', posSent: '87.3%', negSent: '12.7%' },
  { name: 'Converse', logo: '/assets/brands/converse.png', latestSent: '6234', posSent: '89.1%', negSent: '10.9%' },
];

const Sidebar = () => {
  const [selectedBrand, setSelectedBrand] = useState('Adidas');

  const doughnutData = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        data: [76.53, 12.03, 11.44],
        backgroundColor: ['#4285F4', '#EA4335', '#34A853'],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: '70%',
  };

  return (
    <SidebarContainer>
      {/* Brand Data Section */}
      <BrandSection>
        <TableContainer>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell className="header" align="center">Brand</StyledTableCell>
                <StyledTableCell className="header" align="center">Latest Sent</StyledTableCell>
                <StyledTableCell className="header" align="center">(+) Sent %</StyledTableCell>
                <StyledTableCell className="header" align="center">(-) Sent %</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {brandData.map((brand) => (
                <StyledTableRow
                  key={brand.name}
                  selected={selectedBrand === brand.name}
                  onClick={() => setSelectedBrand(brand.name)}
                >
                  <BrandCell>
                    <img 
                      src={brand.logo} 
                      alt={brand.name} 
                      style={{ width: 24, height: 24, marginRight: 8 }} 
                    />
                    {brand.name}
                  </BrandCell>
                  <StyledTableCell align="center">{brand.latestSent}</StyledTableCell>
                  <StyledTableCell align="center">{brand.posSent}</StyledTableCell>
                  <StyledTableCell align="center">{brand.negSent}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </BrandSection>

      <Divider />

      {/* Analytics Highlight Section */}
      <HighlightSection>
        <Typography variant="h6" gutterBottom>
          Highlight
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Box sx={{ backgroundColor: 'success.main', color: 'white', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
              <Typography variant="h5">201</Typography>
              <Typography variant="body2">Campaign</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ backgroundColor: 'success.main', color: 'white', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
              <Typography variant="h5">85,040</Typography>
              <Typography variant="body2">Reach</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ backgroundColor: 'success.main', color: 'white', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
              <Typography variant="h5">4,123</Typography>
              <Typography variant="body2">Engagements</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ backgroundColor: 'success.main', color: 'white', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
              <Typography variant="h5">60.5%</Typography>
              <Typography variant="body2">Conversion Rate</Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Sentiment Chart */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Sentimen
          </Typography>
          <Box sx={{ height: 200, position: 'relative' }}>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </Box>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Positif: 76.53% | Negative: 12.03% | Netral: 11.44%
            </Typography>
          </Box>
        </Box>

        {/* Sales & Marketing */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Sales & Marketing
          </Typography>
          <Typography variant="body2">Total Sales: Rp 1,250,000,000</Typography>
          <Typography variant="body2">Campaign Sales: Rp 600,000,000</Typography>
          <Typography variant="body2">Marketing Budget: Rp 100,000,000</Typography>
          <Typography variant="body2">Marketing ROI: 500%</Typography>
        </Box>

        {/* Reach by Platform */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Reach by Platform
          </Typography>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <img src="/assets/tiktok-icon.png" alt="TikTok" style={{ width: 20, height: 20 }} />
            </Grid>
            <Grid item>
              <Typography variant="body2">76.53%</Typography>
            </Grid>
            <Grid item>
              <img src="/assets/instagram-icon.png" alt="Instagram" style={{ width: 20, height: 20 }} />
            </Grid>
            <Grid item>
              <Typography variant="body2">12.03%</Typography>
            </Grid>
            <Grid item>
              <img src="/assets/threads-icon.png" alt="Threads" style={{ width: 20, height: 20 }} />
            </Grid>
            <Grid item>
              <Typography variant="body2">11.44%</Typography>
            </Grid>
          </Grid>
        </Box>
      </HighlightSection>
    </SidebarContainer>
  );
};

export default Sidebar;
