import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, CircularProgress } from '@mui/material';

const AIDashboardSummary = ({ data, brand }) => {
  const [aiSummary, setAiSummary] = useState('');
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState(null);
  const summaryRequestInProgress = useRef(false);
  const isInitialMount = useRef(true);

  const generateAISummary = async (dashboardData) => {
    if (summaryRequestInProgress.current) return;
    
    summaryRequestInProgress.current = true;
    setSummaryLoading(true);
    setSummaryError(null);
    
    try {
      console.log('Sending data to AI summary endpoint:', {
        dashboard_data: dashboardData,
        brand
      });
      
      const response = await fetch('http://localhost:8000/api/ai/dashboard-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dashboard_data: dashboardData,
          brand
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from AI summary endpoint:', errorData);
        throw new Error(errorData.detail || 'Failed to generate AI summary');
      }

      const responseData = await response.json();
      console.log('Received AI summary:', responseData);
      
      if (responseData.status === 'error') {
        throw new Error(responseData.message || 'Failed to generate summary');
      }
      
      setAiSummary(responseData.summary);
      setSummaryError(null);
    } catch (error) {
      console.error('Error generating AI summary:', error);
      setSummaryError(error.message || 'Failed to generate AI summary. Please try again later.');
      setAiSummary('');
    } finally {
      setSummaryLoading(false);
      summaryRequestInProgress.current = false;
    }
  };

  useEffect(() => {
    // Skip the first render
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Only generate if we have both data and brand
    if (data && brand && !summaryRequestInProgress.current) {
      generateAISummary(data);
    }
  }, [data]); // Only depend on data changes

  return (
    <Card sx={{ mt: 4, mb: 4 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom sx={{ color: '#00897b', mb: 2 }}>
          AI-Generated Dashboard Summary
        </Typography>
        
        {summaryLoading && !aiSummary && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        )}
        
        {summaryError && (
          <Typography variant="body1" color="error" sx={{ mb: 2 }}>
            {summaryError}
          </Typography>
        )}
        
        {aiSummary && (
          <Typography 
            variant="body1" 
            component="div" 
            sx={{ 
              whiteSpace: 'pre-wrap',
              lineHeight: 1.8,
              color: 'text.primary',
              '& p': { mb: 2 },
              '& strong': { color: '#00897b' }
            }}
            dangerouslySetInnerHTML={{ __html: aiSummary }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default AIDashboardSummary;
