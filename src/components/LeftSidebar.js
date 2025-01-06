import React from 'react';
import { Box, Tab, Tabs, styled } from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import CampaignIcon from '@mui/icons-material/Campaign';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FeedbackIcon from '@mui/icons-material/Feedback';
import PublicIcon from '@mui/icons-material/Public';
import CompareIcon from '@mui/icons-material/Compare';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const LeftSidebarContainer = styled(Box)(({ theme }) => ({
  width: '250px',
  height: 'calc(100vh - 64px)', // Subtract navbar height
  borderRight: '1px solid #e0e0e0',
  backgroundColor: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
}));

const StyledTabs = styled(Tabs)({
  '& .MuiTab-root': {
    minHeight: '48px',
    padding: '12px 16px',
    textTransform: 'none',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minWidth: '250px',
    fontSize: '0.875rem',
    whiteSpace: 'nowrap',
  },
  '& .MuiTabs-indicator': {
    left: 0,
    width: '3px',
    borderRadius: '0 2px 2px 0',
  },
});

const StyledTab = styled(Tab)({
  width: '100%',
  color: '#666666',
  '&.Mui-selected': {
    color: '#1976d2',
    backgroundColor: 'rgba(25, 118, 210, 0.04)',
  },
  '& .MuiTab-wrapper': {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  '& .MuiSvgIcon-root': {
    marginRight: '12px',
    fontSize: '20px',
  },
});

function LeftSidebar({ onTabChange, currentTab }) {
  const handleChange = (event, newValue) => {
    onTabChange(newValue);
  };

  return (
    <LeftSidebarContainer>
      <StyledTabs
        orientation="vertical"
        value={currentTab}
        onChange={handleChange}
        aria-label="dashboard tabs"
        variant="scrollable"
      >
        <StyledTab 
          icon={<PublicIcon />} 
          label="Social Media Performance" 
          iconPosition="start"
        />
        <StyledTab 
          icon={<SentimentSatisfiedAltIcon />} 
          label="Social Media Sentiment" 
          iconPosition="start"
        />
        <StyledTab 
          icon={<FeedbackIcon />} 
          label="Product Review Sentiment" 
          iconPosition="start"
        />
        {/* <StyledTab 
          icon={<TrendingUpIcon />} 
          label="Market Trends" 
          iconPosition="start"
        /> */}
        <StyledTab 
          icon={<CampaignIcon />} 
          label="Campaign Performance" 
          iconPosition="start"
        />
        <StyledTab 
          icon={<CompareIcon />} 
          label="Competitors" 
          iconPosition="start"
        />
        <StyledTab 
          icon={<SmartToyIcon />}
          label="AI Chatbot"
          iconPosition="start"
          sx={{
            marginTop: 'auto',
            backgroundColor: currentTab === 7 ? 'rgba(103, 58, 183, 0.1)' : 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(103, 58, 183, 0.1)',
            }
          }}
        />
      </StyledTabs>
    </LeftSidebarContainer>
  );
}

export default LeftSidebar;
