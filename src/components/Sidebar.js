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

const aiSummaries = {
  sales: {
    title: "Sales Performance Insights",
    summary: [
      "Total sales are showing strong performance with consistent daily growth",
      "Running Shoes category leads in sales volume with 35% market share",
      "Return rates are well managed, averaging below 5% across categories",
      "Customer base is well distributed across major Indonesian cities",
      "Gender distribution shows balanced market penetration",
    ],
    recommendations: [
      "Focus on expanding Running Shoes category success",
      "Monitor return rates in Lifestyle Shoes category",
      "Consider expansion opportunities in emerging cities",
      "Maintain balanced marketing approach across gender segments",
    ]
  },
  competitor: {
    title: "Competitor Analysis Report",
    summary: [
      "Market Performance:",
      "• Market share increased by 2.3% this quarter",
      "• Maintaining leadership in athletic footwear",
      "• Key strengths: product innovation and brand recognition",
      "",
      "Competitor Landscape:",
      "• Main competitors Nike and Puma showing strong performance",
      "• Casual wear segment emerging as key battleground",
      "• Adidas leads in innovation metrics (8.5/10)",
      "",
      "Recommendation:",
      "Focus on expanding lifestyle collection to compete in casual wear market.",
    ],
    recommendations: [
      "Focus on expanding lifestyle collection to compete in casual wear market",
      "Monitor competitor performance in athletic footwear",
      "Maintain leadership in innovation metrics",
      "Expand market share in emerging segments",
    ]
  },
  sentiment: {
    title: "Sentiment Analysis Overview",
    summary: [
      "Overall Metrics:",
      "• Positive sentiment: 90.5%",
      "• Neutral sentiment: 6.5%",
      "• Negative sentiment: 3%",
      "",
      "Customer Satisfaction Drivers:",
      "• Product quality: 45%",
      "• Design: 30%",
      "• Customer service: 25%",
      "",
      "Key Feedback:",
      "Positive Keywords:",
      "• \"comfortable\" (mentioned 2,450 times)",
      "• \"durable\" (mentioned 1,890 times)",
      "• \"stylish\" (mentioned 1,670 times)",
      "",
      "Areas for Improvement:",
      "• \"expensive\" (mentioned 580 times)",
      "• \"limited stock\" (mentioned 320 times)",
    ],
    recommendations: [
      "Improve product quality to increase customer satisfaction",
      "Enhance design to meet customer expectations",
      "Provide excellent customer service to increase loyalty",
      "Address concerns about pricing and stock availability",
    ]
  },
  feedback: {
    title: "Customer Feedback Analysis",
    summary: [
      "Overall Satisfaction:",
      "• Customer satisfaction score: 4.5/5",
      "• Net Promoter Score (NPS): 72",
      "",
      "Key Themes:",
      "1. Product Experience:",
      "   • Excellent comfort and fit (75% of reviews)",
      "   • Premium pricing concerns (20% of feedback)",
      "   • Size availability issues (15% of mentions)",
      "",
      "Service Metrics:",
      "• Average response time: 4.2 hours",
      "• Resolution rate: 92%",
      "• First contact resolution: 78%",
    ],
    recommendations: [
      "Improve product comfort and fit to increase customer satisfaction",
      "Address premium pricing concerns to increase loyalty",
      "Enhance size availability to meet customer expectations",
      "Maintain excellent service metrics to increase customer loyalty",
    ]
  },
  social: {
    title: "Social Media Performance Report",
    summary: [
      "Platform Engagement:",
      "Instagram:",
      "• Followers: 2.1M (+5% MoM)",
      "• Average engagement rate: 4.8%",
      "• Top performing content: Product launches",
      "",
      "TikTok:",
      "• Followers: 1.5M (+12% MoM)",
      "• Average views: 250K per post",
      "• Trending hashtag: #AdidasStyle",
      "",
      "Campaign Performance:",
      "• Total reach: 5.2M",
      "• Engagement rate: 6.3%",
      "• Click-through rate: 2.8%",
      "",
      "Key Insights:",
      "• Video content outperforms static posts by 3x",
      "• Peak engagement times: 6-8 PM local",
      "• User-generated content drives 45% more engagement",
    ],
    recommendations: [
      "Increase Instagram followers by 10% in the next quarter",
      "Improve TikTok engagement rate by 20% in the next quarter",
      "Launch more product-related campaigns to increase reach and engagement",
      "Utilize user-generated content to increase engagement and loyalty",
    ]
  },
};

const Sidebar = ({ currentTab }) => {
  const [selectedBrand, setSelectedBrand] = useState("Adidas");
  const [currentDashboard, setCurrentDashboard] = useState("social");

  const getAISummary = (dashboard, brand) => {
    switch (dashboard) {
      case "competitor":
        return aiSummaries.competitor.summary.join("\n");
      case "sentiment":
        return aiSummaries.sentiment.summary.join("\n");
      case "feedback":
        return aiSummaries.feedback.summary.join("\n");
      case "social":
        return aiSummaries.social.summary.join("\n");
      case "sales":
        return aiSummaries.sales.summary.join("\n");
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
      case 6:
        setCurrentDashboard("sales");
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
