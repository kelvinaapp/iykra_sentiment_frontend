import React, { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import LeftSidebar from './LeftSidebar';
import SentimentDashboard from './dashboards/SentimentDashboard';
import CampaignDashboard from './dashboards/CampaignDashboard';
// import MarketTrendDashboard from './dashboards/MarketTrendDashboard';
import CustomerFeedbackDashboard from './dashboards/CustomerFeedbackDashboard';
import SocialMediaDashboard from './dashboards/SocialMediaDashboard';
import CompetitorAnalysisDashboard from './dashboards/CompetitorAnalysisDashboard';
import ChatbotDashboard from './dashboards/ChatbotDashboard';

const MainContent = styled(Box)({
  display: 'flex',
  height: 'calc(100vh - 64px)', // Subtract navbar height
});

const ContentArea = styled(Box)({
  flexGrow: 1,
  overflowY: 'auto',
  backgroundColor: '#f5f5f5',
  minWidth: 0, // Prevent content from pushing sidebar wider
});

function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && children}
    </div>
  );
}

const Layout = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      <MainContent>
        <LeftSidebar onTabChange={handleTabChange} currentTab={currentTab} />
        <ContentArea>
        <TabPanel value={currentTab} index={0}>
          <SocialMediaDashboard />
        </TabPanel>
          <TabPanel value={currentTab} index={1}>
            <SentimentDashboard />
          </TabPanel>
          <TabPanel value={currentTab} index={2}>
            <CustomerFeedbackDashboard />
          </TabPanel>
          {/* <TabPanel value={currentTab} index={3}>
            <MarketTrendDashboard />
          </TabPanel> */}
          <TabPanel value={currentTab} index={3}>
            <CampaignDashboard />
          </TabPanel>
          <TabPanel value={currentTab} index={4}>
            <CompetitorAnalysisDashboard />
          </TabPanel>
          <TabPanel value={currentTab} index={5}>
            <ChatbotDashboard />
          </TabPanel>
        </ContentArea>
        <Sidebar />
      </MainContent>
    </Box>
  );
};

export default Layout;
