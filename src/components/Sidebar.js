import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: "360px",
  height: "calc(100vh - 64px)",
  borderLeft: "1px solid #e0e0e0",
  backgroundColor: "#ffffff",
  display: "flex",
  flexDirection: "column",
}));

const ScrollableSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "3px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
}));

const BrandSection = styled(ScrollableSection)({
  flex: "0 0 360px", // Fixed height for brand section
});

const SummarySection = styled(ScrollableSection)({
  flex: 1,
  padding: "16px",
});

const StyledTableCell = styled(TableCell)({
  padding: "8px",
  borderBottom: "1px solid #e0e0e0",
  "&.header": {
    borderBottom: "2px solid #e0e0e0",
    backgroundColor: "transparent",
    fontWeight: 600,
    color: "#666",
  },
});

const BrandCell = styled(TableCell)({
  display: "flex",
  alignItems: "center",
  padding: "8px",
  cursor: "pointer",
  borderBottom: "1px solid #e0e0e0",
});

const StyledTableRow = styled(TableRow)(({ theme, selected }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  ...(selected && {
    backgroundColor: theme.palette.action.selected,
    "& .MuiTableCell-root": {
      color: theme.palette.primary.main,
    },
  }),
}));

const SummaryText = styled(Typography)({
  color: "#e4e6eb",
  fontSize: "14px",
  lineHeight: "1.6",
  marginBottom: "16px",
  backgroundColor: "#2f3542",
  padding: "16px",
  borderRadius: "8px",
  whiteSpace: "pre-wrap",
  "& h3": {
    fontSize: "15px",
    fontWeight: 600,
    marginBottom: "8px",
    color: "#fff",
  },
  "& p": {
    marginBottom: "12px",
  },
  "& ul": {
    marginLeft: "20px",
    marginBottom: "12px",
  },
  "& li": {
    marginBottom: "4px",
  },
});

const brandData = [
  {
    name: "Adidas",
    logo: "/assets/brands/adidas.png",
    latestSent: "9252",
    posSent: "90.5%",
    negSent: "9.5%",
  },
  {
    name: "Nike",
    logo: "/assets/brands/nike.png",
    latestSent: "8547",
    posSent: "88.2%",
    negSent: "11.8%",
  },
  {
    name: "Reebok",
    logo: "/assets/brands/reebok.png",
    latestSent: "7823",
    posSent: "85.7%",
    negSent: "14.3%",
  },
  {
    name: "Puma",
    logo: "/assets/brands/puma.png",
    latestSent: "6954",
    posSent: "87.3%",
    negSent: "12.7%",
  },
  {
    name: "Converse",
    logo: "/assets/brands/converse.png",
    latestSent: "6234",
    posSent: "89.1%",
    negSent: "10.9%",
  },
];

const Sidebar = ({ currentTab }) => {
  const [selectedBrand, setSelectedBrand] = useState("Adidas");
  const [currentDashboard, setCurrentDashboard] = useState("social");

  const getAISummary = (dashboard, brand) => {
    switch (dashboard) {
      case "competitor":
        return `# Competitor Analysis Report
        
\nMarket Performance:
• Market share increased by 2.3% this quarter
• Maintaining leadership in athletic footwear
• Key strengths: product innovation and brand recognition

\nCompetitor Landscape:
• Main competitors Nike and Puma showing strong performance
• Casual wear segment emerging as key battleground
• ${brand} leads in innovation metrics (8.5/10)

\n📊 Recommendation:
Focus on expanding lifestyle collection to compete in casual wear market.`;

      case "sentiment":
        return `# Sentiment Analysis Overview

\n📈 Overall Metrics:
• Positive sentiment: 90.5%
• Neutral sentiment: 6.5%
• Negative sentiment: 3%

\n🎯 Customer Satisfaction Drivers:
• Product quality: 45%
• Design: 30%
• Customer service: 25%

\n💬 Key Feedback:
Positive Keywords:
• "comfortable" (mentioned 2,450 times)
• "durable" (mentioned 1,890 times)
• "stylish" (mentioned 1,670 times)

Areas for Improvement:
• "expensive" (mentioned 580 times)
• "limited stock" (mentioned 320 times)`;

      case "feedback":
        return `# Customer Feedback Analysis

\n📊 Overall Satisfaction:
• Customer satisfaction score: 4.5/5
• Net Promoter Score (NPS): 72

\n🔍 Key Themes:
1. Product Experience:
   • Excellent comfort and fit (75% of reviews)
   • Premium pricing concerns (20% of feedback)
   • Size availability issues (15% of mentions)

\n⚡ Service Metrics:
• Average response time: 4.2 hours
• Resolution rate: 92%
• First contact resolution: 78%`;

      case "social":
        return `# Social Media Performance Report

\n📱 Platform Engagement:
Instagram:
• Followers: 2.1M (+5% MoM)
• Average engagement rate: 4.8%
• Top performing content: Product launches

TikTok:
• Followers: 1.5M (+12% MoM)
• Average views: 250K per post
• Trending hashtag: #${brand}Style

\n📈 Campaign Performance:
• Total reach: 5.2M
• Engagement rate: 6.3%
• Click-through rate: 2.8%

\n🎯 Key Insights:
• Video content outperforms static posts by 3x
• Peak engagement times: 6-8 PM local
• User-generated content drives 45% more engagement`;

      default:
        return "# Select another dashboard to view AI-generated insights.";
    }
  };

  // Update current dashboard based on tab changes
  useEffect(() => {
    switch (currentTab) {
      case 0:
        setCurrentDashboard("social");
        break;
      case 1:
        setCurrentDashboard("sentiment");
        break;
      case 2:
        setCurrentDashboard("feedback");
        break;
      case 4:
        setCurrentDashboard("competitor");
        break;
      case 5:
        setCurrentDashboard("chatbot");
        break;
      default:
        setCurrentDashboard("social");
    }
  }, [currentTab]);

  return (
    <SidebarContainer>
      {/* Brand Data Section */}
      <BrandSection>
        <TableContainer>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell className="header" align="center">
                  Brand
                </StyledTableCell>
                <StyledTableCell className="header" align="center">
                  Latest Sent
                </StyledTableCell>
                <StyledTableCell className="header" align="center">
                  (+) Sent %
                </StyledTableCell>
                <StyledTableCell className="header" align="center">
                  (-) Sent %
                </StyledTableCell>
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
                  <StyledTableCell align="center">
                    {brand.latestSent}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {brand.posSent}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {brand.negSent}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </BrandSection>

      <Divider />

      {/* AI Summary Section */}
      <SummarySection>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          AI Summary
        </Typography>
        <SummaryText>
          {getAISummary(currentDashboard, selectedBrand)}
        </SummaryText>
      </SummarySection>
    </SidebarContainer>
  );
};

export default Sidebar;
